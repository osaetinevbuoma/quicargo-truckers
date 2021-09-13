import { expect } from "chai";
import TruckService from "../services/TruckService";
import Truck, { TruckAttributes } from "../db/models/Truck";
import Location, { LocationAttributes } from "../db/models/Location";

describe('test truck management services', () => {
  it('create a new truck', async () => {
    const data: TruckAttributes = {
      model: 'LX1234',
      year: 2021,
      license_plate: 'ABC123DE',
      current_km: 23.56,
      max_load: 1000,
      fuel_type: 'Gas'
    };
  
    const truck: TruckAttributes = await TruckService.createTruck(data);
    expect(truck.model).to.be.equal(data.model);
    expect(truck.year).to.be.equal(data.year);
    expect(truck.license_plate).to.be.equal(data.license_plate);
    expect(truck.current_km).to.be.equal(data.current_km);
    expect(truck.max_load).to.be.equal(data.max_load);
    expect(truck.fuel_type).to.be.equal(data.fuel_type);
  });

  it('update a truck', async () => {
    const trucks: TruckAttributes[] = await Truck.findAll();
    expect(trucks.length).to.be.greaterThan(0);

    const truck: TruckAttributes = trucks[0];
    truck.model = 'LX1234'
    truck.year = 2020;
    truck.fuel_type = 'Electric';
    
    const updatedTruck: TruckAttributes = await TruckService.updateTruck(truck);
    expect(updatedTruck.model).to.be.equal(truck.model);
    expect(updatedTruck.year).to.be.equal(truck.year);
    expect(updatedTruck.license_plate).to.be.equal(truck.license_plate);
    expect(updatedTruck.current_km).to.be.equal(truck.current_km);
    expect(updatedTruck.max_load).to.be.equal(truck.max_load);
    expect(updatedTruck.fuel_type).to.be.equal(truck.fuel_type);
  });

  it('create truck locations', async () => {
    const trucks: TruckAttributes[] = await Truck.findAll();
    expect(trucks.length).to.be.greaterThan(0);

    const truck: TruckAttributes = trucks[0];

    const data1: LocationAttributes = {
      latitude: 9.3942,
      longitude: 10.8442,
      location_datetime: new Date(),
    };

    const data2: LocationAttributes = {
      latitude: 10.2323,
      longitude: 7.9324,
      location_datetime: new Date(),
    };

    const location1: LocationAttributes = await TruckService.createTruckLocation(data1, truck);
    const location2: LocationAttributes = await TruckService.createTruckLocation(data2, truck);

    expect(location1.latitude).to.equal(data1.latitude);
    expect(location1.longitude).to.equal(data1.longitude);
    expect(location2.latitude).to.equal(data2.latitude);
    expect(location2.longitude).to.equal(data2.longitude);
  });

  it('update a truck location', async () => {
    const locations: LocationAttributes[] = await Location.findAll();
    expect(locations.length).to.be.greaterThan(0);

    const latitude: number = 11.0902;
    const longitude: number = 13.0923;
    const location_datetime: Date = new Date();

    const location: LocationAttributes = locations[0];
    location.latitude = latitude;
    location.longitude = longitude;
    location.location_datetime = location_datetime;

    const updateLocation: LocationAttributes = await TruckService.updateTruckLocation(location);
    expect(updateLocation.latitude).to.be.equal(latitude);
    expect(updateLocation.longitude).to.be.equal(longitude);
  });

  it('list trucks', async () => {
    const trucks: TruckAttributes[] = await TruckService.listTrucks();
    expect(trucks.length).to.be.greaterThan(0);
  });

  it('list truck recent locations', async () => {
    const trucks: TruckAttributes[] = await Truck.findAll();
    expect(trucks.length).to.be.greaterThan(0);

    const locations: LocationAttributes[] = await TruckService.listTruckLocations(trucks[0].id, 2);
    expect(locations.length).to.be.equal(2);
  });

  it('delete truck and locations', async () => {
    const trucks: TruckAttributes[] = await Truck.findAll();
    trucks.every(async (truck) => await TruckService.deleteTruck(truck.id));

    expect((await Truck.findAll()).length).to.be.equal(0);
    expect((await Location.findAll()).length).to.be.equal(0);
  });
});
