import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState
} from "react";
import { AxiosError } from "axios";
import toastr from "toastr";
import ModalComponent from "../components/common/ModalComponent";
import Layout from "../components/layout/Layout";
import TruckAttributes from "../interfaces/TruckAttributes";
import {
  createTruck,
  deleteTruck,
  fetchTrucks,
  updateTruck
} from "../services/TruckService";
import TruckForm from "../components/TruckForm";
import "toastr/build/toastr.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Home = (): JSX.Element => {
  const [trucks, setTrucks] = useState<TruckAttributes[]>([]);
  const [truck, setTruck] = useState<TruckAttributes | any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('Add Truck');

  useEffect(() => {
    fetchTruckList();
  }, []);

  const fetchTruckList = async (): Promise<void> => {
    const trucks: TruckAttributes[] | AxiosError<any> = await fetchTrucks();
    if ((trucks as AxiosError).response) {
      toastr.error((trucks as AxiosError).response?.data);
      return;
    }

    setTrucks(trucks as TruckAttributes[]);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    const data: { [key: string]: string | number } = { ...truck };
    data[name] = value;
    setTruck(data);
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const data: TruckAttributes = { ...truck };

    if (data.model === null && data.current_km === null && data.fuel_type === null &&
      data.license_plate === null && data.max_load === null && data.year === null) {
        toastr.error('All fields are required.');
        return;
    }

    setIsLoading(true);

    let truckInstance: TruckAttributes | AxiosError<any>;
    if (data.id) {
      // update existing truck
      truckInstance = await updateTruck(data);
    } else {
      // create new truck
      truckInstance = await createTruck(data);
    }

    if ((truckInstance as AxiosError).response) {
      toastr.error((truckInstance as AxiosError).response?.data);
      return;
    }

    const trucksArr: TruckAttributes[] = [ ...trucks ];
    if (data.id) {
      // update trucks array
      const index: number = trucks.findIndex(t => t.id === data.id);
      trucksArr[index] = truckInstance as TruckAttributes;
    } else {
      // push to trucks array
      trucksArr.push(truckInstance as TruckAttributes);
    }

    setTrucks(trucksArr);
    setShowModal(false);
    resetForm();
    setIsLoading(false);

    Swal.fire({
      title: 'Truck Saved',
      text: 'Truck was saved successfully',
      icon: 'success',
      showConfirmButton: false,
      timer: 2500
    });
  }

  const editTruck = (truck: TruckAttributes): void => {
    setTruck(truck);
    setModalTitle('Edit Truck');
    setShowModal(true);
  }

  const resetForm = (): void => {
    setTruck({
      id: '',
      model: '',
      year: '',
      license_plate: '',
      current_km: '',
      max_load: '',
      fuel_type: ''
    });
    setModalTitle('Add Truck');
  }

  const confirmDelete = (truck: TruckAttributes): void => {
    Swal.fire({
      title: 'Delete Truck',
      text: 'This action cannot be reversed',
      showConfirmButton: true,
      confirmButtonColor: '#0d6efd',
      showCancelButton: true,
      cancelButtonColor: '#0d6efd',
    })
      .then((result) => {
        if (result.isConfirmed) handleDelete(truck);
      });
  }

  const handleDelete = async (truck: TruckAttributes): Promise<void> => {
    Swal.fire({
      title: 'Delete Truck',
      text: 'Deleting...',
      icon: 'info',
      showConfirmButton: false
    });

    const res: void | AxiosError<any> = await deleteTruck(truck);
    if (res) {
      toastr.error((res as AxiosError).response?.data);
      return;
    }

    Swal.fire({
      title: 'Truck Deleted',
      text: 'Truck deleted successfully',
      icon: 'success',
      showConfirmButton: false,
      timer: 2500
    });

    const index = trucks.findIndex(t => t.id === truck.id);
    const data = trucks.slice(0, index).concat(trucks.slice(index + 1));
    setTrucks(data);
  }

  return (
    <Layout>
      <div className="row">
        <div className="col-lg-12">
          <div className="mb-3">
            <button className="btn btn-primary" onClick={() => {
              resetForm();
              setShowModal(true);
            }}>
              Add Truck
            </button>
          </div>

          {trucks.length === 0 && (
            <h3 className="text-center">
              <i className="fa fa-truck"></i> No Trucks available. Create a truck.
            </h3>
          )}

          {trucks.length > 0 && (
            <table className="table table-striped table-hover table-bordered table-dark">
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Year</th>
                  <th>License Plate</th>
                  <th>Current Mileage (km)</th>
                  <th>Maximum Load (kg)</th>
                  <th>Fuel Type</th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {
                trucks.map(truck => (
                  <tr key={truck.id}>
                    <td>{truck.model}</td>
                    <td>{truck.year}</td>
                    <td>{truck.license_plate}</td>
                    <td>{truck.current_km}</td>
                    <td>{truck.max_load}</td>
                    <td>{truck.fuel_type}</td>
                    <td style={{textAlign: 'center'}}>
                      <a href="# " onClick={(e) => {
                        e.preventDefault();
                        editTruck(truck);
                      }}>
                        <i className="fa fa-pencil"></i>
                      </a>
                    </td>
                    <td style={{textAlign: 'center'}}>
                      <a
                        href="# "
                        className="text-danger"
                        onClick={(e) => {
                          e.preventDefault();
                          confirmDelete(truck);
                        }}
                      >
                        <i className="fa fa-trash"></i>
                      </a>
                    </td>
                    <td style={{textAlign: 'center'}}>
                      <Link to={`/truck/${truck.id}/locations`}>
                        View Locations
                      </Link>
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
            <TruckForm
              truck={truck}
              isLoading={isLoading}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              closeModal={() => setShowModal(false)}
            />
          </ModalComponent>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
