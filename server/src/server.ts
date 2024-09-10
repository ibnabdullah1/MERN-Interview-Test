/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

const PORT = 3000;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}

main();
