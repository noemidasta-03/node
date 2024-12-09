import { Request, Response } from "express";
import pgPromise from "pg-promise";
import Joi from "joi";

const db = pgPromise()(
  "postgres://postgres:postgres@localhost:5432/planets_db"
);

const planetSchema = Joi.object({
  id: Joi.number().integer().required().max(99).min(1),
  name: Joi.string().required().max(10).min(4),
});

console.log(db);
type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

const getAll = (req: Request, res: Response) => {
  db.many(`SELECT * FROM planets`)
    .then((planets: Planets) => {
      res.status(200).json(planets);
    })
    .catch((error) => {
      res.status(404).json({ msg: "error " });
    });
};
const getOneById = (req: Request, res: Response) => {
  const { id } = req.params;

  if (Joi.number().integer().required().max(99).min(1).validate(id).error) {
    res.status(400).json({ msg: `error` });
  } else {
    db.one(`SELECT * FROM planets WHERE id=$1`, Number(id))
      .then((planet?: Planet) => {
        res.status(200).json(planet);
      })
      .catch((error) => {
        res.status(404).json({ msg: "error " });
      });
  }
};
const create = (req: Request, res: Response) => {
  const { name } = req.body;
  const newPlanet = { id: 1, name };
  if (planetSchema.validate(newPlanet).error) {
    res.status(400).json({ msg: `validation error` });
  } else {
    db.query(`INSERT INTO planets (name) VALUES ($1)`, name).then(() => {
      res.status(201).json({ msg: `the planet was created` });
    });
  }
};
const updateById = (req: Request, res: Response) => {
  const id = Number(req.params?.id);
  const { name } = req.body;

  const newPlanet = { id, name };
  if (planetSchema.validate(newPlanet).error) {
    res.status(400).json({ msg: `error` });
  } else {
    db.query(`UPDATE planets SET name=$1 WHERE id=$2`, [name, id]).then(() => {
      res.status(200).json({
        msg: `the planet was update`,
      });
    });
  }
};
const deleteById = (req: Request, res: Response) => {
  const { id } = req.params;

  let isPlanetFound = false;

  db.query(`DELETE FROM planets WHERE id=$1`, id).then(() => {
    res.status(200).json({
      msg: `the planet was deleted`,
    });
  });
};

export { getAll, getOneById, create, updateById, deleteById };
