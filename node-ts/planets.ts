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
    const {id}= req.params
    const {name}= req.body
    planets=planets.map(p=> p.id === Number(id) ? ({...p,name}):p)


    res.status(200).json({msg:`the planet was update`})
})
const deleteById=((req:Request,res:Response)=>{
    const{id}=req.params
    planets= planets.filter(p=>p.id !== Number(id))

   
    res.status(200).json({msg:`the planet was delete`})
})

export{getAll,getOneById,create,updateById,deleteById}
