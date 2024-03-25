const express = require('express');
const app = express();
const securedRoutes = require('./routes/securedRoutes'); // Adjust the path as necessary

app.use('/api', securedRoutes); // Prefix all routes defined in securedRoutes with '/api'

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
