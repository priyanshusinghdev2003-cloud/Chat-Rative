import app from "./src/app.js";
import { createServer } from "http";
import { connectDB } from "./src/config/database.js";
import dns from "dns";
import { initializeSocket } from "./src/utils/socket.js";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

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
