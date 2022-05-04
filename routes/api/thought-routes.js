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

router
  .route('/')
  .get(getThoughts)
  .post(createNewThought);

router
  .route('/:id')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router
  .route('/:thoughtId/reactions')
  .post(createReply);

  router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReply);

module.exports = router;