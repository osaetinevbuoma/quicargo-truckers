import { AxiosError } from "axios";
import LocationAttributes from "../interfaces/LocationAttributes";
import TruckAttributes from "../interfaces/TruckAttributes";
import {
  createLocation,
  createTruck,
  deleteTruck,
  fetchAllTruckLocations,
  fetchRecentTruckLocations,
  fetchTrucks,
  updateLocation,
  updateTruck
} from "../services/TruckService";

test('test fetching all trucks', async () => {
  const trucks: TruckAttributes[] | AxiosError = await fetchTrucks();
  if (trucks instanceof Array)
    expect(trucks.length).toBeGreaterThanOrEqual(0);
});

test('test creating a truck', async () => {
  const data: TruckAttributes = {
		model: "LX1234",
		year: 2021,
		license_plate: "ABC123DE",
		current_km: 23.56,
		max_load: 1000,
		fuel_type: "Gas"
	} as TruckAttributes;
  const truck: TruckAttributes | AxiosError = await createTruck(data);
  expect((truck as TruckAttributes).model).toBe('LX1234');
  expect((truck as TruckAttributes).year).toBe(2021);
  expect((truck as TruckAttributes).license_plate).toBe('ABC123DE');
  expect((truck as TruckAttributes).current_km).toBe(23.56);
  expect((truck as TruckAttributes).max_load).toBe(1000);
  expect((truck as TruckAttributes).fuel_type).toBe('Gas');
});

test('test updating a truck', async () => {
  const trucks: TruckAttributes[] | AxiosError = await fetchTrucks();
  expect((trucks as TruckAttributes[]).length).toBeGreaterThanOrEqual(0);

  const truck: TruckAttributes = (trucks as TruckAttributes[])[0];
  truck.model = 'LX1234';
  truck.year = 2022;
  truck.license_plate = 'ABC123DE';
  truck.current_km = 23.56;
  truck.max_load = 1000;
  truck.fuel_type = 'Diesel';

  const truckInstance: TruckAttributes | AxiosError = await updateTruck(truck);
  expect((truckInstance as TruckAttributes).model).toBe('LX1234');
  expect((truckInstance as TruckAttributes).year).toBe(2022);
  expect((truckInstance as TruckAttributes).license_plate).toBe('ABC123DE');
  expect((truckInstance as TruckAttributes).current_km).toBe(23.56);
  expect((truckInstance as TruckAttributes).max_load).toBe(1000);
  expect((truckInstance as TruckAttributes).fuel_type).toBe('Diesel');
});

test('test creating a truck\'s location', async () => {
  const trucks: TruckAttributes[] | AxiosError = await fetchTrucks();
  expect((trucks as TruckAttributes[]).length).toBeGreaterThan(0);

  const truck: TruckAttributes = (trucks as TruckAttributes[])[0];
  expect((truck as TruckAttributes)).not.toBeNull();

  const truckId: string = truck.id || '';
  expect(truckId).not.toEqual('');

  const data: LocationAttributes = {
		latitude: 10.2323,
		longitude: 7.9324,
		location_datetime: new Date()
	} as LocationAttributes;
  const location: LocationAttributes | AxiosError = await createLocation(data, truckId);
  expect((location as LocationAttributes).latitude).toBe(10.2323);
  expect((location as LocationAttributes).longitude).toBe(7.9324);
});

test('test fetching truck locations', async () => {
  const trucks: TruckAttributes[] | AxiosError = await fetchTrucks();
  expect((trucks as TruckAttributes[]).length).toBeGreaterThan(0);

  const truck: TruckAttributes = (trucks as TruckAttributes[])[0];
  expect((truck as TruckAttributes)).not.toBeNull();

  const locations: LocationAttributes[] | AxiosError = await fetchAllTruckLocations(truck.id as string);
  if (locations instanceof Array)
    expect(locations.length).toBeGreaterThan(0);
});

test('test updating a truck\'s location', async () => {
  const trucks: TruckAttributes[] | AxiosError = await fetchTrucks();
  expect((trucks as TruckAttributes[]).length).toBeGreaterThan(0);

  const truck: TruckAttributes = (trucks as TruckAttributes[])[0];
  expect((truck as TruckAttributes)).not.toBeNull();

  const truckId: string = truck.id || '';
  expect(truckId).not.toEqual('');

  const locations: LocationAttributes[] | AxiosError = await fetchAllTruckLocations(truckId);
  expect((locations as LocationAttributes[]).length).toBeGreaterThan(0);

  const location: LocationAttributes = (locations as LocationAttributes[])[0];
  location.latitude = 11.2323;
  location.longitude = 8.9324;
  
  const locationInstance: LocationAttributes | AxiosError = await updateLocation(location);
  expect((locationInstance as LocationAttributes).latitude).toEqual(11.2323);
  expect((locationInstance as LocationAttributes).longitude).toEqual(8.9324);
});

test('test fetching recent truck locations by number to display', async () => {
  const trucks: TruckAttributes[] | AxiosError = await fetchTrucks();
  expect((trucks as TruckAttributes[]).length).toBeGreaterThan(0);

  const truck: TruckAttributes = (trucks as TruckAttributes[])[0];
  expect((truck as TruckAttributes)).not.toBeNull();

  const truckId: string = truck.id || '';
  expect(truckId).not.toEqual('');

  const locations: LocationAttributes[] | AxiosError = await fetchRecentTruckLocations(truckId, 1);
  expect((locations as LocationAttributes[]).length).toEqual(1);
});

test('test deleting test locations', async () => {
  const trucks: TruckAttributes[] | AxiosError = await fetchTrucks();
  expect((trucks as TruckAttributes[]).length).toBeGreaterThan(0);

  (trucks as TruckAttributes[]).forEach(async (truck: TruckAttributes) => await deleteTruck(truck));

  const remainingTrucks: TruckAttributes[] | AxiosError = await fetchTrucks();
  expect((remainingTrucks as TruckAttributes[]).length).toBe(0);
});
