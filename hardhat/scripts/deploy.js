const fs = require('fs')
async function main(hre){
  const [deployer] = await hre.viem.getWalletClients()
  const publicClient = await hre.viem.getPublicClient()
  const addr = (await deployer.getAddresses())[0]
  console.log('Deployer:', addr)

  // 1) Deploy PaymentGateway
  const gateway = await hre.viem.deployContract('T3PaymentGateway', [process.env.TREASURY, []])
  console.log('T3PaymentGateway:', gateway.address)

  // 2) Deploy TokenFactory with flat fee (0.02 ETH)
  const fee = 20n * 10n ** 16n
  const factory = await hre.viem.deployContract('T3TokenFactory', [process.env.TREASURY, fee])
  console.log('T3TokenFactory:', factory.address)

  fs.writeFileSync('deploy.out.json', JSON.stringify({
    network: 'basesepolia',
    gateway: gateway.address,
    factory: factory.address
  }, null, 2))
}

module.exports = main
if (require.main === module) {
  const hre = require('hardhat')
  main(hre).then(()=>process.exit(0)).catch(e=>{ console.error(e); process.exit(1) })
}
