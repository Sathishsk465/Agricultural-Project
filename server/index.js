const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/market', require('./routes/marketRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/community', require('./routes/communityRoutes'));
app.use('/api/weather', require('./routes/weatherRoutes'));
app.use('/api/advisory', require('./routes/advisoryRoutes'));
app.use('/api/disease', require('./routes/diseaseRoutes'));
app.use('/api/agri_schemes', require('./routes/schemeRoutes'));


app.get('/', (req, res) => {
    res.send('Tamil Vivasayi API is running...');
});

// Connect to DB then start server
connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
