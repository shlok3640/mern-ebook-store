const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./src/db');
const Book = require('./src/models/Book');
const User = require('./src/models/User');
const Order = require('./src/models/Order');
const books = require('./src/data/books');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Book.deleteMany();
    await User.deleteMany();

    const users = [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        isAdmin: true
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        isAdmin: false
      }
    ];

    for (const u of users) {
      await User.create(u);
    }
    
    await Book.insertMany(books);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Book.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
