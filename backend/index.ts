import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
import app from "./src/app.js";
import { createServer } from "http";
import { connectDB } from "./src/config/database.js";
import { initializeSocket } from "./src/utils/socket.js";

const PORT = process.env.PORT || 8000;
const httpServer = createServer(app);

initializeSocket(httpServer);

await connectDB();

httpServer.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
