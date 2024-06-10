const { WebhookClient } = require('dialogflow-fulfillment');
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3002;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello Dialogflow!');
});

app.post('/webhook', (req, res) => {
    const agent = new WebhookClient({ request: req, response: res });

    function welcome(agent) {
        agent.add("Hi there, I am your AI Assistant. Before starting the conversation, could you please tell me your name?");
    }

    function collectUserData(agent) {
        const { name, phone, email, city, date, Gender, address, Qualification } = agent.parameters;
        
        agent.add(`Email has been sent to the user.`);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ayyazmehmood16@gmail.com',
                pass: 'qhnbjwhpgfglfcyb'
            }
        });

        const mailOptions = {
            from: 'ayyazmehmood16@gmail.com',
            to: email,
            subject: 'Saylani Student Information',
            html: `
                <div style="text-align: center; font-size: 18px; color: black;">
                    <p>Hi user,</p>
                    <p>Thank you for contacting Saylani Welfare Trust.</p>
                    <h1 style="font-size: 24px; color: blue; text-align: center;">Saylani Student Information</h1>
                    <div style="background-color: skyblue; padding: 20px; border-radius: 10px; display: inline-block; text-align: left;">
                        <p style="margin: 10px 0;">Name: ${name}</p>
                        <p style="margin: 10px 0;">Email: ${email}</p>
                        <p style="margin: 10px 0;">Phone: ${phone}</p>
                        <p style="margin: 10px 0;">City: ${city}</p>
                        <p style="margin: 10px 0;">Date of birth: ${date}</p>
                        <p style="margin: 10px 0;">Gender: ${Gender}</p>
                        <p style="margin: 10px 0;">Address: ${address}</p>
                        <p style="margin: 10px 0;">Qualification: ${Qualification}</p>
                    </div>
                    <p>You will be contacted soon.</p>
                </div>
            `
        };
        

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    }

    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('CollectUserData', collectUserData);
    agent.handleRequest(intentMap);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
