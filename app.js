const express = require('express');
const bodyParser = require('body-parser');
const MidtransClient = require('midtrans-client');
require('dotenv').config(); // Muat file .env

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Ambil kunci dari variabel lingkungan
const midtransClient = new MidtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

app.post('/create-snap-token', async (req, res) => {
  try {
    const { transaction_details, credit_card } = req.body;
    const parameter = {
      transaction_details,
      credit_card,
    };
    const snapToken = await midtransClient.createTransaction(parameter);
    res.json({ token: snapToken.token });
  } catch (error) {
    console.error('Error creating Snap Token:', error);
    res.status(500).send('Error creating Snap Token');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
