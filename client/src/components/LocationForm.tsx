import { DateTimePicker } from "@material-ui/pickers";
import {
  ChangeEvent,
  FormEvent,
  MouseEvent
} from "react";
import LocationAttributes from "../interfaces/LocationAttributes";

interface ILocationForm {
  location?: LocationAttributes;
  isLoading: boolean;
  datetime: Date;
  setDateTime: any;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  closeModal: (e: MouseEvent<HTMLButtonElement>) => void;
}

const LocationForm = (props: ILocationForm): JSX.Element => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-group">
        <label htmlFor="longitude">Longitude</label>
        <input
          type="number"
          className="form-control"
          id="longitude"
          placeholder="Longitude"
          name="longitude"
          value={props.location?.longitude}
          onChange={props.handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="latitude">Latitude</label>
        <input
          type="number"
          className="form-control"
          id="latitude"
          placeholder="Latitude"
          name="latitude"
          value={props.location?.latitude}
          onChange={props.handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="location_datetime">Date/Time at last location</label><br />
        <DateTimePicker
          className="form-control"
          id="location_datetime"
          value={props.datetime}
          onChange={props.setDateTime}
        />
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

export default LocationForm;