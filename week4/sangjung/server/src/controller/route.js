// 최상위 라우터

// express router
const express = require('express');
const router = express.Router();

//env
require('dotenv').config();
const PATH = process.env.SERVER_PATH;

//view
const ERROR_PAGE = PATH + '/src/view/v1/html/Error.html';

// children routes
const react = require('./react/react');

router.use('/react', react);

router.use((req,res,next) => {
    res.sendFile(ERROR_PAGE);
});

module.exports = router;