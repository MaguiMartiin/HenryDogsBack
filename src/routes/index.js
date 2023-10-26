const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const dogsRouter = require("./dogsRoutes")
const temperamentsRouter = require("./temperamentsRoutes")
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", dogsRouter)
router.use("/temperaments", temperamentsRouter)

module.exports = router;
