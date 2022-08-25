// importing ethers and our ABI
import abiJSON from "../utils/web3RSVP.json";
import { ethers } from "ethers";

// adding function to connect to our smart contract, catch error via global ETH API
// for this we will need to write down our deployed contract address 
function connectContract() {
  const contractAddress = "0xbF38c9a0d26F2e50c25e50f1abd02B41d88a6AD7";
  const contractABI = abiJSON.abi;
  let rsvpContract; 
  try {
    const { ethereum } = window;

    if (ethereum) {
      // checking for eth objects in the window
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      rsvpContract = new ethers.Contract(contractAddress, contractABI, signer); //instantiating new connection to the contract
    } else {
      console.log("Ethereum object doesn't exist");
    }
  } catch (error) {
    console.log("ERROR:", error);
  }
  return rsvpContract;
}

export default connectContract;