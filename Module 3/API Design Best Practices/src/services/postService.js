const store = require('../data/postStore');
const { ApiError, ERROR_CODES } = require('../utils/errors');

const DEFAULT_LIMIT = 2;
const MAX_LIMIT = 20;

function parsePagination(query = {}) {
  let limit = Number.parseInt(query.limit, 10);
  if (!Number.isFinite(limit) || limit <= 0) {
    limit = DEFAULT_LIMIT;
  }
  limit = Math.min(limit, MAX_LIMIT);

  let offset = Number.parseInt(query.offset, 10);
  if (!Number.isFinite(offset) || offset < 0) {
    offset = 0;
  }

  return { limit, offset };
}

function listPosts(query = {}) {
  const { limit, offset } = parsePagination(query);
  const all = store.getAllPosts();
  const data = all.slice(offset, offset + limit);

  return {
    data,
    meta: {
      total: all.length,
      limit,
      offset,
      hasMore: offset + data.length < all.length
    }
  };
}

function getPost(id) {
  const post = store.getPostById(id);
  if (!post) {
    throw new ApiError(404, ERROR_CODES.NOT_FOUND, 'Post not found');
  }
  return post;
}

function createPost(body = {}) {
  const title = typeof body.title === 'string' ? body.title.trim() : '';
  const author = typeof body.author === 'string' ? body.author.trim() : '';

  if (!title || !author) {
    throw new ApiError(400, ERROR_CODES.VALIDATION_ERROR, 'title and author are required');
  }

  return store.createPost({ title, author });
}

function likePost(id) {
  const post = store.incrementLikes(id);
  if (!post) {
    throw new ApiError(404, ERROR_CODES.NOT_FOUND, 'Post not found');
  }
  return post;
}

function triggerInternalFailure() {
  throw new Error('SQLITE_CONSTRAINT in posts table');
}

module.exports = {
  listPosts,
  getPost,
  createPost,
  likePost,
  triggerInternalFailure
};
