import { Op } from "sequelize";
import Location, { LocationAttributes, LocationInstance } from "../db/models/Location";
import Truck, { TruckAttributes, TruckInstance } from "../db/models/Truck";

class TruckService {
  static async listAllTruckLocations(truckId: string): Promise<LocationAttributes[]> {
    try {
      const locationInstances: LocationInstance[] = await Location.findAll({
        where: {
          [Op.or]: [{ truck_id: truckId }]
        }
      });

      const locations: LocationAttributes[] = [];
      locationInstances.every(location => locations.push(location.toJSON() as LocationAttributes));

      return locations as LocationAttributes[];
    } catch (error) {
      throw new Error(error);
    }
  }

  static async deleteTruck(id: string): Promise<void> {
    try {
      await Truck.destroy({
        where: { id }
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  static async updateTruckLocation(location: LocationAttributes): Promise<LocationAttributes> {
    try {
      const locationInstance: LocationInstance = await Location.findByPk(location.id);
      if (!locationInstance) {
        throw new Error('Location not found');
      }

      locationInstance.latitude = location.latitude;
      locationInstance.longitude = location.longitude;
      locationInstance.location_datetime = location.location_datetime;
      locationInstance.save();

      return locationInstance.toJSON() as LocationAttributes;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async updateTruck(truck: TruckAttributes): Promise<TruckAttributes> {
    try {
      const truckInstance: TruckInstance = await Truck.findByPk(truck.id);
      if (!truckInstance) {
        throw new Error('Truck not found');
      }

      truckInstance.model = truck.model;
      truckInstance.year = truck.year;
      truckInstance.license_plate = truck.license_plate;
      truckInstance.current_km = truck.current_km;
      truckInstance.max_load = truck.max_load;
      truckInstance.fuel_type = truck.fuel_type;
      truckInstance.save();

      return truckInstance.toJSON() as TruckAttributes;
    } catch (error) {
      throw new Error(error);
    }
  }
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
