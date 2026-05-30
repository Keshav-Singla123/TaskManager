const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const app = require('./src/app');

const PORT = process.env.PORT || 3001;

async function start() {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI not set in environment');
      process.exit(1);
    }
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
