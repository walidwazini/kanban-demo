const router = require('express').Router()

router.use('/auth', require('./auth.routes'))
router.use('/boards', require('./board.routes'))
router.use('/boards/:boardId/sections', require('./section.routes'))

module.exports = router;
