const hre = require("hardhat");

async function main() {
  console.log("Deploying DocVerifier...");

  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying with:", deployer.address);

  const factory = await hre.ethers.getContractFactory("DocVerifier");
  const contract = await factory.deploy();

  await contract.waitForDeployment();

  console.log("Deployed to:", await contract.getAddress());
}

main().catch(console.error);