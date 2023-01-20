const express = require("express");
const bodyParser = require("body-parser");
const qrcode = require('qrcode-terminal');
const fs = require("fs");
const axios = require("axios");
const shelljs = require("shelljs");

const config = require("./config.json");
const {
  Client,
  LocalAuth
} = require("whatsapp-web.js");
const client = new Client();


process.title = "ajli-whatsapp-node-api";
global.client = new Client({
  authStrategy: new LocalAuth({
    clientId: "client-one"
  }),
  puppeteer: {
    headless: false
  },
});

global.authed = false;

const app = express();

const port = process.env.PORT || config.port;
//Set Request Size Limit 50 MB
app.use(bodyParser.json({
  limit: "50mb"
}));

app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

client.on("qr", (qr) => {
  if (!authed) {
    console.log("generate qr code ... ");
    fs.writeFileSync("./components/account.qr", qr);
    qrcode.generate(qr, {
      small: true
    });
    console.log("connect it with your whatsapp account");
    console.log("Enjoy starting chat using all APIs in documentation : https://github.com/nawfalajli/angular-agm-example/blob/master/README.md");
  }
});

client.on("authenticated", () => {
  console.log("AUTH!");
  authed = true;

  try {
    fs.unlinkSync("./components/account.qr");
  } catch (err) {}
});

client.on("auth_failure", () => {
  console.log("AUTH Failed !");
  process.exit();
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async (msg) => {
  if (config.webhook.enabled) {
    if (msg.hasMedia) {
      const attachmentData = await msg.downloadMedia();
      msg.attachmentData = attachmentData;
    }
    axios.post(config.webhook.path, {
      msg
    });
  }
});
client.on("disconnected", () => {
  console.log("disconnected");
});
client.initialize();

const chatRoute = require("./components/chatting");
const groupRoute = require("./components/group");
const authRoute = require("./components/auth");
const contactRoute = require("./components/contact");

app.use(function(req, res, next) {
  console.log(req.method + " : " + req.path);
  next();
});
app.use("/chat", chatRoute);
app.use("/group", groupRoute);
app.use("/auth", authRoute);
app.use("/contact", contactRoute);

app.listen(port, () => {
  console.log("Server Running Live on Port : " + port);
});