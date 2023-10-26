const axios = require('axios')
const {MY_API_KEY} = process.env
const {Temperaments} = require('../db')

const temperamentsApi = async () => {
    const temperApi = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${MY_API_KEY}`)).data
    const temperaments = [...new Set(temperApi.flatMap((elem) => elem.temperament?.split(',').map((temp) => temp.trim())).filter(Boolean))]
    const temper = temperaments.map(temper=>{
        return Temperaments.findOrCreate({where: {name : temper}})
    })
    await Promise.all(temper)
    const allTemperDb = await Temperaments.findAll()

    return allTemperDb
} 

module.exports = {temperamentsApi}