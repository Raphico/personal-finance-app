import "dotenv/config";
import { app } from "./app.js";
import { env } from "./env.js";

app.listen(env.PORT, () => console.log(`Server running at port ${env.PORT}`));
