const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors()); 


mongoose.connect('mongodb://localhost:27017/mern-auth', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});


const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    city: String,
    dob: String,
});

const User = mongoose.model('User', UserSchema);

// Routes
// Signup Route
app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password, city, dob } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'Email already exists.' });
        }
        const user = new User({ name, email, password, city, dob });
        await user.save();
        res.status(201).send({ message: 'Signup successful!' });
    } catch (error) {
        res.status(500).send({ message: 'Error during signup.', error });
    }
});

// Login Route
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (user) {
            res.status(200).send({ message: 'Login successful!', user });
        } else {
            res.status(404).send({ message: 'Invalid email or password.' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error during login.', error });
    }
});

// Update Profile Route
app.put('/api/update-profile', async (req, res) => {
    try {
        const { email, name, password, city, dob } = req.body;
        const user = await User.findOneAndUpdate(
            { email },
            { name, password, city, dob },
            { new: true }
        );
        if (user) {
            res.status(200).send({ message: 'Profile updated successfully!', user });
        } else {
            res.status(404).send({ message: 'User not found.' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error updating profile.', error });
    }
});

// Server Start
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
