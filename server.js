require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" folder
app.use(express.static('public'));

// API route to handle like sending
app.get('/api/sendLikes', async (req, res) => {
    const { region, uid } = req.query;

    if (!region || !uid) {
        return res.status(400).json({
            status: 3,
            message: '❌ Missing region or UID',
        });
    }

    try {
        const response = await axios.get(
            `https://likes.api.freefireofficial.com/api/${region}/${uid}?key=${process.env.FREEFIRE_API_KEY}`
        );

        // Send the response from Free Fire API back to frontend
        res.json(response.data);
    } catch (error) {
        console.error("API Error:", error.message);
        res.status(error.response?.status || 500).json({
            status: 3,
            message: '❌ Failed to send likes. Please try again.',
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
