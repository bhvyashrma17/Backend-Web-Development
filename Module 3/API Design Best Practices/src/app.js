const express = require('express');
const postRoutes = require('./routes/postRoutes');
const { resetData } = require('./data/postStore');
const controller = require('./controllers/postController');
const http = require('./utils/http');
const { ERROR_CODES } = require('./utils/errors');

function createApp() {
  const app = express();
  app.use(express.json());

  app.use('/', postRoutes);
  app.get('/internal/test-failure', controller.triggerFailure);

  app.use((req, res) => {
    return http.sendError(res, 404, ERROR_CODES.NOT_FOUND, 'Route not found');
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.error(err);

    const status = err.statusCode || 500;
    const code = err.code || ERROR_CODES.INTERNAL_ERROR;
    const message = status === 500
      ? 'Something went wrong. Please try again later.'
      : err.message;

    return http.sendError(res, status, code, message);
  });

  return app;
}

if (require.main === module) {
  const app = createApp();
  const port = 3000;
  app.listen(port, () => {
    console.log(`API listening on port ${port}`);
  });
}

module.exports = {
  createApp,
  resetData
};
