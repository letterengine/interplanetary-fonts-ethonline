const hre = require("hardhat");

const main = async () => {
    const rsvpContractFactory = await hre.ethers.getContractFactory("interplanetary-fonts");
    const rsvpContract = await rsvpContractFactory.deploy();
    await rsvpContract.deployed();
    console.log("Contract deployed to:", rsvpContract.address);

    const [deployer, address1, address2] = await hre.ethers.getSigners();

    let deposit = hre.ethers.utils.parseEther("1");
    let timestamp = 1718926200;
    let projectDataCID =
    "bafybeibhwfzx6oo5rymsxmkdxpmkfwyvbjrrwcl7cekmbzlupmp5ypkyfi";

    let txn = await rsvpContract.createNewProject(
        timestamp,
        projectDataCID
    );
    let wait = await txn.wait();
    console.log("NEW PROJECT CREATED:", wait.events[0].event, wait.events[0].args);
    
    let projectID = wait.events[0].args.eventID;
    console.log("PROJECT ID:", projectID);
    txn = await rsvpContract.addNewCollaborator(projectID, { value: deposit });
    wait = await txn.wait();
    console.log("NEW COLLABORATOR:", wait.events[0].event, wait.events[0].args);

    txn = await rsvpContract
    .connect(address1)
    .createNewRSVP(projectID, { value: deposit });
    wait = await txn.wait();
    console.log("NEW COLLABORATOR:", wait.events[0].event, wait.events[0].args);

// wait 10 years
    await hre.network.provider.send("evm_increaseTime", [15778800000000]);

    txn = await rsvpContract.withdrawUnclaimedDeposits(projectID);
    wait = await txn.wait();
    console.log("WITHDRAWN:", wait.events[0].event, wait.events[0].args);

};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();