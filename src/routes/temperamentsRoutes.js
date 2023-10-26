const {Router} = require('express')
const temperamentsRouter = Router()
const {getTemperamentsHandler} = require('../handlers/temperamentsHandlers')

temperamentsRouter.get('/', getTemperamentsHandler)

module.exports = temperamentsRouter