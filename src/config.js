import dotenv from 'dotenv';
dotenv.config();

module.exports = {
    //Coinbase API Keys:
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET
}