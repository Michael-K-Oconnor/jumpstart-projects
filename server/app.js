const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const db = require('../db/db.js');

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

if (process.env.NODE_ENV === 'development') {
  app.use(cors());
  app.use(morgan('dev'));
}
app.use(helmet());
app.use(bodyParser.json());

app.get(
  '/api/projects/:projectId',
  asyncMiddleware(async (req, res) => {
    if (req.params.projectId === 'sample') {
      const sampleIds = [];
      while (sampleIds.length < 6) {
        const projectId = Math.ceil(Math.random() * 108);
        if (!sampleIds.includes(projectId)) {
          sampleIds.push(projectId);
        }
      }
      const result = await db.getSampleProjects(sampleIds);
      res.json(result);
    } else {
      const result = await db.getProjectInfo(req.params.projectId);
      res.json(result[0]);
    }
  })
);

app.post(
  '/api/projects',
  asyncMiddleware(async (req, res) => {
    console.log(req.body);
    await db.makePledge(req.body);
    res.sendStatus(201);
  })
);

app.use((error, req, res, next) => {
  console.log(`Err with ${req.url}: \n`, error.message);
  res.sendStatus(500);
  next();
});

module.exports = app;
