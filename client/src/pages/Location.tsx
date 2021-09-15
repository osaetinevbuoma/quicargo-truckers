import { AxiosError } from "axios";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState
} from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import toastr from "toastr";
import Layout from "../components/layout/Layout";
import LocationAttributes from "../interfaces/LocationAttributes";
import {
  createLocation,
  fetchAllTruckLocations,
  updateLocation
} from "../services/TruckService";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import ModalComponent from "../components/common/ModalComponent";
import LocationForm from "../components/LocationForm";
import LocationMap from "../components/LocationMap";
import "toastr/build/toastr.css";
import { parseDate } from "../utils";

const Location = (): JSX.Element => {
  const [locations, setLocations] = useState<LocationAttributes[]>([]);
  const [location, setLocation] = useState<LocationAttributes | any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showMap, setShowMap] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('Add Location');
  const [locationDateTime, setLocationDateTime] = useState<Date>(new Date());
  
  const { truckId }: any = useParams();

  useEffect(() => {
    fetchLocations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchLocations = async (): Promise<void> => {
    const locations: LocationAttributes[] | AxiosError<any> = await fetchAllTruckLocations(truckId);
    if ((locations as AxiosError).response) {
      toastr.error((locations as AxiosError).response?.data);
      return;
    }

    setLocations(locations as LocationAttributes[]);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    const data: { [key: string]: string | number } = { ...location };
    data[name] = value;
    setLocation(data);
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const data: LocationAttributes = { ...location };
    data.location_datetime = locationDateTime;

    if (data.latitude === null || data.longitude === null || data.location_datetime === null) {
      toastr.error('All fields are required.');
        return;
    }

    setIsLoading(true);

    let locationInstance: LocationAttributes | AxiosError<any>;
    if (data.id) {
      // update location
      locationInstance = await updateLocation(data);
    } else {
      // create new location
      locationInstance = await createLocation(data, truckId);
    }

    if ((locationInstance as AxiosError).response) {
      toastr.error((locationInstance as AxiosError).response?.data);
      return;
    }

    const locationArr: LocationAttributes[] = [ ...locations ];
    if (data.id) {
      const index: number = locations.findIndex(l => l.id === data.id);
      locationArr[index] = locationInstance as LocationAttributes;
    } else {
      locationArr.push(locationInstance as LocationAttributes);
    }

    setLocations(locationArr);
    setShowModal(false);
    resetForm();
    setIsLoading(false);

    Swal.fire({
      title: 'Location Saved',
      text: 'Location was saved successfully',
      icon: 'success',
      showConfirmButton: false,
      timer: 2500
    });
  }

  const resetForm = (): void => {
    setLocation({
      id: '',
      longitude: '',
      latitude: '',
      location_datetime: '',
    });
    setLocationDateTime(new Date());
    setModalTitle('Add Location');
  }

  const editLocation = (location: LocationAttributes): void => {
    setLocationDateTime(new Date(location.location_datetime as Date));
    setLocation(location);
    setModalTitle('Edit Location');
    setShowForm(true);
    setShowMap(false);
    setShowModal(true);
  }

  const openMap = (): void => {
    setModalTitle('Truck Locations');
    setShowForm(false);
    setShowMap(true);
    setShowModal(true);
  }

  return (
    <Layout>
      <div className="row">
        <div className="col-lg-12">
          <div className="mb-3">
            <Link to={"/"} className="btn btn-link btn-sm">
              <i className="fa fa-long-arrow-left fa-2x"></i>
            </Link>&nbsp;
            <button
              className="btn btn-primary"
              onClick={() => {
                setShowForm(true);
                setShowMap(false);
                setShowModal(true);
              }}
            >
              Add Location
            </button>&nbsp;
            <button className="btn btn-primary" onClick={openMap}>
              <i className="fa fa-map-marker"></i>
            </button>
          </div>

          {locations.length === 0 && (
            <h3 className="text-center">
              <i className="fa fa-map-marker"></i> No Location for this Truck. Create a location.
            </h3>
          )}

          {locations.length > 0 && (
            <table className="table table-responsive table-dark table-hover">
              <thead>
                <tr>
                  <th>Longitude</th>
                  <th>Latitude</th>
                  <th>Location Date/Time</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {
                locations.map((location) => (
                  <tr key={location.id}>
                    <td>{location.longitude}</td>
                    <td>{location.latitude}</td>
                    <td>
                      {parseDate(location.location_datetime)}
                    </td>
                    <td style={{textAlign: 'center'}}>
                      <a href="# " onClick={(e) => {
                        e.preventDefault();
                        editLocation(location);
                      }}>
                        <i className="fa fa-pencil"></i>
                      </a>
                    </td>
                  </tr>
                ))
              }
              </tbody>
            </table>
          )}

          <ModalComponent
            title={modalTitle}
            open={showModal}
          >
            {showForm && (
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <LocationForm
                  location={location}
                  datetime={locationDateTime}
                  setDateTime={setLocationDateTime}
                  isLoading={isLoading}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  closeModal={() => setShowModal(false)}
                />
              </MuiPickersUtilsProvider>
            )}

            {showMap && (
              <LocationMap
                truckId={truckId}
                closeModal={setShowModal}
              />
            )}
          </ModalComponent>
        </div>
      </div>
    </Layout>
  );
}

export default Location;
