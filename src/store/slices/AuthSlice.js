import {createSlice} from '@reduxjs/toolkit';
import {EventRegister} from 'react-native-event-listeners';
const initialState = {
  auth: [{email: '', password: ''}],
  error: '',
  lastEmail: '',
};

const AuthSlice = createSlice({
  name: 'AUTH',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.error = '';
      setAuthData(action?.payload, state);
    },
    setLatUser: (state, action) => {
      setLatUserEmailData(action?.payload, state);
    },
  },
});

const setLatUserEmailData = (payload, state) => {
  state.lastEmail = payload.email || state.lastEmail;
};
const setAuthData = (payload, state) => {
  let authData = state?.auth;
  let isAlredy = authData.find(
    (iteam, index) => payload.email === iteam?.email,
  );
  if (!isAlredy) {
    let arr = [...authData];
    arr.push({email: payload?.email, password: payload?.password});
    state.auth = [...arr];
    EventRegister.emit('SignUpResponseGood');
  } else {
    state.error = 'user already exists';
    EventRegister.emit('SignUpResponseError');
  }
};

export const {setAuth, setLatUser} = AuthSlice.actions;
export default AuthSlice.reducer;
