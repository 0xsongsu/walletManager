# WALLET-MANAGER

该脚本能自定义创建助记词和使用助记词创建EVM钱包

- creatingMMC：创建指定数量的助记词，并保存至mnemonic.txt文件
- mmcToPk：使用助记词生成指定数量的钱包及私钥，并且会保存2份文件
    * wallet.csv：完整的钱包地址和私钥
    * IncompleteWallet.txt：钱包序号和删除掉后6位的私钥，方便传输

- 使用教程
    * 首先执行 ‘npm i’安装脚本所需依赖
    * 需要执行哪个脚本，输入‘node xxxxx.js‘即可
