import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import jobData from '../../helper/jobData.json';

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
let xNum = random(0, jobData?.length > 0 ? jobData?.length - 1 : 50);
let yNum = random(0, jobData?.length > 0 ? jobData?.length - 1 : 50);
let min = xNum > yNum ? yNum : xNum;
let max = xNum < yNum ? yNum : xNum;
const initialState = {
  jobData: jobData?.slice(min, max),
  jobDataLength: max - min,
};

const JobsSlice = createSlice({
  name: 'assessmentData',
  initialState,
  reducers: {
    setJob: (state, action) => {
      setJobsData(action?.payload, state);
    },
    refreshJob: (state, action) => {
      refreshJobData(action?.payload, state);
    },
  },
});

const setJobsData = (payload, state) => {
  state.jobData = payload?.data?.length > 0 ? payload?.data : state.jobData;
  state.jobDataLength = payload?.data?.length > 0 ? payload?.data?.length : 0;
};

const refreshJobData = (payload, state) => {
  xNum = random(0, jobData?.length > 0 ? jobData?.length - 1 : 50);
  yNum = random(0, jobData?.length > 0 ? jobData?.length - 1 : 50);
  min = xNum > yNum ? yNum : xNum;
  max = xNum < yNum ? yNum : xNum;
  state.jobData = jobData?.slice(min, max);
  state.jobDataLength = max - min;
};

export const {setJob, refreshJob} = JobsSlice.actions;
export default JobsSlice.reducer;
