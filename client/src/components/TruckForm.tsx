import {
  ChangeEvent,
  FormEvent,
  MouseEvent
} from "react";
import TruckAttributes from "../interfaces/TruckAttributes";

interface ITruckForm {
  truck?: TruckAttributes;
  isLoading: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  closeModal: (e: MouseEvent<HTMLButtonElement>) => void;
}

const TruckForm = (props: ITruckForm): JSX.Element => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-group">
        <label htmlFor="model">Model</label>
        <input
          type="text"
          className="form-control"
          id="model"
          placeholder="Model"
          name="model"
          value={props.truck && (props.truck.model)}
          onChange={props.handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="year">Year</label>
        <input
          type="number"
          className="form-control"
          id="year"
          placeholder="Year"
          name="year"
          value={props.truck && (props.truck.year)}
          onChange={props.handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="license_plate">License Plate</label>
        <input
          type="text"
          className="form-control"
          id="license_plate"
          placeholder="License Plate"
          name="license_plate"
          value={props.truck && (props.truck.license_plate)}
          onChange={props.handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="current_km">Current Mileage (km)</label>
        <input
          type="number"
          className="form-control"
          id="current_km"
          placeholder="Current Mileage (km)"
          name="current_km"
          value={props.truck && (props.truck.current_km)}
          onChange={props.handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="max_load">Maximum Load (kg)</label>
        <input
          type="number"
          className="form-control"
          id="max_load"
          placeholder="Maximum Load (kg)"
          name="max_load"
          value={props.truck && (props.truck.max_load)}
          onChange={props.handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="fuel_type">Fuel Type</label>
        <select
          className="form-control"
          id="fuel_type"
          placeholder="Fuel Type"
          name="fuel_type"
          value={props.truck && (props.truck.fuel_type)}
          onChange={props.handleChange}
        >
          <option value="">-- Select --</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
          <option value="Gas">Gas</option>
        </select>
      </div>
      <button
        className="btn btn-primary mt-3"
        disabled={props.isLoading}
      >
        {props.isLoading ? 'Saving...' : 'Save'}
      </button>
      &nbsp;
      <button
        type="button"
        className="btn btn-primary mt-3"
        disabled={props.isLoading}
        onClick={props.closeModal}
      >
        Cancel
      </button>
    </form>
  );
}

export default TruckForm;
