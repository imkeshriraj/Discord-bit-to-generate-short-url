const  { REST, Routes } = require('discord.js');
require('dotenv').config();
const token = process.env.token;
const commands = [
  {
    name: 'create',
    description: 'Create a new short Url',
  },
];

const rest = new REST({ version: '10' }).setToken(token);
(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationCommands('1210275843159494746'),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
