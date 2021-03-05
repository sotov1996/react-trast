import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import iconMap from "../images/placeholder.png"
import "../../App.css"
 
const AnyReactComponent = () => <div><img style={{width:"30px"}} src={iconMap}/></div>;
 
const SimpleMap = () =>  {
  const defaultProps = {
    center: {
      lat: 52.1011,
      lng: 23.761
    },
    zoom: 18
  };
 
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '70vh', width: '70%', margin: "0 auto" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyB3VXFbNw6NRYvJb-Ee0eBCOT3JgR3zW-8' }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent
            lat={52.1014}
            lng={23.7609} />
        </GoogleMapReact>
      </div>
    );
}
 
export default SimpleMap;