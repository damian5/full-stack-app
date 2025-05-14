import express, { Router } from "express";
import { getPeople, getPersonById } from "../controllers/people";
import { getFilms, getFilmById } from "../controllers/films";
import { requestLogger } from "../middleware/requestLogger";

const router: Router = express.Router();

router.use(requestLogger);

router.get("/people/:id", getPersonById);
router.get("/people", getPeople);

router.get("/films/:id", getFilmById);
router.get("/films", getFilms);

export default router;
