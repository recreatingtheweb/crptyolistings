

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fetch from 'node-fetch';
import https from 'https';
import * as fs from 'fs';



const app = express()
app.use(cors())
app.use(morgan("coins"))
const port = 3002

// const options = {
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem')
// };

var apiKey = "coinrankingef782bb78d6e6f94f8bbcfd8d6cfd581c5e3cdad46dbc2f7";


app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if ('OPTIONS' == req.method) {
     res.sendStatus(200);
   }
   else {
     next();
   }});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/coins", (req, res) => {
  const url = "https://api.coinranking.com/v2/coins";
  (async () => {
    try {
      await fetch(`${url}`, {
        headers: { "x-access-token": `${apiKey}` }
      }).then((response) => response.json())
        .then((json) => {
          console.log(json)
          res.json(json)
        })
    } catch (error) {
      console.log(error)
    }
  })()
})


// Creating https server by passing
// options and app object
// https.createServer( app)
// .listen(3002, function (req, res) {
//   console.log("Server started at port 3000");
// });
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})