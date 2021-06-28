const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");

const app = express();

const shortify = require("./utils");
const LinkModel = require("./models/Link");

const PORT = process.env.PORT || 3000;

//connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB");
  }
);

//middlewares
app.use(express.json());

//routes

app.get('/:chhotaLink',async (req,res)=>{
  try{

    const badaLink = await checkChhotaLink(req.params.chhotaLink)  
    console.log(badaLink)
    res.send(badaLink)
  }catch(err){
    res.status(400).send(err)
  }
})

app.post("/shorten", async (req, res) => {
  const { badaLink } = req.body;
  const chhotaLink = shortify(badaLink);
  try {
   
    const dbChhotaLink = await save2DB({ badaLink, chhotaLink });
    console.log(dbChhotaLink)

    res.send(dbChhotaLink);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(PORT, () => {
  console.log("server up on http://localhost:" + PORT);
});

function save2DB(val) {
  return new Promise(async (resolve, reject) => {
    try {
      //check if already present
      const alrchhotaLink = await checkBadalink(val.badaLink)
      if(alrchhotaLink)
      resolve(alrchhotaLink)
      else{
      const linkModel = LinkModel(val);
      const dbRes = await linkModel.save();
      console.log(dbRes);
      resolve(dbRes.chhotaLink);}
    } catch (err) {
      reject(err);
    }
  });
}

function checkBadalink(badaLink){
  return new Promise(async (resolve, reject)=>{
    LinkModel.find({ badaLink:badaLink}, (err, result) => {
      if (err) reject(err);
      if(result){
        console.log('already saved')
        try{
          return resolve(result[0].chhotaLink)
        }
        catch(err){
          return resolve('')
        }
      }
    });
  })
}
function checkChhotaLink(chhotaLink){
  return new Promise(async (resolve, reject)=>{
    LinkModel.find({ chhotaLink:chhotaLink}, (err, result) => {
      if (err) reject(err);
      if(result){
        console.log('already saved '+ result)
        try{
          return resolve(result[0].badaLink)
        }
        catch(err){
          return resolve('link not found!')
        }
      }
    });
  })
}
// post = /shrtn/ => short then save

// get = /23hj423 => actual site
