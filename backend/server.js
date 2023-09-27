const dotenv = require("dotenv");
const app = require("./app");
const connectDB = require("./config/database");

dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT || 3000;
connectDB();

app.listen(PORT, () => {
  console.log(`✅ http://localhost:${PORT}`);
});
