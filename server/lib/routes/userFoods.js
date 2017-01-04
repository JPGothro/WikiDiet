
const router = require('express').Router();
const jsonParser = require('body-parser').json();
const userFood = require('../models/userFood');

router
    .get('/', (req, res, next) => {
        userFood.find()
        .then(userfoods => {
            if (!userfoods || userfoods.length === 0) {
                next({code: 404, message: 'No userfoods found.'});
            } else {
                res.send(userfoods);
            };
        })
        .catch(next);
    })

    .get('/:username', (req, res, next) => {
        let userName = req.params.username;
        userFood.find({username: userName}).lean()
        .then(userfood => {
            if (!userfood) {
                next({code: 404, message: `No userfood found for ${username}.`});
            };
            res.send(userfood);            
        })
        .catch(next);
    })

    .post('/', jsonParser, (req, res, next) => {
        new userFood(req.body).save()
            .then(saved => res.send(saved))
            .catch(next);
    });

module.exports = router;
