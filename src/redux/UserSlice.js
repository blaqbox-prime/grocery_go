import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
     
        state.user = action.payload;
      
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;

// {
//   _id: "644ee31156239445331cd710",
//   firstName: "Jennifer",
//   lastName: "Dwane",
//   email: "johndoe@gmail.com",
//   phone: "0812584581",
//   image: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   address: {
//       street: "10 Vega Ave",
//       suburb: "Rivonia",
//       city: "Sandton",
//       province: "province",
//       zipCode: "8520"
//   }

// }