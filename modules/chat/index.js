const express = require('express');
const router = express.Router();
const cors = require('cors')
const io = require('socket.io')

router.use(cors())

router.get('/global')
