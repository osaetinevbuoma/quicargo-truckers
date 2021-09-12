import { Op } from "sequelize";
import Location, { LocationAttributes, LocationInstance } from "../db/models/Location";
import Truck, { TruckAttributes, TruckInstance } from "../db/models/Truck";

class TruckService {
  static async listTruckLocations(
    truckId: string,
    totalToDisplay: number
    ): Promise<LocationAttributes[]> {
      try {
        const locationInstances: LocationInstance[] = await Location.findAll({
          where: {
            [Op.or]: [{ truck_id: truckId }]
          },
          order: [
            ['created_at', 'DESC']
          ],
          limit: totalToDisplay
        });

        const locations: LocationAttributes[] = [];
        locationInstances.every(location => locations.push(location.toJSON() as LocationAttributes));

        return locations as LocationAttributes[];
      } catch (error) {
        throw new Error(error);
      }
  }

  static async listTrucks(): Promise<TruckAttributes[]> {
    try {
      return await Truck.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  static async createTruckLocation(
    data: LocationAttributes,
    truck: TruckAttributes): Promise<LocationAttributes> {
      try {
        const truckInstance: TruckInstance = await Truck.findByPk(truck.id);
        const location: LocationInstance = await Location.create({
          latitude: data.latitude,
          longitude: data.longitude,
          location_datetime: data.location_datetime
        });
        (location as any).setTruck(truckInstance);
        
        return location.toJSON() as LocationAttributes;
      } catch (error) {
        throw new Error(error);
      }
  }

  static async createTruck(data: TruckAttributes): Promise<TruckAttributes> {
    try {
      const truck: TruckInstance = await Truck.create({
        model: data.model,
        year: data.year,
        license_plate: data.license_plate,
        current_km: data.current_km,
        max_load: data.max_load,
        fuel_type: data.fuel_type
      });

      return truck.toJSON() as TruckAttributes;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default TruckService;
