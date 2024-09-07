const bitcoin = require('bitcoinjs-lib');
const ecc = require('tiny-secp256k1');
const { BIP32Factory } = require('bip32');
const bip32 = BIP32Factory(ecc);
const bip39 = require('bip39');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const ECPair = require('ecpair').ECPairFactory(ecc);

bitcoin.initEccLib(ecc);

const mnemonic = ""; // 用户提供的助记词
const walletCount = 10; // 用户自定义生成的钱包数量

function generateBTCAddress(mnemonic, index) {
  // 从助记词生成种子
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  
  // 创建HD钱包
  const root = bip32.fromSeed(seed);
  
  // 派生路径 (使用BIP84标准的P2TR路径)
  const path = `m/86'/0'/${index}'/0/0`;
  const child = root.derivePath(path);
  
  // 创建P2TR地址 (主网)
  const { address } = bitcoin.payments.p2tr({
    internalPubkey: child.publicKey.slice(1, 33),
    network: bitcoin.networks.bitcoin
  });

  // 生成WIF格式的私钥
  const keyPair = ECPair.fromPrivateKey(child.privateKey);
  const wif = keyPair.toWIF();

  return { address, wif };
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
  if (!mnemonic) {
    console.error('请提供助记词');
    return;
  }

  const wallets = [];
  for (let i = 0; i < walletCount; i++) {
    const wallet = generateBTCAddress(mnemonic, i);
    wallets.push({ index: i + 1, address: wallet.address, privateKey: wallet.wif });
  }

  await saveWalletsToCSV(wallets, 'btc_wallets.csv');

  // 生成不完整的私钥
  const incompleteWallets = wallets.map(wallet => ({
    index: wallet.index,
    incompletePrivateKey: wallet.privateKey.slice(0, -6)
  }));

  saveIncompleteWalletsToFile(incompleteWallets, 'BTCIncompleteWallet.txt');


  console.log('BTC钱包已经全部生成并保存.');
}

main().catch(console.error);