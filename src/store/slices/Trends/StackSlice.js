import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  dataLength: 0,
  functionName: 'oneHour',
  stackData: [],
  stackOneHourData: [],
  stackHoursData: [],
  stackWeeksData: [],
  stackMonthsData: [],
  stacksLoading: false,
  error: '',
};

export const StackSlice = createSlice({
  name: 'Stack',
  initialState,
  reducers: {
    setStack: (state, action) => {
      setStackData(action.payload, state);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchStack.pending, (state, action) => {
        state.stacksLoading = true;
        state.error = '';
      })
      .addCase(fetchStack.fulfilled, (state, action) => {
        state.stacksLoading = false;
        setStackData(action.payload, state);
      })
      .addCase(fetchStack.rejected, (state, action) => {
        state.stacksLoading = false;
        state.error = action.error.message;
      });
  },
});

const setStackData = (payload, state) => {
  if (payload?.functionName === 'oneHour') {
    let objectsList =
      Object.keys(payload?.data?.data?.['Time Series (1min)']).length > 0
        ? payload?.data?.data?.['Time Series (1min)']
        : {};
    let listArray = [];
    for (const [key, value] of Object.entries(objectsList)) {
      listArray.push({timeStam: key, data: value});
    }
    state.stackOneHourData =
      listArray?.length > 0 ? listArray : state.stackOneHourData;
  } else if (payload?.functionName === 'hourly') {
    let objectsList =
      Object.keys(payload?.data?.data?.['Time Series (60min)']).length > 0
        ? payload?.data?.data?.['Time Series (60min)']
        : {};
    let listArray = [];
    for (const [key, value] of Object.entries(objectsList)) {
      listArray.push({timeStam: key, data: value});
    }
    state.stackHoursData =
      listArray?.length > 0 ? listArray : state.stackHoursData;
  } else if (payload?.functionName === 'weekly') {
    let objectsList =
      Object.keys(payload?.data?.data?.['Weekly Time Series']).length > 0
        ? payload?.data?.data?.['Weekly Time Series']
        : {};
    let listArray = [];
    for (const [key, value] of Object.entries(objectsList)) {
      listArray.push({timeStam: key, data: value});
    }
    state.stackWeeksData =
      listArray?.length > 0 ? listArray : state.stackWeeksData;
  } else if (payload?.functionName === 'montly') {
    let objectsList =
      Object.keys(payload?.data?.data?.['Monthly Time Series']).length > 0
        ? payload?.data?.data?.['Monthly Time Series']
        : {};
    let listArray = [];
    for (const [key, value] of Object.entries(objectsList)) {
      listArray.push({timeStam: key, data: value});
    }
    state.stackMonthsData =
      listArray?.length > 0 ? listArray : state.stackMonthsData;
  }
};

export const fetchStack = createAsyncThunk(
  'Stack/fetchStack',
  async ({type}) => {
    const options = {
      method: 'GET',
      url: 'https://alpha-vantage.p.rapidapi.com/query',
      params:
        type === 'oneHour'
          ? {
              interval: '1min',
              function: 'TIME_SERIES_INTRADAY',
              symbol: 'MSFT',
              datatype: 'json',
              output_size: 'compact',
            }
          : type === 'hourly'
          ? {
              interval: '60min',
              function: 'TIME_SERIES_INTRADAY',
              symbol: 'MSFT',
              datatype: 'json',
              output_size: 'compact',
            }
          : type === 'weekly'
          ? {
              function: 'TIME_SERIES_WEEKLY',
              symbol: 'MSFT',
              datatype: 'json',
            }
          : type === 'montly'
          ? {
              symbol: 'MSFT',
              function: 'TIME_SERIES_MONTHLY',
              datatype: 'json',
            }
          : {
              interval: '1min',
              function: 'TIME_SERIES_INTRADAY',
              symbol: 'MSFT',
              datatype: 'json',
              output_size: 'compact',
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
export const {setStack} = StackSlice.actions;

export default StackSlice.reducer;
