# 多链钱包生成器

这个项目可以帮助您生成多个区块链（比特币BTC、以太坊ETH和索拉纳SOL）的钱包地址和私钥。

## 使用前准备

1. 确保您的电脑已安装Node.js (版本12或更高)。如果没有安装,请访问 [Node.js官网](https://nodejs.org/) 下载并安装。

2. 下载或克隆本项目到您的电脑。

3. 打开命令行工具(如Windows的命令提示符或Mac的终端),进入项目文件夹。

4. 运行以下命令安装必要的依赖:

   ```
   npm install
   ```

## 使用方法

### 1. 生成助记词

首先，您需要生成助记词。使用 `creatingMMC.js` 文件：

1. 打开 `creatingMMC.js` 文件。
2. 修改以下变量：
   ```javascript
   const mnemonicCount = 1; // 生成的助记词数量
   const wordCountPerMnemonic = 12; // 生成的助记词位数
   ```
3. 保存文件并运行：
   ```
   node creatingMMC.js
   ```
4. 生成的助记词将保存在 `mnemonic.txt` 文件中。

### 2. 生成比特币(BTC)钱包

使用 `generateBTCAddress.js` 文件：

1. 打开 `generateBTCAddress.js` 文件。
2. 找到并修改以下行：
   ```javascript
   const mnemonic = ""; // 填入您的助记词
   const walletCount = 10; // 设置想要生成的钱包数量
   ```
3. 保存文件并运行：
   ```
   node generateBTCAddress.js
   ```
4. 生成的钱包信息将保存在 `btc_wallets.csv` 和 `BTCIncompleteWallet.txt` 文件中。

### 3. 生成以太坊(ETH)钱包

使用 `mmcToPk.js` 文件：

1. 打开 `mmcToPk.js` 文件。
2. 找到并修改以下行：
   ```javascript
   const mnemonic = " "; // 填入您的助记词
   const walletCount = 10; // 设置想要生成的钱包数量
   ```
3. 保存文件并运行：
   ```
   node mmcToPk.js
   ```
4. 生成的钱包信息将保存在 `wallet.csv` 和 `IncompleteWallet.txt` 文件中。

### 4. 生成索拉纳(SOL)钱包

使用 `solanaToPk.js` 文件：

1. 打开 `solanaToPk.js` 文件。
2. 找到并修改以下行：
   ```javascript
   const mnemonic = " "; // 填入您的助记词
   const walletCount = 10; // 设置想要生成的钱包数量
   ```
3. 保存文件并运行：
   ```
   node solanaToPk.js
   ```
4. 生成的钱包信息将保存在 `solana_wallet.csv` 和 `SolanaIncompleteWallet.txt` 文件中。

## 注意事项

- 请妥善保管生成的文件，特别是包含私钥的文件。私钥可以用来控制您的加密货币，请不要泄露给他人。
- 本程序生成的是主网地址，可以直接在相应的区块链主网上使用。
- 如果您想要重复使用同一组钱包，请保存并使用相同的助记词。
- 使用完毕请及时清理助记词等高风险信息

## 安全提示

- 在处理真实资金时，请确保在安全的环境中运行此程序。
- 建议在离线环境中生成钱包，以提高安全性。
- 定期备份您的钱包信息和助记词。
- 不要在不安全的设备或网络上使用这些钱包。

如果您在使用过程中遇到任何问题，请随时提出问题或寻求帮助。
