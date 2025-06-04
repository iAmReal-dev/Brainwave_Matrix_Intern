const hre = require("hardhat");

async function main() {
  const network = await hre.ethers.provider.getNetwork();
  console.log(`Deploying to network: ${network.name} (chainId: ${network.chainId})`);

  const [deployer] = await hre.ethers.getSigners();
  const address = await deployer.getAddress();
  console.log("Deploying with account:", address);

  const balance = await hre.ethers.provider.getBalance(address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");

  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy();
  await voting.waitForDeployment();

  console.log("Voting contract deployed to:", await voting.getAddress());

  if (network.chainId === 11155111) {
    console.log("Waiting for 3 confirmations...");
    await voting.deploymentTransaction().wait(3);
    console.log("Deployment confirmed");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });