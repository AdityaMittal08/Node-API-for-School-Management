require('dotenv').config();
const express = require('express');
const schoolRoutes = require('./src/routes/school.routes');

const app = express();
app.use(express.json());

app.use('/api', schoolRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});