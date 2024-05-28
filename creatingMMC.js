const bip39 = require('bip39');
const crypto = require('crypto');
const fs = require('fs');

const mnemonicCount = 1; // 生成的助记词数量
const wordCountPerMnemonic = 12; // 生成的助记词位数

function generateMultipleMnemonics(count, wordCount) {
    if (![12, 15, 18, 21, 24].includes(wordCount)) {
        throw new Error('助记词位数必须为12, 15, 18, 21, 24位');
    }

    const mnemonics = [];
    for (let i = 0; i < count; i++) {
        const entropyBits = (wordCount / 3) * 32; 
        const entropy = crypto.randomBytes(entropyBits / 8);
        const mnemonic = bip39.entropyToMnemonic(entropy.toString('hex'));
        mnemonics.push(mnemonic);
    }

    return mnemonics;
}

function saveMnemonicsToFile(mnemonics, filename) {
    const data = mnemonics.join('\n\n');
    fs.writeFileSync(filename, data, 'utf8');
}

const mnemonics = generateMultipleMnemonics(mnemonicCount, wordCountPerMnemonic);

saveMnemonicsToFile(mnemonics, 'mnemonic.txt');

console.log(`创建的 ${mnemonicCount} 已经保存至 mnemonic.txt`);
