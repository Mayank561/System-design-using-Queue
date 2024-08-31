const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Flow Distribution Algorithm",
            version: "1.0.0",
            description: "API Endpoints for Flow Distribution Algorithm among astrologers",
        },
        servers: [
            {
                url: "http://localhost:1000",
                description: "Dev Server",
            },
        ],
    },
    apis: ["./routes/index.js"], 
};

const spec = swaggerJsdoc(options);

module.exports = { spec, swaggerUi };
