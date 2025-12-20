// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// Remove bcrypt/jwt imports if you haven't installed them yet, otherwise keep them
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// ALLOW CORS FOR EVERYONE (Easier for first deployment)
app.use(cors()); 

// USE ENVIRONMENT VARIABLES
// USE ENVIRONMENT VARIABLES
const MONGO_URL = process.env.MONGO_URI; 
const JWT_SECRET = process.env.JWT_SECRET;  // <--- ADD THIS LINE!
const PORT = process.env.PORT || 3001; 

// Safety check (optional but good)
if (!JWT_SECRET) {
    console.error("❌ Fatal Error: JWT_SECRET is not defined.");
    process.exit(1);
} 

if (!MONGO_URL) {
    console.error("❌ Fatal Error: MONGO_URI is not defined.");
    process.exit(1);
}

mongoose.connect(MONGO_URL)
  .then(() => console.log("✅ Cloud Database Connected"))
  .catch(err => console.error("❌ Error:", err));
// --- SCHEMAS ---

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  securityQuestion: { type: String, required: true }, // NEW: For recovery
  securityAnswer: { type: String, required: true }    // NEW: For recovery
});
const User = mongoose.model('User', UserSchema);

const JobSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  company: { type: String, required: true },
  position: { type: String, required: true },
  status: { type: String, default: 'Applied' },
  notes: { type: String, default: '' },
  dateApplied: { type: Date, default: Date.now },
  interviewDate: { type: Date }
});
const Job = mongoose.model('Job', JobSchema);

// --- MIDDLEWARE ---
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ error: "No token provided" });
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Unauthorized" });
    req.userId = decoded.id;
    next();
  });
};

// --- ROUTES ---

// REGISTER
app.post('/register', async (req, res) => {
  const { email, password, securityQuestion, securityAnswer } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  // Hash the answer too so it's secure!
  const hashedAnswer = await bcrypt.hash(securityAnswer.toLowerCase(), 10); 
  
  try {
    await User.create({ 
      email, 
      password: hashedPassword, 
      securityQuestion, 
      securityAnswer: hashedAnswer 
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "Email already exists" });
  }
});

// LOGIN
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.json({ status: "error", error: "User not found" });

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    return res.json({ status: "ok", token: token, name: user.email });
  }
  res.json({ status: "error", error: "Invalid Password" });
});

// GET SECURITY QUESTION (For Forgot Password Page)
app.post('/get-security-question', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.json({ status: "error", error: "User not found" });
  res.json({ status: "ok", question: user.securityQuestion });
});

// RESET PASSWORD
app.post('/reset-password', async (req, res) => {
  const { email, answer, newPassword } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.json({ status: "error", error: "User not found" });

  // Check Security Answer
  const isMatch = await bcrypt.compare(answer.toLowerCase(), user.securityAnswer);
  if (isMatch) {
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ _id: user._id }, { password: newHashedPassword });
    res.json({ status: "ok" });
  } else {
    res.json({ status: "error", error: "Incorrect Security Answer" });
  }
});

// JOB ROUTES
app.get('/jobs', verifyToken, async (req, res) => {
  const jobs = await Job.find({ userId: req.userId }).sort({ dateApplied: -1 });
  res.json(jobs);
});

app.post('/jobs', verifyToken, async (req, res) => {
  const newJob = await Job.create({ ...req.body, userId: req.userId });
  res.json(newJob);
});

// UPDATE JOB (NEW FEATURE)
app.put('/jobs/:id', verifyToken, async (req, res) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedJob);
});

app.delete('/jobs/:id', verifyToken, async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ status: "ok" });
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));