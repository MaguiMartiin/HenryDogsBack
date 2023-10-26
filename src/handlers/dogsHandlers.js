const {getAllDogs, getDogsId, createDog} = require('../controllers/dogsControllers')
const {Dog,Temperaments} = require('../db')

const getDogsHandler = async (req, res)=>{
    const {name} = req.query
    try {
        const allDogs = await getAllDogs()
        if (name){ 
            const results = allDogs.filter(p => p.name.toLowerCase().includes(name.toLowerCase()))
        if (results.length) return res.status(200).json(results)
            else return null} 
        res.status(200).json(allDogs)
    } catch (error) {
        res.status(400).json({error: error.message})
    }  
}

const getDogsIdHandler = async (req, res) => {
    const {id} = req.params
    const source = isNaN(id)? "bdd" : "api"
    try {
        const dogId = await getDogsId(id, source)
        res.status(200).json(dogId)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const createDogHandler = async (req, res)=>{
    const {name, image, heightMin, heightMax, weightMin, weightMax, yearsOfLife, temperament} = req.body 
    try {
        const newDog = await Dog.create({name, image, heightMin, heightMax, weightMin, weightMax, yearsOfLife, temperament,created: true})
        if (temperament && temperament.length) {
            for (const temperamentName of temperament) {
              const temp = await Temperaments.findOrCreate({
                where: { name: temperamentName },
                defaults: { name: temperamentName }
              })
              await newDog.addTemperament(temp[0])
            }}
        res.status(201).json(newDog)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

module.exports = {getDogsHandler, getDogsIdHandler, createDogHandler}