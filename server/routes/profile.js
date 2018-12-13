const express = require('express');
const profileRouter = express.Router();
const parser = require('../configs/cloudinary');

profileRouter.post('/upload_photo', parser.single('image'), (req, res) => {
    User.findOneAndUpdate({ _id: req.body.id }, {
      image: req.file.url,
    })
      .then(() => {
        res.json({
          success: true,
          image: req.file.url,
        });
      })
      .catch(err => console.log(err));
  });



// function findBuddy(newUser) {
//     return User.find({
//         rol: 'buddy',
//         destination_city: newUser.destination_city,
//         spoken_languages: {
//           $in: newUser.spoken_languages
//         }
//       })
//       .then(buddies => {
//         console.log(buddies + 'buddies encontradfos')
//         return buddies;
//       })
//       .catch(err => {
//         console.log('ERROR!');
//         return '';
//       })
//   }

module.exports = profileRouter;