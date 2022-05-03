const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createNewUser,
    updateUser,
    deleteUser,
    addNewFriend,
    deleteFriend
 } = require('../../controllers/user-controller');

router
  .route('/')
  .get(getUsers)
  .post(createNewUser);

router
  .route('/:id')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

router
  .route('/:userId/friends/:friendId')
  .post(addNewFriend)
  .delete(deleteFriend);

module.exports = router