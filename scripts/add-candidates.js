const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const address = await deployer.getAddress();
  console.log("Adding candidates with account:", address);

  const contractAddress = "0xdf8B9C203FcEB0AdCc3eb27262aad716eD0632DB";
  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = Voting.attach(contractAddress);

  const candidates = ["Alice", "Bob"];
  for (const name of candidates) {
    console.log(`Adding candidate: ${name}`);
    const tx = await voting.connect(deployer).addCandidate(name);
    await tx.wait();
    console.log(`Added ${name}`);
  }

  const candidateCount = await voting.getTotalCandidates();
  console.log(`Total candidates: ${candidateCount}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });