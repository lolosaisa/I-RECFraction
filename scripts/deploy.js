const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Deploy IRecCertificate
  const IRecCertificate = await hre.ethers.getContractFactory("IRecCertificate");
  const iRecCertificate = await IRecCertificate.deploy();
  await iRecCertificate.waitForDeployment();
  console.log("IRecCertificate deployed to:", iRecCertificate.target);

  // Deploy Fractionalizer
  const Fractionalizer = await hre.ethers.getContractFactory("Fractionalizer");
  const fractionalizer = await Fractionalizer.deploy();
  await fractionalizer.waitForDeployment();
  console.log("Fractionalizer deployed to:", fractionalizer.target);

  // Mint an I-REC certificate
  const txMint = await iRecCertificate.mint(deployer.address, "https://example.com/metadata.json");
  await txMint.wait();
  console.log("Minted I-REC certificate with tokenId 0");

  // Transfer the certificate to Fractionalizer (likely line 23)
  const txTransfer = await iRecCertificate.transferCertificate(fractionalizer.target, 0);
  await txTransfer.wait(); // This fails
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});