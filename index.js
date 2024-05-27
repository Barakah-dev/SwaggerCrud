const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const bookRoute = require('./routes/Book');
const app = express();
const PORT = 2500;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Book API",
      description: "CRUD API for books",
      version: "1.0.0"
    },
    servers: [
      {
        url: "http://localhost:2500/"
      }
    ]
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());

app.use('/api', bookRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
