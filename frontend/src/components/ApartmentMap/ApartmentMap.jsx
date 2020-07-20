import React from 'react';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';

import ApartmentCard from '../ApartmentCard';

export const ApartmentMap = compose(
  withProps({
    /**
     * Note: create and replace your own key in the Google console.
     * https://console.developers.google.com/apis/dashboard
     */
    googleMapURL:
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ position: 'sticky', top: '72px', height: 'calc(100vh - 80px)', width: '100%', marginTop: '24px' }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 46.482376, lng: -80.9932135 }}
  >
    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.apartments && props.apartments.map((apartment, index) => (
        <Marker
          key={apartment.id}
          position={{ lat: apartment.latitude, lng: apartment.longitude }}
          onClick={() => props.onToggleOpen(index)}
        >
          {props.isOpen[index] && (
            <InfoWindow onCloseClick={() => props.onToggleOpen(index)}>
              <ApartmentCard apartment={apartment} actionable={props.actionable} maxWidth="420" />
            </InfoWindow>
          )}
        </Marker>
      ))}
    </MarkerClusterer>
  </GoogleMap>
));

export const ApartmentMapWithCenter = compose(
  withProps({
    /**
     * Note: create and replace your own key in the Google console.
     * https://console.developers.google.com/apis/dashboard
     */
    googleMapURL:
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ position: 'sticky', top: '72px', height: 'calc(100vh - 80px)', width: '100%', marginTop: '24px' }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 46.482376, lng: -80.9932135 }}
    center={props.position || { lat: 46.482376, lng: -80.9932135 }}
  >
    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.position && (
        <Marker
          position={props.position}
        />        
      )}
    </MarkerClusterer>
  </GoogleMap>
));
