const http = require("http");
const app = require("./app");
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;  

app.listen(PORT, () => {
    console.log(` ✅ Server is running on port ${PORT}`);
});

