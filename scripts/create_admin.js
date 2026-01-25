require('dotenv').config();
const connectDB = require('../config/database');
const User = require('../models/User');

async function run(){
  await connectDB();
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const pass = process.env.ADMIN_PASS || 'Admin123!';
  let user = await User.findOne({ email });
  if(user){
    console.log('Admin already exists:', email);
    process.exit(0);
  }
  user = new User({ name: 'Administrator', email, password: pass, role: 'admin' });
  await user.save();
  console.log('Created admin user:', email, 'password:', pass);
  process.exit(0);
}

run().catch(err=>{ console.error(err); process.exit(1); });
