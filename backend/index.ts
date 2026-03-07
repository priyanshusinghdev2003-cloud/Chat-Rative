// import dns from "dns";
// dns.setServers(["1.1.1.1", "8.8.8.8"]);
import app from "./src/app.js";
import { createServer } from "http";
import { connectDB } from "./src/config/database.js";
import { initializeSocket } from "./src/utils/socket.js";

const PORT = process.env.PORT || 8000;
const httpServer = createServer(app);

initializeSocket(httpServer);

connectDB()
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(`Server is running on PORT: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });
