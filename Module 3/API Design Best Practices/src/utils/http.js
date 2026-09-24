function sendSuccess(res, status, data, meta) {
  const body = meta ? { data, meta } : { data };
  return res.status(status).json(body);
}

function sendError(res, status, code, message) {
  return res.status(status).json({ error: { code, message } });
}

module.exports = {
  sendSuccess,
  sendError
};
