/* eslint-disable prettier/prettier */

export const images = {
  chocolate: require('../assets/images/chocolate.png'),
  raspberry: require('../assets/images/raspberries.png'),
  wine: require('../assets/images/wines.png'),
}

export const API_URL = "https://grocery-go.herokuapp.com/api"
// export const API_URL = "http://localhost:8080.com/api"

let formatting_options = {
  style: 'currency',
  currency: 'ZAR',
  minimumFractionDigits: 2,
};

export const RandString = new Intl.NumberFormat( "en-ZA", formatting_options);