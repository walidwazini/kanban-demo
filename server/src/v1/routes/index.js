const router = require('express').Router()
const taskRoutes = require('./task.routes')

router.use('/auth', require('./auth.routes'))
router.use('/boards', require('./board.routes'))
router.use('/boards/:boardId/sections', require('./section.routes'))
router.use('/boards/:boardId/tasks', taskRoutes)

module.exports = router;
