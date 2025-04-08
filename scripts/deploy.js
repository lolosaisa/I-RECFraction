const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Deploy IRecCertificate
  const IRecCertificate = await hre.ethers.getContractFactory("IRecCertificate");
  const certificate = await IRecCertificate.deploy();
  await certificate.waitForDeployment();
  console.log("IRecCertificate deployed to:", certificate.target);

  // Deploy Fractionalizer
  const Fractionalizer = await hre.ethers.getContractFactory("Fractionalizer");
  const fractionalizer = await Fractionalizer.deploy();
  await fractionalizer.waitForDeployment();
  console.log("Fractionalizer deployed to:", fractionalizer.target);

  // Mint an I-REC certificate and fractionalize it
  await certificate.mint(deployer.address, "https://metadata.com/1");
  console.log("Minted I-REC certificate with tokenId 0");

  await certificate.transferCertificate(fractionalizer.target, 0);
  await fractionalizer.fractionalize(certificate.target, 0, 1000);
  const tokenAddress = await fractionalizer.certificateTokenToFractionalToken(certificate.target, 0);
  console.log("FractionalToken deployed to:", tokenAddress);

  console.log("Deployment complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });