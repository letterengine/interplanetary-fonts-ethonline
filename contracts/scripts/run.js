const hre = require('hardhat');

const FontProjectJSON = require("../artifacts/contracts/FontProject.sol/FontProject.json");
const FontProjectABI = FontProjectJSON.abi;
const { Framework } = require("@superfluid-finance/sdk-core")

async function main() {
  
  const url = `${process.env.STAGING_INFURA_URL}`
  const customHttpProvider = new hre.ethers.providers.JsonRpcProvider(url);
  const network = await customHttpProvider.getNetwork();
  
  
  
  const sf = await Framework.create({
    chainId: network.chainId,
    provider: customHttpProvider
  })
  
  // console.log({ customHttpProvider, network, address: sf.settings.config.hostAddress })
  const fontProjectFactory = await hre.ethers.getContractFactory("FontProject");
  const fontProjectContract = await fontProjectFactory.deploy(
    sf.settings.config.hostAddress, // Getting the Mumbai Host contract address from the Framework object
    sf.settings.config.idaV1Address
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
  try {
    let txn = await fontProjectContract.connect(address1).createNewFontProject(
    timestamp,
    timestamp,
    mintPrice,
    metaDataCID
    , {
      gasLimit: 30000000
    });
  
  let wait = await txn.wait();
  console.log("FULL WAIT", wait);
  console.log("NEW FONT CREATED:", wait);
  } catch(err) {
    console.log("ASDFS")
    console.log(err)
  }

  // let eventId = wait.events[0].args.eventId;
  // console.log("EVENT ID:", eventId);


  // Mint a font
  // const [deployer, address1, address2] = await hre.ethers.getSigners();

  // txn = await fontProjectContract.mintFontProject(eventId, { value: deposit });
  // wait = await txn.wait();
  // console.log("NEW RSVP:", wait.events[0].event, wait.events[0].args);

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