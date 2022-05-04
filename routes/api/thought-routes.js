const router = require('express').Router();

const {
  getThoughts,
  getSingleThought,
  createNewThought,
  updateThought,
  deleteThought,
  createReply,
  deleteReply
} = require('../../controllers/thought-controller');

//GET all and POST at /api/thoughts
router
  .route('/')
  .get(getThoughts)
  .post(createNewThought);

//GET one, PUT, and DELETE at /api/thoughts/:id
router
  .route('/:id')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

//Post at /api/thoughts/:thoughtId/replies
router
  .route('/:thoughtId/replies')
  .post(createReply);

  router
  .route('/:thoughtId/replies/:replyId')
  .delete(deleteReply);

module.exports = router;