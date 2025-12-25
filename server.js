// import app.js
const app = require('./backend/app');

// listen to requests
// http://localhost:3000
app.listen(3000, () => {
    console.log("Server is running on PORT 3000 ...");
});
