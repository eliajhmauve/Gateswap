import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with address:", deployer.address);

  const ContractFactory = await ethers.getContractFactory("SelfVerificationOnly");

  const contract = await ContractFactory.deploy(
    "0x9AcA2112D34Ef021084264F6f5eef2a99a5bA7b1", // IdentityVerificationHub (production)
    ethers.encodeBytes32String("GateSwap-Verification"), // Scope
    "11017434218892263658279417603938423771128165016671205374300737959605651994021", // Passport Attestation ID
    true,  // olderThanEnabled
    18,    // olderThan: 18 歲以上
    false, // forbiddenCountriesEnabled
    [0, 0, 0, 0], // forbiddenCountriesListPacked
    [true, true, true] // OFAC checks: passportNo, nameAndDob, nameAndYob
  );

  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("✅ Contract deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
