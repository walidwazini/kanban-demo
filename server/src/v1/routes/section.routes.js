const router = require('express').Router({ mergeParams: true })

const validation = require('../handlers/validation')
const tokenHandler = require('../handlers/tokenHandler')
const sectionController = require('../controllers/section-ctrl')

router.post(
  '/',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  sectionController.create
)

router.put(
  '/:sectionId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid board id')
    } else return Promise.resolve()
  }),
  param('sectionId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid section id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  sectionController.update
)

router.delete(
  '/:sectionId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid board id')
    } else return Promise.resolve()
  }),
  param('sectionId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid section id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  sectionController.delete
)

module.exports = router