const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
require('dotenv').config();
const token = process.env.token;
async function callApi(url, email) {
    const apiUrl = 'https://url-shortner-akn2.onrender.com/url/generate';
    const requestData = {
        url: url,
        email: email
    };

    try {
        const response = await axios.post(apiUrl, requestData);
        console.log(response, 'response')
        return response.data.shortId;
        // console.log('Shortened URL:', response.data.shortUrl);
    } catch (error) {
        console.error('Error calling API:', error);
    }
}



client.on("messageCreate", async (message) => {
    console.log(message.content)
    if (message.author.bot) return;
    else if (message.content.startsWith('create')) {
        if(message.content.split(',').length < 3) {
            message.reply('Please provide a valid URL and Email with , separated(eg. create,exaple.com,example.abc@gmail.com)  to generate short URL');
            return;
        }
        const data = message.content.split(',');
        try {
            message.reply('Generating short URL...');
            const shortUrl = await callApi(data[1].trim(), data[2].trim());
            await message.reply(` Your Shortened URL: https://url-shortner-akn2.onrender.com/url/getShortUrl/${shortUrl}`);
        } catch (error) {
            console.error('Failed to generate short URL:', error);
            await message.reply('Failed to generate short URL. Please try again later.');
        }
    }
    else {
        message.reply("Hello, I am a imkeshriraj's Bot. I am under development. Please wait for some time.");
    }
});

client.on('interactionCreate', (interaction) => {
    console.log(interaction)
    interaction.reply('Pong!')
});

client.login(token);