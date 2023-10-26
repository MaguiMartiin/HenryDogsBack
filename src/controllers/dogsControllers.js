const axios = require('axios')
const {MY_API_KEY} = process.env
const { Dog, Temperaments } = require('../db')

const cleanDogs = (arr) => {
    return arr.map((elem)=>{
        const temperamentArray = elem.temperament ? elem.temperament.split(', ') : []
        const weight = elem.weight.metric.split(" ")
        const height = elem.height.metric.split(" ")
        return {
            name: elem.name,
            heightMin: height[0],
            heightMax: height[height.length - 1],
            weightMin: weight[0],
            weightMax: weight[weight.length - 1],
            id: elem.id,
            yearsOfLife: elem.life_span,
            image: elem.reference_image_id,
            temperament: temperamentArray,
            created: false,}
    })
}

const getDogsApi = async () => {
    const dogsApi = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${MY_API_KEY}`)).data
    const cleandogsApi = cleanDogs(dogsApi)
    if (cleandogsApi.temperament && cleandogsApi.temperament.length) {
        for (const temperamentId of cleandogsApi.temperament) {
          const temp = await Temperaments.findByPk(temperamentId)
          if (temp) {
            await newDog.addTemperament(temp)
          }
        }
      }
    return cleandogsApi
}

const getAllDogs = async () => {
    const dbDogs = await Dog.findAll()
    const apiDogs = await getDogsApi()
    return [...dbDogs, ...apiDogs]
}

const getDogsId = async (id, source)=>{
    const dogs = await getDogsApi()
    const apiDogs = dogs.find(dog => dog.id === Number(id))
    const dog = source === "api" ? apiDogs :
    await Dog.findByPk(id)
    return dog
}

const createDog = async (name, image, heightMin, heightMax, weightMin, weightMax, yearsOfLife, temperament)=>{
    const newDog = await Dog.create({name, image, heightMin, heightMax, weightMin, weightMax, yearsOfLife, temperament})
    return newDog
}

module.exports = {getAllDogs, getDogsId, createDog}