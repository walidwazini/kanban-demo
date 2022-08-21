const router = require('express').Router({ mergeParams: true })
const { param, body } = require('express-validator')

const validation = require('../handlers/validation')
const tokenHandler = require('../handlers/tokenHandler')
const taskController = require('../controllers/task-ctrl')

router.post(
  '/',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Invalid board id.')
    } else {
      return Promise.resolve()
    }
  }),
  body('sectionId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Invalid section id.')
    } else {
      return Promise.resolve()
    }
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.create
)

router.put(
  '/updatePosition',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Invalid board id.')
    } else {
      return Promise.resolve()
    }
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.updatePosition
)

router.delete(
  '/:taskId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Invalid board id.')
    } else {
      return Promise.resolve()
    }
  }),
  param('taskId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Invalid task id.')
    } else {
      return Promise.resolve()
    }
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.delete
)

router.put(
  '/:taskId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Invalid board id.')
    } else {
      return Promise.resolve()
    }
  }),
  param('taskId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Invalid task id.')
    } else {
      return Promise.resolve()
    }
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.update
)


module.exports = router