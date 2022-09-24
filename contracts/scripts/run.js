const hre = require('hardhat');

const FontProjectJSON = require("../artifacts/contracts/FontProject.sol/FontProject.json");
const FontProjectABI = FontProjectJSON.abi;
const { Framework } = require("@superfluid-finance/sdk-core")
const { deployFramework, deployWrapperSuperToken } = require("./utils/deploy-sf.js")

async function main() {
  
  // const url = `${process.env.STAGING_INFURA_URL}`
  // const customHttpProvider = new hre.ethers.providers.JsonRpcProvider(url);
  // const network = await customHttpProvider.getNetwork();

  const [admin, alice, bob] = await hre.ethers.getSigners();

  const contractsFramework = await deployFramework(admin);
    
  // const sf = await Framework.create({
  //   chainId: network.chainId,
  //   provider: customHttpProvider
  // })

  const sf = await Framework.create({
    chainId: 31337,
    provider: admin.provider,
    resolverAddress: contractsFramework.resolver, // (empty)
    protocolReleaseVersion: "test"
  });

  const tokenDeployment = await deployWrapperSuperToken(
    admin,
    contractsFramework.superTokenFactory,
    "jp",
    "jp"
  )

  jp = tokenDeployment.underlyingToken
  jpx = tokenDeployment.superToken
  
  // console.log({ customHttpProvider, network, address: sf.settings.config.hostAddress })
  const fontProjectFactory = await hre.ethers.getContractFactory("FontProject", admin);
  const fontProjectContract = await fontProjectFactory.deploy(
    sf.settings.config.hostAddress, // Getting the Mumbai Host contract address from the Framework object
    sf.settings.config.idaV1Address,
    jpx.address,
    jp.address
  );

  await fontProjectContract.deployed();
  console.log("Contract deployed to:", fontProjectContract.address);

  // const fontProject = new hre.ethers.Contract(
  //   fontProjectContract.address,
  //   FontProjectABI,
  //   customHttpProvider
  // );

  let mintPrice = hre.ethers.utils.parseEther("1");
  let maxCapacity = 3;
  let timestamp = 1718926200;
  let metaDataCID = "bafybeibhwfzx6oo5rymsxmkdxpmkfwyvbjrrwcl7cekmbzlupmp5ypkyfi";


  const [deployer, address1, address2] = await hre.ethers.getSigners();

  // Create event
  let txn = await fontProjectContract.createNewFontProject(
    timestamp,
    timestamp,
    mintPrice,
    metaDataCID
  );
  
  let wait = await txn.wait();

  let createFontProjectEvent = wait.events.find(({ event }) => event === 'NewFontProjectCreated');
  console.log("FONT ID:", createFontProjectEvent.args.fontId);
  const fontId = createFontProjectEvent.args.fontId;


  // Mint a font

  txn = await fontProjectContract.mintFontProject(fontId, { value: mintPrice });
  wait = await txn.wait();
  console.log("NEW FONT MINTED:", wait);

  // txn = await fontProjectContract
  //   .connect(address1)
  //   .createNewRSVP(eventId, { value: deposit });
  // wait = await txn.wait();
  // console.log("NEW RSVP:", wait.events[0].event, wait.events[0].args);

  // txn = await fontProjectContract
  //   .connect(address2)
  //   .createNewRSVP(eventId, { value: deposit });
  // wait = await txn.wait();
  // console.log("NEW RSVP:", wait.events[0].event, wait.events[0].args);

  // // Confirm all attendees
  // txn = await fontProjectContract.confirmAllAttendees(eventId);
  // wait = await txn.wait();
  // wait.events.forEach((event) =>
  //   console.log("CONFIRMED:", event.args.attendeeAddress)
  // );

  // // Withdraw unclaimed deposits
  // await hre.network.provider.send("evm_increaseTime", [15778800000000]); // wait 10 years

  // txn = await fontProjectContract.withdrawUnclaimedDeposits(eventId);
  // wait = await txn.wait();
  // console.log("WITHDRAWN:", wait.events[0].event, wait.events[0].args);
}

async function runMain() {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

runMain();