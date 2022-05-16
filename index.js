import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";
import { existsSync, readFileSync, writeFileSync } from "fs";

const port = 3000;
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.static("./public"));

app.get('/addressBook', (req, res) => {
  const addressbook = getJsonContent('./addresses.json')
  res.json(addressbook)
});

app.post('/addressBook', (req, res) => {
  let collectedAddresses = getJsonContent("./addresses.json");
  collectedAddresses.push({id: nanoid(), ...req.body})

  writeFileSync("./addresses.json", JSON.stringify(collectedAddresses))

  res.json("Funkade")
})

function getJsonContent(url){
  let content = [];
  if(existsSync(url)){
    content = JSON.parse(readFileSync(url))
  }
  return content
}

app.listen(port, () => {
  console.log("servern är igång på 3000");
})