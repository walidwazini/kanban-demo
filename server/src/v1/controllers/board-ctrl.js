const Board = require('../models/board')
const Section = require('../models/section')
const Task = require('../models/task')

exports.create = async (req, res,) => {
  try {
    //
    const boardsCount = await Board.find().count()
    // 
    const board = await Board.create({
      user: req.user._id,
      position: boardsCount > 0 ? boardsCount : 0
    })
    res.status(201).json(board)
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.getAll = async (req, res) => {
  try {
    const boards = await Board.find({ user: req.user._id }).sort('-position')
    res.status(200).json(boards)
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.updatePosition = async (req, res) => {
  const { boards } = req.body
  try {
    for (const key in boards.reverse()) {
      const board = boards[key]
      await Board.findByIdAndUpdate(
        board.id,
        { $set: { position: key } }
      )
    }
    res.status(200).json('updated')
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.getOne = async (req, res) => {
  const { boardId } = req.params
  // console.log(req.user)
  try {
    const board = await Board.findOne({ user: req.user._id, _id: boardId })
    if (!board) return res.status(404).json('Board not found')

    const sections = await Section.find({ board: boardId })
    for (const section of sections) {
      const tasks = await Task.find({ section: section.id })
        .populate('section')
        .sort('-position')
      section._doc.tasks = tasks
    }
    board._doc.sections = sections
    res.status(200).json(board)

  } catch (err) {
    res.status(500).json(err)
  }
}

exports.editBoard = async (req, res) => {
  const { boardId } = req.params
  const { title, description, favourite } = req.body

  try {
    if (title === '') req.body.title = 'Untitled'
    if (description === '') req.body.description = 'Add description here'
    const currentBoard = await Board.findById(boardId)
    if (!currentBoard) return res.status(404).json('Board not found')

    if (favourite !== undefined && currentBoard.favourite !== favourite) {
      const favourites = await Board.find({
        user: currentBoard.user,
        favourite: true,
        _id: { $ne: boardId }
      })
      if (favourite) {
        req.body.favouritePosition = favourites.length > 0 ? favourites.length : 0
      } else {
        for (const key in favourites) {
          const element = favourites[key]
          await Board.findOneAndUpdate(
            element.id,
            { $set: { favouritePosition: key } }
          )
        }
      }
    }

    const board = await Board.findByIdAndUpdate(
      boardId,
      { $set: req.body },
    )
    res.status(200).json(board)

  } catch (err) {
    res.status(500).json(err)
  }
}

exports.getFavourites = async (req, res) => {
  try {
    const favourites = await Board.find({ user: req.user._id, favourite: true })
      .sort('-favouritePosition')
    res.status(200).json(favourites)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

exports.changeFavouritePosition = async (req, res) => {
  const { favBoards } = req.body
  try {
    for (const key in favBoards.reverse()) {
      const board = favBoards[key]
      await Board.findByIdAndUpdate(
        board.id,
        { $set: { favouritePosition: key } }
      )
    }
    res.status(200).json('Changed!')
  } catch (err) {
    res.status(500).json(err)
  }
}