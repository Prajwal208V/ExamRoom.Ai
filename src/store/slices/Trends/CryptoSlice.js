import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  dataLength: 0,
  functionName: 'oneHour',
  cryptoData: [],
  cryptoDaysData: [],
  cryptoWeeksData: [],
  cryptoMonthsData: [],
  cryptosLoading: false,
  error: '',
};

export const CryptoSlice = createSlice({
  name: 'Crypto',
  initialState,
  reducers: {
    setCrypto: (state, action) => {
      setCryptoData(action.payload, state);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCrypto.pending, (state, action) => {
        state.cryptosLoading = true;
        state.error = '';
      })
      .addCase(fetchCrypto.fulfilled, (state, action) => {
        state.cryptosLoading = false;
        setCryptoData(action.payload, state);
      })
      .addCase(fetchCrypto.rejected, (state, action) => {
        state.cryptosLoading = false;
        state.error = action.error.message;
      });
  },
});

const setCryptoData = (payload, state) => {
  if (payload?.functionName === 'Daily') {
    let objectsList =
      Object.keys(payload?.data?.data?.['Time Series (Digital Currency Daily)'])
        .length > 0
        ? payload?.data?.data?.['Time Series (Digital Currency Daily)']
        : {};
    let listArray = [];
    for (const [key, value] of Object.entries(objectsList)) {
      listArray.push({timeStam: key, data: value});
    }
    state.cryptoDaysData =
      listArray?.length > 0 ? listArray : state.cryptoDaysData;
  } else if (payload?.functionName === 'weekly') {
    let objectsList =
      Object.keys(
        payload?.data?.data?.['Time Series (Digital Currency Weekly)'],
      ).length > 0
        ? payload?.data?.data?.['Time Series (Digital Currency Weekly)']
        : {};
    let listArray = [];
    for (const [key, value] of Object.entries(objectsList)) {
      listArray.push({timeStam: key, data: value});
    }
    state.cryptoWeeksData =
      listArray?.length > 0 ? listArray : state.cryptoWeeksData;
  } else if (payload?.functionName === 'montly') {
    let objectsList =
      Object.keys(
        payload?.data?.data?.['Time Series (Digital Currency Monthly)'],
      ).length > 0
        ? payload?.data?.data?.['Time Series (Digital Currency Monthly)']
        : {};
    let listArray = [];
    for (const [key, value] of Object.entries(objectsList)) {
      listArray.push({timeStam: key, data: value});
    }
    state.cryptoMonthsData =
      listArray?.length > 0 ? listArray : state.cryptoMonthsData;
  }
};

export const fetchCrypto = createAsyncThunk(
  'Crypto/fetchCrypto',
  async ({type}) => {
    const options = {
      method: 'GET',
      url: 'https://alpha-vantage.p.rapidapi.com/query',
      params:
        type === 'Daily'
          ? {
              market: 'CNY',
              symbol: 'BTC',
              function: 'DIGITAL_CURRENCY_DAILY',
            }
          : type === 'weekly'
          ? {
              market: 'CNY',
              function: 'DIGITAL_CURRENCY_WEEKLY',
              symbol: 'BTC',
            }
          : type === 'montly'
          ? {
              function: 'DIGITAL_CURRENCY_MONTHLY',
              market: 'CNY',
              symbol: 'BTC',
            }
          : {
              market: 'CNY',
              symbol: 'BTC',
              function: 'DIGITAL_CURRENCY_DAILY',
            },
      headers: {
        'X-RapidAPI-Key': '89b46b599bmsh12f7d98d18ae97fp114137jsnf7d685c1ca85',
        'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com',
      },
    };
    const response = await axios.request(options);
    return {functionName: type, data: response};
  },
);

// Action creators are generated for each case reducer function
export const {setCrypto} = CryptoSlice.actions;

export default CryptoSlice.reducer;
