import { AxiosError } from "axios";
import LocationAttributes from "../interfaces/LocationAttributes";
import TruckAttributes from "../interfaces/TruckAttributes";
import http from "../utils/http";

export const fetchTrucks = async (): Promise<TruckAttributes[] | AxiosError> => {
  try {
    const res = await http.get('/trucks');
    return res.data as TruckAttributes[];
  } catch (error: AxiosError | any) {
    return error;
  }
}

export const createTruck = async (truck: TruckAttributes): Promise<TruckAttributes | AxiosError> => {
  try {
    const res = await http.post('/truck', { data: truck });
    return res.data as TruckAttributes;
  } catch (error: AxiosError | any) {
    return error;
  }
}

export const updateTruck = async (truck: TruckAttributes): Promise<TruckAttributes | AxiosError> => {
  try {
    const res = await http.put('/truck', { data: truck });
    return res.data as TruckAttributes;
  } catch (error: AxiosError | any) {
    return error;
  }
}

export const deleteTruck = async (truck: TruckAttributes): Promise<void | AxiosError> => {
  try {
    await http.delete(`/truck/${truck.id}`);
  } catch (error: AxiosError | any) {
    return error;
  }
}

export const fetchAllTruckLocations = async (truckId: string): Promise<LocationAttributes[] | AxiosError> => {
  try {
    const res = await http.get(`/truck/${truckId}/locations`);
    return res.data as LocationAttributes[];
  } catch (error: AxiosError | any) {
    return error;
  }
}

export const fetchRecentTruckLocations = async (truckId: string, 
  totalToDisplay: number): Promise<LocationAttributes[] | AxiosError> => {
    try {
      const res = await http.get(`/truck/${truckId}/locations/${totalToDisplay}`);
      return res.data as LocationAttributes[];
    } catch (error: AxiosError | any) {
      return error;
    }
}

export const createLocation = async (location: LocationAttributes, 
  truckId: string): Promise<LocationAttributes | AxiosError> => {
    try {
      const data = {
        location,
        truck: {
          id: truckId
        }
      };
      const res = await http.post('/location', data);
      return res.data as LocationAttributes;
    } catch (error: AxiosError | any) {
      return error;
    }
}

export const updateLocation = async (location: LocationAttributes): Promise<LocationAttributes | AxiosError> => {
    try {
      const data = { location };
      const res = await http.put('/location', data);
      return res.data as LocationAttributes;
    } catch (error: AxiosError | any) {
      return error;
    }
}
