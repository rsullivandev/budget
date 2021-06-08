const { orchestrateData } = require("./services/orchestrateData");


orchestrateData(process.env.UPLOAD, process.env.DATE);