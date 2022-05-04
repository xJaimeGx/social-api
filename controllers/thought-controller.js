const { User, Thought} = require('../models');

const thoughtController = {

  getThoughts(req, res) {
    Thought.find({})
      .populate({
        path: 'replies',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
    },

  getSingleThought({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: 'replies',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thoughts found.' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
    },

  createNewThought({ body }, res) {
    Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No user found' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thoughts found.' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
    },

  // delete thought by ID
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thoughts found.' });
          return;
        }
        return User.findOneAndUpdate(
          { _id: parmas.userId },
          { $pull: { thoughts: params.Id } },
          { new: true }
        )
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No thoughts found.' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
    },

  createReply({params, body}, res) {
    Thought.findOneAndUpdate(
      {_id: params.thoughtId}, 
      {$push: {replies: body}}, 
      {new: true, runValidators: true})
    .populate({path: 'replies', select: '-__v'})
    .select('-__v')
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({message: 'No thoughts found.'});
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err))
  },

  deleteReply({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { replies: { replyId: params.replyId } } },
      { new: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thoughts found.'});
          return;
        }
       res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  }


};

module.exports = thoughtController