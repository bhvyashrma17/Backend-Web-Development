const service = require('../services/postService');
const http = require('../utils/http');
const asyncHandler = require('../utils/asyncHandler');

const list = asyncHandler(async (req, res) => {
  const { data, meta } = service.listPosts(req.query);
  return http.sendSuccess(res, 200, data, meta);
});

const getOne = asyncHandler(async (req, res) => {
  const post = service.getPost(req.params.id);
  return http.sendSuccess(res, 200, post);
});

const create = asyncHandler(async (req, res) => {
  const post = service.createPost(req.body);
  return http.sendSuccess(res, 201, post);
});

const like = asyncHandler(async (req, res) => {
  const post = service.likePost(req.params.id);
  return http.sendSuccess(res, 200, post);
});

const triggerFailure = asyncHandler(async () => {
  service.triggerInternalFailure();
});

module.exports = {
  list,
  getOne,
  create,
  like,
  triggerFailure
};
