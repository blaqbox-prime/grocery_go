import { icons } from "./config";

export const avatarImage = "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=600";

// export const CATEGORIES = [
//   {title: 'Produce', icon: icons.fresh_produce_icon},
//   {title: 'Meat', icon: icons.meat_icon},
//   {title: 'Dairy', icon: icons.dairy_icon},
//   {title: 'Bakery', icon: icons.bakery_icon},
//   {title: 'Frozen', icon: icons.frozen_icon},
//   {title: 'Drinks', icon: icons.drinks_icon},
//   {title: 'Snacks', icon: icons.snacks_icon},
//   {title: 'Canned', icon: icons.canned_icon},
//   {title: 'Personal', icon: icons.personal_care_icon},
//   {title: 'Household', icon: icons.detergent_icon},
// ]

export const CATEGORIES = [
  {title: 'All', icon:"https://images.pexels.com/photos/2432221/pexels-photo-2432221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
  {title: 'Produce', icon:"https://images.pexels.com/photos/1838607/pexels-photo-1838607.jpeg?cs=srgb&dl=pexels-elina-sazonova-1838607.jpg&fm=jpg&w=640&h=960"},
  {title: 'Meat', icon: "https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?cs=srgb&dl=pexels-mali-maeder-65175.jpg&fm=jpg&w=640&h=426"},
  {title: 'Dairy', icon: "https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?cs=srgb&dl=pexels-pixabay-248412.jpg&fm=jpg&w=640&h=895"},
  {title: 'Bakery', icon: "https://images.pexels.com/photos/965741/pexels-photo-965741.jpeg?cs=srgb&dl=pexels-markus-spiske-965741.jpg&fm=jpg&w=640&h=427"},
  {title: 'Frozen', icon: "https://images.pexels.com/photos/14062139/pexels-photo-14062139.jpeg?cs=srgb&dl=pexels-deane-bayas-14062139.jpg&fm=jpg&w=640&h=427"},
  {title: 'Drinks', icon: "https://images.pexels.com/photos/2789328/pexels-photo-2789328.jpeg?cs=srgb&dl=pexels-joe-l-2789328.jpg&fm=jpg&w=640&h=414"},
  {title: 'Snacks', icon: "https://images.pexels.com/photos/6697284/pexels-photo-6697284.jpeg?cs=srgb&dl=pexels-tim-samuel-6697284.jpg&fm=jpg&w=640&h=960"},
  {title: 'Canned', icon: "https://images.pexels.com/photos/9898352/pexels-photo-9898352.jpeg?cs=srgb&dl=pexels-ron-lach-9898352.jpg&fm=jpg&w=640&h=427"},
  {title: 'Personal', icon: "https://images.pexels.com/photos/4465121/pexels-photo-4465121.jpeg?cs=srgb&dl=pexels-karolina-grabowska-4465121.jpg&fm=jpg&w=640&h=960"},
  {title: 'Household', icon: "https://images.pexels.com/photos/4239031/pexels-photo-4239031.jpeg?cs=srgb&dl=pexels-karolina-grabowska-4239031.jpg&fm=jpg&w=640&h=427"},
]

export const topSelling = [
  {
    _id:"64493b923767bb788330a7d1",
    name: "Dorito Sweet Chilli Pepper 145g",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fug",
    image: "https://cdn.shopify.com/s/files/1/0624/1511/0370/products/images.jpeg-5_9d523c02-0155-43a1-8a29-9d7de796674f.jpg?v=1669098204",
    category: "Snacks",
    inventory: {
      stockAvailability: 35
    },
    price: 23.88
  },
  {
    _id: "64494099183be4c9729b749f",
    name: "Sasko Premium Brown Bread",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fug",
    image: "https://www.checkers.co.za/medias/10241933EA-checkers300Wx300H?context=bWFzdGVyfGltYWdlc3w3NTU3N3xpbWFnZS9wbmd8aW1hZ2VzL2g1OS9oOTAvMTAyNTgyNjU4MDA3MzQucG5nfDY0YTk3ODg5YWE5NzU3YWYxMGRlNjcxZWViNDVmYjRhMWIyMmZhNTk2M2M1MDZlYjg1ZGIzZmUzY2FmODk5MTM",
    category: "Bakery",
    inventory: {
      stockAvailability: 35
    },
    price: 18.99
  },
  {
    _id: "64494099183be4c9729b749c",
    name: "Tinkies Half & Half Chocolate Vanilla Flavoured Creamy",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fug",
    image: "https://1uponline.co.za/image/cache/images500/6001253500136-500x500.webp",
    category: "Bakery",
    inventory: {
      stockAvailability: 35
    },
    price: 8.99
  },
  {
    _id: "64494099183be4c9729b749d",
    name: "Monster Energy Drink 500ml",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fug",
    image: "https://www.caltexgateway.co.za/images/thumbs/0000232_monster-energy-drink-500ml_550.jpeg",
    category: "Drinks",
    inventory: {
      stockAvailability: 35
    },
    price: 1.99
  },
  {
    _id: "64494099183be4c9729b74a1",
    name: "Baby Potatoes with Garlic & Herb Butter 500g",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fug",
    image: "https://www.checkers.co.za/medias/10145402EA-20190726-Media-checkers515Wx515H?context=bWFzdGVyfGltYWdlc3wzNTA4MDF8aW1hZ2UvcG5nfGltYWdlcy9oMDcvaGU3Lzg4NTc1NjA5MDc4MDYucG5nfDg4Zjc1N2Q4YmY4NDEzODBkNGFiNWViNTkxYmViZmE3ZjM4YjU1N2UyYTVlMGQ3OTBmY2IxYmQ1MGQ4ZGMzYTA",
    category: "Produce",
    inventory: {
      stockAvailability: 35
    },
    price: 25.99
  }
]

export const cartItemsSample = topSelling.map((product) => {
  return {
    product: product,
    quantity: Math.round((Math.random() * 10)),
  };
});

export const sampleOrders = [
  {
    _id: "644ee8577b6d384715d63422",
    date: {
        date: {
            year: 2023,
            month: 4,
            day: 30
        },
        time: {
            hour: 22,
            minute: 9,
            second: 46,
            nano: 0
        }
    },
    paymentMethod: "CASH",
    deliveryStatus: "Ready",
    address: {
        street: "158 Grobler Street",
        suburb: "Arcadia",
        city: "Pretoria",
        province: "Gauteng",
        zipCode: "8987"
    },
    customer_id: "644ee31156239445331cd710",
    items: [
        {
            product: {
                _id: "64493b923767bb788330a7d1",
                name: "Lays Lightly Salted",
                description: "Simple and Lighht like Life",
                price: 19.99,
                category: "Snacks",
                imageUrl: "heretothere.com",
                inventory: {
                    stockAvailability: 35
                }
            },
            quantity: 2
        }
    ],
    total: 39.98
},
{
  _id: "674ee8577b6d384715d63422",
  date: {
      date: {
          year: 2023,
          month: 4,
          day: 30
      },
      time: {
          hour: 22,
          minute: 9,
          second: 46,
          nano: 0
      }
  },
  paymentMethod: "CASH",
  deliveryStatus: "Ready",
  address: {
      street: "158 Grobler Street",
      suburb: "Arcadia",
      city: "Pretoria",
      province: "Gauteng",
      zipCode: "8987"
  },
  customer_id: "644ee31156239445331cd710",
  items: [
      {
          product: {
              _id: "64493b923767bb788330a7d1",
              name: "Lays Lightly Salted",
              description: "Simple and Lighht like Life",
              price: 19.99,
              category: "Snacks",
              imageUrl: "heretothere.com",
              inventory: {
                  stockAvailability: 35
              }
          },
          quantity: 2
      }
  ],
  total: 39.98
},
{
  _id: "644ee8577b6d384715d63472",
  date: {
      date: {
          year: 2023,
          month: 4,
          day: 30
      },
      time: {
          hour: 22,
          minute: 9,
          second: 46,
          nano: 0
      }
  },
  paymentMethod: "CASH",
  deliveryStatus: "Delivered",
  address: {
      street: "158 Grobler Street",
      suburb: "Arcadia",
      city: "Pretoria",
      province: "Gauteng",
      zipCode: "8987"
  },
  customer_id: "644ee31156239445331cd710",
  items: [
      {
          product: {
              _id: "64493b923767bb788330a7d1",
              name: "Lays Lightly Salted",
              description: "Simple and Lighht like Life",
              price: 19.99,
              category: "Snacks",
              imageUrl: "heretothere.com",
              inventory: {
                  stockAvailability: 35
              }
          },
          quantity: 2
      }
  ],
  total: 79.98
},
{
  _id: "644ee8577b6d384715d63488",
  date: {
      date: {
          year: 2023,
          month: 4,
          day: 30
      },
      time: {
          hour: 22,
          minute: 9,
          second: 46,
          nano: 0
      }
  },
  paymentMethod: "CARD",
  deliveryStatus: "Shipping",
  address: {
      street: "158 Grobler Street",
      suburb: "Arcadia",
      city: "Pretoria",
      province: "Gauteng",
      zipCode: "8987"
  },
  customer_id: "644ee31156239445331cd710",
  items: [
      {
          product: {
              _id: "64493b923767bb788330a7d1",
              name: "Lays Lightly Salted",
              description: "Simple and Lighht like Life",
              price: 19.99,
              category: "Snacks",
              imageUrl: "heretothere.com",
              inventory: {
                  stockAvailability: 35
              }
          },
          quantity: 2
      }
  ],
  total: 54.98
},
{
  _id: "644ee8577b6d384715d63499",
  date: {
      date: {
          year: 2023,
          month: 4,
          day: 30
      },
      time: {
          hour: 22,
          minute: 9,
          second: 46,
          nano: 0
      }
  },
  paymentMethod: "CASH",
  deliveryStatus: "Preparing",
  address: {
      street: "158 Grobler Street",
      suburb: "Arcadia",
      city: "Pretoria",
      province: "Gauteng",
      zipCode: "8987"
  },
  customer_id: "644ee31156239445331cd710",
  items: [
      {
          product: {
              _id: "64493b923767bb788330a7d1",
              name: "Lays Lightly Salted",
              description: "Simple and Lighht like Life",
              price: 19.99,
              category: "Snacks",
              imageUrl: "heretothere.com",
              inventory: {
                  stockAvailability: 35
              }
          },
          quantity: 2
      }
  ],
  total: 59.98
},
{
  _id: "644ee8577b6d384715d63426",
  date: {
      date: {
          year: 2023,
          month: 4,
          day: 30
      },
      time: {
          hour: 22,
          minute: 9,
          second: 46,
          nano: 0
      }
  },
  paymentMethod: "CASH",
  deliveryStatus: "Preparing",
  address: {
      street: "158 Grobler Street",
      suburb: "Arcadia",
      city: "Pretoria",
      province: "Gauteng",
      zipCode: "8987"
  },
  customer_id: "644ee31156239445331cd710",
  items: [
      {
          product: {
              _id: "64493b923767bb788330a7d1",
              name: "Lays Lightly Salted",
              description: "Simple and Lighht like Life",
              price: 19.99,
              category: "Snacks",
              imageUrl: "heretothere.com",
              inventory: {
                  stockAvailability: 35
              }
          },
          quantity: 2
      }
  ],
  total: 29.98
}
]

export const defaultShoppingLists = [
    {
        title: "Monthly Grocery",
        items: [],
    }, 
    {
        title: "Birthday Party",
        items: [],
    },
    {
        title: "Sunday Brunch",
        items: [],
    }
];
