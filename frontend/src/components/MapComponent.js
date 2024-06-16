// src/components/MapComponent.js
import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const MapComponent = () => {
  const defaultProps = {
    center: {
      lat: 31.9539, 
      lng: 35.9106, 
    },
    zoom: 11,
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={31.9539}
          lng={35.9106}
          text="Learno Office"
        />
      </GoogleMapReact>
    </div>
  );
};

export default MapComponent;
