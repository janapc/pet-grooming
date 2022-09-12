import * as dotenv from 'dotenv';

import CommandService from './CommandService';

dotenv.config();

async function main(): Promise<void> {
  try {
    const commandService = new CommandService();
    const output = await commandService.build();
    console.log('\x1b[32m', JSON.stringify(output));
  } catch (error) {
    console.log(error);
  }
}
void main();
