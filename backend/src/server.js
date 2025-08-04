import express from 'express';
import cors from 'cors';
import yaml from 'js-yaml';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'node:path';
import OpenApiValidator from 'express-openapi-validator';
import {fileURLToPath} from 'node:url';
import routes from './routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const apiSpec = path.join(__dirname, '../api/openapi.yaml');

const apidoc = yaml.load(fs.readFileSync(apiSpec, 'utf8'));
app.use('/api/v0/docs', swaggerUi.serve, swaggerUi.setup(apidoc));

// Allow connections from a non common origin so the UI can connect
app.use(cors({origin: 'http://localhost:3000'}));

app.use(
    OpenApiValidator.middleware({
      apiSpec: apiSpec,
      validateRequests: true,
      validateResponses: true,
    }),
);

app.use('/api/v0', routes);

app.use((err, req, res) => {
  res.status(err.status).json({
    message: err.message,
    errors: err.errors,
    status: err.status,
  });
});

app.listen(4000, () => {
  console.log('Server listening on http://localhost:4000/api/v0/docs');
});

export default app;