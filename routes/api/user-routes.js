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

 //GET all and POST at /api/users
router
  .route('/')
  .get(getUsers)
  .post(createNewUser);

  //GET one, PUT and DELETE at /api/users/:id
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