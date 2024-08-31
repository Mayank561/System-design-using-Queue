const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const swaggerUi = require("swagger-ui-express");
const { spec } = require("./swagger");
const routes = require("./routes/index"); 

const app = express();
const port = 1000;

app.use(bodyParser.json());
app.use(cors());

// Use the routes defined in routes/index.js
app.use("/api", routes);

// Set up Swagger UI for API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
