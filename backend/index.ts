import app from "./src/app";
import { createServer } from "http";
import { connectDB } from "./src/config/database";
import dns from "dns";
import { initializeSocket } from "./src/utils/socket";
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
