const accountSid = 'AC7b3d94adab382bb7ee590066c4a6b988';
const authToken = 'bac2cff0130b9ed6466986b067241a74';
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'Hello from SMIT',
        from: '+17154494659',
        to: '+923158696669'
    })
    .then(message => console.log(message.sid));