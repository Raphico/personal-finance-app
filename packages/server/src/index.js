import "dotenv/config";
import { app } from "./app.js";
import { env } from "./env.js";
import { logger } from "./logging.js";

app.listen(env.PORT, () => logger.info(`Server running at port ${env.PORT}`));
