import express, { Request, Response, Router } from 'express';
import axios, { AxiosResponse } from 'axios';

import { prisma } from '../../generated/prisma-client';

const wtApi: string = 'https://www.worldtides.info/api';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  let err = null;
  if (req.query.refreshDb) {
    try {
      await prisma.deleteManyStations();

      const response: AxiosResponse = await axios.get(wtApi, {
        params: {
          stations: true,
          key: process.env.WORLDTIDES_API_KEY
        }
      });
  
      const { data: { stations } } = response;
      
      for (const { id, name, lat, lon: lng } of stations) {
        await prisma.createStation({ wtId: id, name, lat, lng });
      }

      res.json(await prisma.stations());
      return;
    } catch (error) {
      console.log(error);
      err = error;
    }
  }

  if (err) {
    res.json({ error: err });
    return;
  }

  try {
    res.json(await prisma.stations());
    return;
  } catch (error) {
    console.log({ error });
    err = error;
  }
});

router.delete('/', async (_req: Request, res: Response) => {
  try {
    await prisma.deleteManyStations();
    res.json([]);
  } catch (error) {
    console.log({ error });
    res.json({ error });
  }
});

export default router;