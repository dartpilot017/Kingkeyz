const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3000;
const dotenv = require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));
// Enable CORS for all requests
app.use(cors());

const sendGridMail = require('@sendgrid/mail');
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/send-email', (req, res) => {
    console.log(req.body);
  const { name, email, message } = req.body;
   
  function getMessage() {
    const body = `
    Name: ${name}
    Email: ${email}
    Message: ${message}
  `;
  console.log(body)
    return {
      to: 'dadebayo200@gmail.com',
      from: 'dadebayo200@gmail.com',
      subject: 'Mail from customer',
      text: body,
      html: `
        <h3 style="margin-bottom: 5px;">Message Details</h3>
        <table style="border-collapse: collapse;">
         
          <tr>
            <td style="border: 1px solid black; padding: 5px;"><strong>Name:</strong></td>
            <td style="border: 1px solid black; padding: 5px;"> ${name}</td>
          </tr>
          <tr>
            <td style="border: 1px solid black; padding: 5px;"><strong>Email:</strong></td>
            <td style="border: 1px solid black; padding: 5px;">${email}</td>
          </tr>
          <tr>
            <td style="border: 1px solid black; padding: 5px;"><strong>Phone Number:</strong></td>
            <td style="border: 1px solid black; padding: 5px;">${message}</td>
          </tr>
      `
    };
  }
  
  async function sendEmail() {
    try {
      await sendGridMail.send(getMessage());
      console.log('Mail sent successfully');
      res.status(200).send('<script>alert("Email sent successfully, we would reach out to you soon"); window.location.href = "/";</script>');
    } catch (error) {
      console.error('Error sending email');
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
      res.status(500).send('<script>alert("Error sending email"); window.location.href = "/";</script>');
    }
  }
  
  
  (async () => {
    console.log('Sending email');
    await sendEmail();
  })();
});

//api to send orders

app.post('/send-order', (req, res) => {
    // console.log(req.body);
    const { title, name, email, phone, gadget,memory, color, quantity, address, state, payment, describe } = req.body;
     
    function getMessage() {
      const body = `I need ${quantity} ${gadget}, color ${color}, ${memory}. My Name, address and phone number are ${name}, ${address}, ${phone}.
       ${state}. I will pay via ${payment}.`;
      
    //   `I need ${quantity} ${gadget}, ${color}, ${memory}. My Name, address and phone number are ${name}, ${address}, ${phone}.
    // ${state}. I will pay via ${payment}.`;
      console.log(body);
      return {
        to: 'dadebayo200@gmail.com',
        from: 'dadebayo200@gmail.com',
        subject: 'Products Order list',
        text: body,
        html: `
        <h3 style="margin-bottom: 5px;">Order Details</h3>
        <table style="border-collapse: collapse;">
         
          <tr>
            <td style="border: 1px solid black; padding: 5px;"><strong>Name:</strong></td>
            <td style="border: 1px solid black; padding: 5px;">${title} ${name}</td>
          </tr>
          <tr>
            <td style="border: 1px solid black; padding: 5px;"><strong>Email:</strong></td>
            <td style="border: 1px solid black; padding: 5px;">${email}</td>
          </tr>
          <tr>
            <td style="border: 1px solid black; padding: 5px;"><strong>Phone Number:</strong></td>
            <td style="border: 1px solid black; padding: 5px;">${phone}</td>
          </tr>
          <tr>
            <td style="border: 1px solid black; padding: 5px;"><strong>Gadget:</strong></td>
            <td style="border: 1px solid black; padding: 5px;">${gadget}</td>
          </tr>
          <tr>
            <td style="border: 1px solid black; padding: 5px;"><strong>Memory:</strong></td>
            <td style="border: 1px solid black; padding: 5px;">${memory}</td>
          </tr>
          <tr>
            <td style="border: 1px solid black; padding: 5px;"><strong>Color:</strong></td>
            <td style="border: 1px solid black; padding: 5px;">${color}</td>
          </tr>
          <tr>
            <td style="border: 1px solid black; padding: 5px;"><strong>Quantity:</strong></td>
            <td style="border: 1px solid black; padding: 5px;">${quantity}</td>
          </tr>
          <tr>
            <td style="border: 1px solid black; padding: 5px;"><strong>Address:</strong></td>
            <td style="border: 1px solid black; padding: 5px;">${address}</td>
          </tr>
          <tr>
            <td style="border: 1px solid black; padding: 5px;"><strong>State:</strong></td>
            <td style="border: 1px solid black; padding: 5px;">${state}</td>
           </tr>
           <tr>
            <td style="border: 1px solid black; padding: 5px;"><strong>Payment:</strong></td>
            <td style="border: 1px solid black; padding: 5px;">${payment}</td>
           </tr>
           <tr>
            <td style="border: 1px solid black; padding: 5px;"><strong>Description:</strong></td>
            <td style="border: 1px solid black; padding: 5px;">${describe}</td>
           </tr>
        `,
      };
    }
    
    async function sendOrder() {
      try {
        await sendGridMail.send(getMessage());
        // console.log(req.body);
        res.status(200).send('<script>alert("Order sent successfully, Chief. We will attend to it ASAP"); window.location.href = "/";</script>');
      } catch (error) {
        console.error('Error sending order');
        console.error(error);
        if (error.response) {
          console.error(error.response.body)
        }
        res.status(500).send('<script>alert("Error sending order, boss"); window.location.href = "/";</script>');
      }
    }
    
    console.log(req.body);
    (async () => {
      console.log('Sending order');
      await sendOrder();
    })();
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
