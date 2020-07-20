import axios from 'axios';

export const fromLatLng = async (lat, lng) => {
  const response = await axios
    .get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        key: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        latlng: `${lat}, ${lng}`,
      },
    });

  if (response.data.results.length === 0) throw 'Invalid geo coordinates';

  return response.data.results[0];
};

export const fromAddress = async (address) => {
  const response = await axios
    .get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address,
        key: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
      },
    });

  if (response.data.results.length === 0) throw 'Invalid address';

  return response.data.results[0].geometry.location;
};
