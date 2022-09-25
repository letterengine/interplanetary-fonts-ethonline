import abiJSON from "./IPFonts.json";
import { ethers } from "ethers";

function connectContract() {
  const contractAddress = "[CONTRACT_ADDRESS]";
  const contractABI = abiJSON.abi;
  let fontContract;
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      console.log("contractABI", contractABI);
      rsvpContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      ); 
    } else {
      throw new Error('Please connect to the Polygon Mumbai network.')
    }
  } catch (error) {
    console.log("ERROR:", error);
  }
  return fontContract;
}

export default connectContract;