import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  dataLength: 0,
  functionName: 'oneHour',
  forexData: [],
  forexOneHourData: [],
  forexHoursData: [],
  forexWeeksData: [],
  forexMonthsData: [],
  forexLoading: false,
  error: '',
};

export const ForexSlice = createSlice({
  name: 'Forex',
  initialState,
  reducers: {
    setForex: (state, action) => {
      setForexData(action.payload, state);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchForex.pending, (state, action) => {
        state.forexLoading = true;
        state.error = '';
      })
      .addCase(fetchForex.fulfilled, (state, action) => {
        state.forexLoading = false;
        setForexData(action.payload, state);
      })
      .addCase(fetchForex.rejected, (state, action) => {
        state.forexLoading = false;
        state.error = action.error.message;
      });
  },
});

const setForexData = (payload, state) => {
  if (payload?.functionName === 'oneHour') {
    let objectsList =
      Object.keys(payload?.data?.data?.['Time Series FX (1min)']).length > 0
        ? payload?.data?.data?.['Time Series FX (1min)']
        : {};
    let listArray = [];
    for (const [key, value] of Object.entries(objectsList)) {
      listArray.push({timeStam: key, data: value});
    }
    state.forexOneHourData =
      listArray?.length > 0 ? listArray : state.forexOneHourData;
  } else if (payload?.functionName === 'hourly') {
    let objectsList =
      Object.keys(payload?.data?.data?.['Time Series FX (60min)']).length > 0
        ? payload?.data?.data?.['Time Series FX (60min)']
        : {};
    let listArray = [];
    for (const [key, value] of Object.entries(objectsList)) {
      listArray.push({timeStam: key, data: value});
    }
    state.forexHoursData =
      listArray?.length > 0 ? listArray : state.forexHoursData;
  } else if (payload?.functionName === 'weekly') {
    let objectsList =
      Object.keys(payload?.data?.data?.['Time Series FX (Weekly)']).length > 0
        ? payload?.data?.data?.['Time Series FX (Weekly)']
        : {};
    let listArray = [];
    for (const [key, value] of Object.entries(objectsList)) {
      listArray.push({timeStam: key, data: value});
    }
    state.forexWeeksData =
      listArray?.length > 0 ? listArray : state.forexWeeksData;
  } else if (payload?.functionName === 'montly') {
    let objectsList =
      Object.keys(payload?.data?.data?.['Time Series FX (Monthly)']).length > 0
        ? payload?.data?.data?.['Time Series FX (Monthly)']
        : {};
    let listArray = [];
    for (const [key, value] of Object.entries(objectsList)) {
      listArray.push({timeStam: key, data: value});
    }
    state.forexMonthsData =
      listArray?.length > 0 ? listArray : state.forexMonthsData;
  }
};

export const fetchForex = createAsyncThunk(
  'Forex/fetchForex',
  async ({type}) => {
    const options = {
      method: 'GET',
      url: 'https://alpha-vantage.p.rapidapi.com/query',
      params:
        type === 'oneHour'
          ? {
              function: 'FX_INTRADAY',
              interval: '1min',
              to_symbol: 'USD',
              from_symbol: 'EUR',
              datatype: 'json',
              outputsize: 'compact',
            }
          : type === 'hourly'
          ? {
              function: 'FX_INTRADAY',
              interval: '60min',
              to_symbol: 'USD',
              from_symbol: 'EUR',
              datatype: 'json',
              outputsize: 'compact',
            }
          : type === 'weekly'
          ? {
              function: 'FX_WEEKLY',
              from_symbol: 'EUR',
              to_symbol: 'USD',
              datatype: 'json',
            }
          : type === 'montly'
          ? {
              from_symbol: 'EUR',
              to_symbol: 'USD',
              function: 'FX_MONTHLY',
              datatype: 'json',
            }
          : {
              function: 'FX_INTRADAY',
              interval: '1min',
              to_symbol: 'USD',
              from_symbol: 'EUR',
              datatype: 'json',
              outputsize: 'compact',
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
export const {setForex} = ForexSlice.actions;

export default ForexSlice.reducer;
