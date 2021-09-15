import { AxiosError } from "axios";
import { useState } from "react";
import LocationAttributes from "../interfaces/LocationAttributes";
import { fetchRecentTruckLocations } from "../services/TruckService";
import Map from "./Map";

interface ILocationMap {
  truckId: string;
  closeModal: Function;
}

const LocationMap = (props: ILocationMap): JSX.Element => {
  const [mapLocations, setMapLocations] = useState<LocationAttributes[]>([]);
  const [totalToDisplay, setTotalToDisplay] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(8);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchLocationsForMap = async (): Promise<void> => {
    if (totalToDisplay) {
      setIsLoading(true);

      const locations: LocationAttributes[] | AxiosError = await fetchRecentTruckLocations(
        props.truckId, totalToDisplay);
      if ((locations as AxiosError).response) {
        toastr.error((locations as AxiosError).response?.data);
        return;
      }

      setMapLocations(locations as LocationAttributes[]);
      setZoom(10);
      setIsLoading(false);
    }
  }

  const resetMap = (): void => {
    setTotalToDisplay(0);
    setMapLocations([]);
    setZoom(10);
    props.closeModal(false);
  }

  return (
    <>
      <form className="row row-cols-lg-auto g-3 align-items-center">
        <div className="col-lg-10">
          <input
            type="number"
            className="form-control"
            placeholder="Enter the number of locations to display"
            value={totalToDisplay}
            onChange={(e) => setTotalToDisplay(Number(e.target.value))}
          />
        </div>
        <div className="col-lg-2">
          <button
            type="button"
            className="btn btn-primary"
            onClick={fetchLocationsForMap}
          >
            <i className="fa fa-search"></i>
          </button>
        </div>
      </form>
      
      {isLoading && <p>Fetching... <i className="fa fa-spinner fa-spin" /></p>}
      <hr />
      <Map locations={mapLocations} zoom={zoom} />
      <hr />
      <button
        className="btn btn-primary"
        onClick={() => resetMap()}
      >
        Close Map
      </button>
    </>
  );
}

export default LocationMap;
