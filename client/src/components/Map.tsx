import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader
} from "@react-google-maps/api";
import React, { useState } from "react";
import LocationAttributes from "../interfaces/LocationAttributes";
import { parseDate } from "../utils";

const containerStyle = {
  width: '100%',
  height: '50vh'
};

const center = {
  lat: 52.370216,
  lng: 4.895168
};

interface IMap {
  locations: LocationAttributes[];
  zoom: number;
}

const Map = ({ locations, zoom }: IMap): JSX.Element => {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [showInfoIndex, setShowInfoIndex] = useState<number>(0);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string
  });

  const displayInfo = (index: number): void => setShowInfoIndex(index);

  if (!isLoaded) return <></>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
    >
      {locations.map((location, index) => (
        <React.Fragment key={location.id}>
          <Marker
            key={location.id}
            position={{
              lat: location.latitude,
              lng: location.longitude
            }}
            onClick={(e) => {
              displayInfo(index)
              setShowInfo(true);
            }}
          >
            {showInfo && showInfoIndex === index && (
              <InfoWindow
                position={{
                  lng: location.longitude,
                  lat: location.latitude
                }}
                onCloseClick={() => {
                  setShowInfoIndex(0);
                  setShowInfo(false);
                }}
              >
                <div style={{
                  background: '#FFFFFF',
                }}>
                  <div className="row mb-3">
                    <div className="col-sm-6">
                      <strong>Longitude</strong>
                    </div>
                    <div className="col-sm-6">
                      {location.longitude}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-6">
                      <strong>Latitude</strong>
                    </div>
                    <div className="col-sm-6">
                      {location.latitude}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-6">
                      <strong>Location Date/Time</strong>
                    </div>
                    <div className="col-sm-6">
                      {parseDate(location.location_datetime)}
                    </div>
                  </div>
                </div>
              </InfoWindow>
            )}
          </Marker>
        </React.Fragment>
      ))}
    </GoogleMap>
  );
}

export default Map;
