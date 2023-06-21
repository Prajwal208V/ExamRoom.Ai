import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import IrisTheme from '../../common/Iris/Styles/IrisTheme';
import {IrisText} from '../../common/Iris/Component/Text';
import SearchBar from './SearchBar';
import {useSelector, useDispatch} from 'react-redux';
import {setJob} from '../../store/slices/JobsSlice';
import axios from 'axios';
import JobList from './jobsList';

const JobPortalScreen = props => {
  const [searchType, setSearchType] = useState('name');
  const [loading, setLoading] = useState(false);
  const jobsData = useSelector(state => state.jobs);
  const auth = useSelector(state => state.auth);

  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  console.log('authauthauth', auth);

  const searchPatient = async searchText => {
    setLoading(true);
    const options = {
      method: 'GET',
      url: 'https://jsearch.p.rapidapi.com/search',
      params: {
        query: `${searchText}`,
        page: '10',
        num_pages: '20',
        date_posted: 'all',
        remote_jobs_only: 'false',
        employment_types: 'FULLTIME , INTERN , PARTTIME',
        job_requirements: 'under_3_years_experience',
        job_titles:
          'mobile developer, web developer , backend developer , frontend devloper',
      },
      headers: {
        'X-RapidAPI-Key': '89b46b599bmsh12f7d98d18ae97fp114137jsnf7d685c1ca85',
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
      },
    };
    try {
      const response = await axios.request(options);
      console.log('response.data', response?.data?.data?.length);
      dispatch(setJob(response?.data));
      setLoading(false);
    } catch (error) {
      console.error('error.data', error);
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.JobPortalScreenWrap}>
      {loading ? (
        <View
          style={{
            zIndex: 1,
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator
            animating={loading}
            size="large"
            color={IrisTheme.PRIMARY400}
          />
        </View>
      ) : null}
      <Text
        style={{
          marginTop: Platform?.OS === 'android' ? 20 : 8,
          marginHorizontal: 5,
          marginBottom: 10,
          alignSelf: 'center',
          fontSize: 20,
          color: IrisTheme?.PRIMARY500,
        }}>
        Start a job search
      </Text>
      <SearchBar
        setSearchType={setSearchType}
        searchText={searchText}
        setSearchText={setSearchText}
        onSubmitEditing={() => {
          Keyboard.dismiss();
          searchPatient(searchText);
        }}
        accessibilityLabel="globalJobSearch"
        testID="globalJobSearch"
      />
      <View
        style={{
          height: 2,
          backgroundColor: IrisTheme?.COOLGREY200,
          marginTop: 10,
        }}></View>
      {jobsData?.jobDataLength > 0 ? (
        <View
          style={{
            width: '100%',
            height: 20,
            alignContent: 'center',
            backgroundColor: IrisTheme?.BG200,
          }}>
          <Text
            style={
              styles.ResultText
            }>{`${jobsData?.jobDataLength} results`}</Text>
        </View>
      ) : null}
      {jobsData?.jobDataLength > 0 ? <JobList /> : <View></View>}
    </SafeAreaView>
  );
};
export default JobPortalScreen;

const styles = StyleSheet.create({
  JobPortalScreenWrap: {backgroundColor: IrisTheme.Text100, height: '100%'},
  titleCard: {
    // padding: 16,
    paddingLeft: 5,
    fontSize: 18,
    letterSpacing: 0.15,
    fontWeight: '600',
    paddingTop: 5,
    color: 'black',
  },
  ResultText: {
    paddingLeft: 5,
    fontSize: 14,
    letterSpacing: 0.15,
    fontWeight: '400',
    // paddingTop: 5,
    color: IrisTheme.Text400,
  },
});
