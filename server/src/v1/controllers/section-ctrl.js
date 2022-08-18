const asyncHandler = require('express-async-handler')
const Section = require('../models/section')
const Task = require('../models/task')

exports.create = asyncHandler(async (req, res) => {
  const { boardId } = req.params

  try {
    const section = await Section.create({ board: boardId })
    section._doc.tasks = []
    res.status(201).json(section)
  } catch (err) {
    res.status(500).json(err)
  }
})

exports.update = asyncHandler(async (req, res) => {
  const { sectionId } = req.params

  try {
    const section = await Section.findByIdAndUpdate(
      sectionId,
      { $set: req.body }
    )
    section._doc.tasks = []
    res.status(201).json(section)
  } catch (err) {
    res.status(500).json(err)
  }
})

exports.delete = asyncHandler(async (req, res) => {
  const { sectionId } = req.params

  try {
    await Task.deleteMany({ section: sectionId })
    await Section.deleteOne({ _id: sectionId })

    res.status(201).json()
  } catch (err) {
    res.status(500).json(err)
  }
})