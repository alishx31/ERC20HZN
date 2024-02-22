// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

// async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const unlockTime = currentTimestampInSeconds + 60;

//   const lockedAmount = hre.ethers.parseEther("0.001");

//   const lock = await hre.ethers.deployContract("Lock", [unlockTime], {
//     value: lockedAmount,
//   });

//   await lock.waitForDeployment();

//   console.log(
//     `Lock with ${ethers.formatEther(
//       lockedAmount
//     )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
//   );
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // const weiAmount = (await deployer.getBalance()).toString();
  const weiAmount = (await ethers.provider.getBalance(deployer.address)).toString();

  
  console.log("Account balance:", (await ethers.formatEther(weiAmount)));

  // make sure to replace the "GoofyGoober" reference with your own ERC-20 name!

  const contractAddress = "0xe44deb1ccDF2E9ED401d4c6eFD2499Ad25C2FE50";

  const spenderContractAddress = "0x873289a1aD6Cf024B927bd13bd183B264d274c68";

  const artifacts = require("../artifacts/contracts/Horizon.sol/Horizon.json");

  const myContract = new ethers.Contract(contractAddress, artifacts.abi, deployer);

  // await myContract.approve(, 1500 );

  const spenderContractABI = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"}],"name":"Winner","type":"event"},{"inputs":[{"internalType":"address","name":"erc20","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"drop","outputs":[],"stateMutability":"nonpayable","type":"function"}];

  const spenderContract = new ethers.Contract(spenderContractAddress, spenderContractABI, deployer);

  await spenderContract.drop(contractAddress, 1500);

  // const Token = await ethers.getContractFactory("Horizon");

  // const overrides = { gasLimit: 6000000 }; // Increase gas limit
  // const token = await Token.deploy(overrides);
  // const token = await Token.deploy();

  // console.log(contract.interface);
  // console.log("Token address:", token.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});