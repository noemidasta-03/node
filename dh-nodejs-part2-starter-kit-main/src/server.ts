import express from "express"
import morgan from "morgan"

const app= express()

app.use(express.json())

app.use(morgan("dev"))

app.listen(process.env.PORT)


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


