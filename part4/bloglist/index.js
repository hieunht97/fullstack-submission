const app = require("./app"); // just added
const config = require("./utils/config"); // just added
const logger = require("./utils/logger"); // just added

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
