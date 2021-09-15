import * as express from 'express';
import { LocationAttributes } from '../db/models/Location';
import { TruckAttributes } from '../db/models/Truck';
import TruckService from '../services/TruckService';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send({ home: 'success' });
});

router.get('/trucks', async (req: express.Request, res: express.Response) => {
  try {
    const trucks: TruckAttributes[] = await TruckService.listTrucks();
    return res.status(200).send(trucks);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post('/truck', async (req: express.Request, res: express.Response) => {
  try {
    const {
      model,
      year,
      license_plate,
      current_km,
      max_load,
      fuel_type
    } = req.body.data;

    if (model === null || year === null || license_plate === null || current_km === null ||
      max_load === null || fuel_type === null) {
        return res.status(400).send('All fields are required');
    }

    const truck: TruckAttributes = await TruckService.createTruck(req.body.data as TruckAttributes);
    return res.status(200).send(truck);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post('/location', async (req: express.Request, res: express.Response) => {
  try {
    const {
      longitude,
      latitude,
      location_datetime
    } = req.body.location;

    if (longitude === null || latitude === null || location_datetime === null ||
      req.body.truck === null) {
        return res.status(400).send('All fields are required')
    }

    const location: LocationAttributes = await TruckService.createTruckLocation(req.body.location,
      req.body.truck);
    return res.status(200).send(location);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.get('/truck/:truckId/locations', async (req: express.Request, res: express.Response) => {
  try {
    const locations: LocationAttributes[] = await TruckService
      .listAllTruckLocations(req.params.truckId);
    return res.status(200).send(locations);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.get('/truck/:truckId/locations/:totalToDisplay', async (req: express.Request, res: express.Response) => {
  try {
    const locations: LocationAttributes[] = await TruckService.listTruckLocations(
      req.params.truckId, Number(req.params.totalToDisplay));
    return res.status(200).send(locations);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.put('/truck', async (req: express.Request, res: express.Response) => {
  try {
    const {
      model,
      year,
      license_plate,
      current_km,
      max_load,
      fuel_type
    } = req.body.data;

    if (model === null || year === null || license_plate === null || current_km === null ||
      max_load === null || fuel_type === null) {
        return res.status(400).send('All fields are required');
    }

    const truck: TruckAttributes = await TruckService.updateTruck(req.body.data as TruckAttributes);
    return res.status(200).send(truck);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.put('/location', async (req: express.Request, res: express.Response) => {
  try {
    const {
      longitude,
      latitude,
      location_datetime
    } = req.body.location;

    if (longitude === null || latitude === null || location_datetime === null ||
      req.body.truck === null) {
        return res.status(400).send('All fields are required')
    }

    const location: LocationAttributes = await TruckService.updateTruckLocation(req.body.location);
    return res.status(200).send(location);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.delete('/truck/:truckId', async (req: express.Request, res: express.Response) => {
  try {
    await TruckService.deleteTruck(req.params.truckId);
    return res.send();
  } catch (error) {
    return res.status(400).send(error);
  }
});

export default router;
