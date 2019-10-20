import express, { Request, Response, Router } from 'express';
import axios, { AxiosResponse } from 'axios';

import { prisma } from '../../generated/prisma-client';

const wtApi: string = 'https://www.worldtides.info/api';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  let { refreshDb, lat, lng }: { refreshDb: any, lat: number, lng: number } = req.query;
  lat = Number(lat);
  lng = Number(lng);

  let err = null;

  if (refreshDb) {
    try {
      const response: AxiosResponse = await axios.get(wtApi, {
        params: {
          extremes: true,
          lat,
          lon: lng,
          key: process.env.WORLDTIDES_API_KEY
        }
      });
  
      const { extremes }: { station: string, extremes: [] } = response.data;
      
      for (const { dt, height, type } of extremes) {
        await prisma.createExtreme({ 
          dt: new Date(dt * 1000), 
          height, 
          type,
          lat,
          lng
        });
      }

      res.json(await prisma.extremes({ where: { lat, lng } }));
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
    if (lat && lng) {
      res.json(await prisma.extremes({ where: { lat, lng } }));
      return;
    }
    res.json(await prisma.extremes());
  } catch (error) {
    console.log({ error });
    err = error;
  }
});

router.delete('/', async (req: Request, res: Response) => {
  try {
    await prisma.deleteManyExtremes();
    res.json([]);
  } catch (error) {
    console.log({ error });
    res.json({ error });
  }
});

export default router;