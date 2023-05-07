/* eslint-disable prettier/prettier */
export const icons = {
  bakery_icon: require('../assets/icons/bakery.png'),
  fresh_produce_icon: require('../assets/icons/cabbage.png'),
  canned_icon: require('../assets/icons/can.png'),
  dairy_icon: require('../assets/icons/dairy.png'),
  detergent_icon: require('../assets/icons/detergent.png'),
  drinks_icon: require('../assets/icons/drinks.png'),
  frozen_icon: require('../assets/icons/frozen-food.png'),
  meat_icon: require('../assets/icons/meat.png'),
  personal_care_icon: require('../assets/icons/personal-care.png'),
  snacks_icon: require('../assets/icons/snacks.png'),
};

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