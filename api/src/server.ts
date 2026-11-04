import app from "./app.js";
import { env } from "./config/env.js";

const PORT = Number(process.env.PORT) || 3000;

app.listen(env.port, "0.0.0.0", () => {
  console.log(`API running on port ${PORT}`);
});
