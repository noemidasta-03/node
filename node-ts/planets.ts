import { Request,Response } from "express"
import pgPromise from "pg-promise"
import Joi from "joi"

const db=pgPromise()("postgres://postgres:postgress@localhost:5432/postgres")

const planetSchema= Joi.object({
  id: Joi.number().integer().required().max(99).min(1),
  name: Joi.string().required().max(10).min(4)

})



console.log(db)
type Planet = {
    id: number,
    name: string,
  };

type Planets = Planet[];

let planets: Planets = [
    {
      id: 1,
      name: "Earth",
    },
    {
      id: 2,
      name: "Mars",
    },
  ];

const getAll= ((req:Request,res:Response)=>{
    res.status(200).json(planets)
})
const getOneById=((req:Request,res:Response)=>{
    const {id}= req.params

    if( Joi.number().integer().required().max(99).min(1).validate(id).error){
      res.status(400).json({msg:`error`})

    }else{
      const planet= planets.find((p)=>p.id === Number(id))


      res.status(200).json(planet)

    }
   
})
const create=((req:Request,res:Response)=>{
    const{id,name}= req.body
    const newPlanet={id,name}
    if(planetSchema.validate(newPlanet).error){
      res.status(400).json({msg:`error`})
      
    }else{
      planets= [...planets, newPlanet]

      res.status(201).json({msg:`the planet was created`})
      
    }
  
})
const updateById=((req:Request,res:Response)=>{
    const id = Number(req.params?.id)
    const {name}= req.body

    const newPlanet = {id, name};
    if(planetSchema.validate(newPlanet).error){
      res.status(400).json({msg:`error`})
    } else {
      let isPlanetFound = false;
      planets = planets.map((planet) => {
        if(planet.id === newPlanet.id) {
          isPlanetFound = true;
          return newPlanet;
        } else {
          return planet;
        }
      })
      res.status(200).json({msg: isPlanetFound ? `the planet was update` : `no planet found with given id: ${id}`})
    }
})
const deleteById=((req:Request,res:Response)=>{
    const{id}=req.params
   

    let isPlanetFound= false;

    planets=planets.filter((planet)=>{
      if(planet.id == Number(id)){
        isPlanetFound= true;

      }
      return planet.id !== Number(id)

    })
    
    res.status(200).json({msg: isPlanetFound ? `the planet was deleted` : `no planet found with given id: ${id}`})
})

export{getAll,getOneById,create,updateById,deleteById}
