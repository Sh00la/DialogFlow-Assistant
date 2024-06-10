const dialogflow = require('@google-cloud/dialogflow');
const { WebhookClient, Payload } = require('dialogflow-fulfillment');
const express = require("express");

const PROJECT_ID = 'saylani-s-student-data-co-u9fx';
const LOCATION = 'us-centrall';

const webApp = express();
const PORT = process.env.PORT || 3002;
webApp.use(express.urlencoded({ extended: true }));
webApp.use(express.json());
webApp.use((req, res, next) => {
  console.log(`Path ${req.path} with Method ${req.method}`);
  next();
});
webApp.get('/', (req, res) => {
  res.sendStatus(200);
  res.send("Status Okay");
});

webApp.post('/dialogflow', async (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });

  async function fallback() {
    let queryText = req.body.queryResult.queryText;

    const response = await dialogflow.textGeneration(saylani-s-student-data-co-u9fx, us-centrall, queryText);
    
    agent.add(response.text);
    console.log(response.text);
  }

  function hi(agent) {
    console.log(`intent => hi`);
    agent.add('Hi, I am your virtual assistant, Tell me how may I assist you?');
  }

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', hi);
  intentMap.set('Default Fallback Intent', fallback);
  agent.handleRequest(intentMap);
});

webApp.listen(PORT, () => {
  console.log(`Server is up and running at http://localhost:${PORT}/`);
});
