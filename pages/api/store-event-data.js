// importing some web3 storage helpers 
import { Web3Storage, File, getFilesFromPath } from "web3.storage";
const { resolve } = require("path");

// exporting the default handler function to handle incoming requests and checking it request is 'POST' and return error if is not 
export default async function handler (req, res) {
  if (req.method === "POST") {
    return await storeEventData(req, res);
  } else {
    return res
    .status(405)
    .json({ message: "Method not allowed", success: false});
  }
}

// adding a new async function 'storeEventData' that would try to get event data from requesting body, store date and return error if unsuccessful 
// Upon successful storage the system will return the cid that poits to an IPFS of stored file
// two functions will be called inside this function 'makeFileObjects' will create json file that includes metadata 
// Other 'storeFile' will store json file to web3 storage
async function storeEventData(req, res) {
  const body = req.body;
  try {
    const files = await makeFileObjects(body);
    const cid = await storeFile(files);
    return res.status(200).json({ success: true, cid: cid});
  } catch (err) {
    return res
    .status(500)
    .json({ error: "Error creating event", success: false});
  }
}

// adding new async function 'makeFileObjects' to create a buffer and it will look up image from body.image 
// we will use function from web3 storage 'getFilesPath' to get image from folder 
// this will return the image in an array
async function makeFileObjects(body) {
  const buffer = Buffer.from(JSON.stringify(body));

  const imageDirectory = resolve(process.cwd(),`public/images/${body.image}`);
  const files = await getFilesFromPath(imageDirectory);

  files.push(new File([buffer], "data.json"));
  return files;
}

// creating a web3 storage client object to interact with 
function makeStorageClient() {
  return new Web3Storage({ token: process.env.WEB3STORAGE_TOKEN });
}

// calling 'put' method on client to upload our array of files 
async function storeFiles(files) {
  const client = makeStorageClient();
  const cid = await client.put(files);
  return cid;
}