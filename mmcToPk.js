const bip39 = require('bip39');
const hdkey = require('hdkey');
const Wallet = require('ethereumjs-wallet').default;
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const mnemonic = " "; // 提供的助记词
const walletCount = 5; // 自定义生成的钱包数量

function generateWalletFromMnemonic(mnemonic, index) {
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const root = hdkey.fromMasterSeed(seed);
    const path = `m/44'/60'/0'/0/${index}`;
    const child = root.derive(path);
    const wallet = Wallet.fromPrivateKey(child.privateKey);
    const address = wallet.getAddressString();
    const privateKey = wallet.getPrivateKeyString().slice(2); // remove '0x' prefix
    return { address, privateKey };
}

async function saveWalletsToCSV(wallets, filename) {
    const csvWriter = createCsvWriter({
        path: filename,
        header: [
            { id: 'index', title: 'Index' },
            { id: 'address', title: 'Address' },
            { id: 'privateKey', title: 'PrivateKey' },
        ],
    });
    await csvWriter.writeRecords(wallets);
}

function saveIncompleteWalletsToFile(incompleteWallets, filename) {
    const data = incompleteWallets.map(wallet => `钱包: ${wallet.index}、${wallet.incompletePrivateKey}`).join('\n\n');
    fs.writeFileSync(filename, data, 'utf8');
}

async function main() {
    const wallets = [];
    for (let i = 0; i < walletCount; i++) {
        const wallet = generateWalletFromMnemonic(mnemonic, i);
        wallets.push({ index: i + 1, address: wallet.address, privateKey: wallet.privateKey });
    }

    await saveWalletsToCSV(wallets, 'wallet.csv');

    const incompleteWallets = wallets.map(wallet => ({
        index: wallet.index,
        incompletePrivateKey: wallet.privateKey.slice(0, -6),
    }));

    saveIncompleteWalletsToFile(incompleteWallets, 'IncompleteWallet.txt');

    console.log('钱包已经全部生成并保存.');
}

main().catch(console.error);
