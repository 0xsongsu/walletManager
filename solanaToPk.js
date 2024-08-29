const { Keypair } = require('@solana/web3.js');
const bip39 = require('bip39');
const { derivePath } = require('ed25519-hd-key');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const mnemonic = " "; // 提供的助记词
const walletCount = 10; // 自定义生成的钱包数量

function generateSolanaWalletFromMnemonic(mnemonic, index) {
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const path = `m/44'/501'/${index}'/0'`;
    const derivedSeed = derivePath(path, seed.toString('hex')).key;
    const keypair = Keypair.fromSeed(derivedSeed);
    const address = keypair.publicKey.toBase58();
    const privateKey = Buffer.from(keypair.secretKey).toString('hex');
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
    const data = incompleteWallets.map(wallet => `钱包${wallet.index}:${wallet.incompletePrivateKey}`).join('\n');
    fs.writeFileSync(filename, data, 'utf8');
}

async function main() {
    const wallets = [];
    for (let i = 0; i < walletCount; i++) {
        const wallet = generateSolanaWalletFromMnemonic(mnemonic, i);
        wallets.push({ index: i + 1, address: wallet.address, privateKey: wallet.privateKey });
    }

    await saveWalletsToCSV(wallets, 'solana_wallet.csv');

    const incompleteWallets = wallets.map(wallet => ({
        index: wallet.index,
        incompletePrivateKey: wallet.privateKey.slice(0, -6),
    }));

    saveIncompleteWalletsToFile(incompleteWallets, 'SolanaIncompleteWallet.txt');

    console.log('Solana钱包已经全部生成并保存.');
}

main().catch(console.error);