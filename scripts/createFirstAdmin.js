require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

async function createFirstAdmin() {
  const username = process.env.FIRST_ADMIN_USERNAME;
  const password = process.env.FIRST_ADMIN_PASSWORD;

  if (!username || !password) {
    console.error('First admin credentials not set in .env');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);

  const existing = await Admin.findOne({ username });
  if (existing) {
    console.log('First admin already exists.');
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await Admin.create({
    username,
    password: hashedPassword,
  });

  console.log('First admin created successfully!');
  process.exit(0);
}

createFirstAdmin(); 