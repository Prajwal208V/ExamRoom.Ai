import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import IrisTheme from '../../../common/Iris/Styles/IrisTheme';
import {useSelector, useDispatch} from 'react-redux';
import {fetchStack} from '../../../store/slices/Trends/StackSlice';
import {
  VictoryChart,
  VictoryLine,
  VictoryTooltip,
  VictoryAxis,
  VictoryScatter,
  Background,
  createContainer,
  Line,
  VictoryCursorContainer,
} from 'victory-native';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-simple-toast';
import TrendsModal from './helper';

const StackGraph = () => {
  const stackData = useSelector(state => state.stacks);
  const dispatch = useDispatch();
  console.log('stackDatastackData', JSON.stringify(stackData?.stackHoursData));
  const [selectedFun, setSelectedFun] = useState('oneHour');
  const [fecthError, setfecthError] = useState('');

  useEffect(() => {
    setfecthError(stackData?.error);
    if (stackData?.error !== '') {
      Toast.show(stackData?.error, Platform.OS === 'android' ? 0.5 : 1);
    }
  }, [stackData?.error]);

  const fetchData = type => {
    if (type === 'oneHour') {
      if (!(stackData?.stackHoursData?.length > 0)) {
        dispatch(fetchStack({type: 'oneHour'}));
      }
    } else if (type === 'hourly') {
      if (!(stackData?.forexHoursData?.length > 0)) {
        dispatch(fetchStack({type: 'hourly'}));
      }
    } else if (type === 'weekly') {
      if (!(stackData?.stackWeeksData?.length > 0)) {
        dispatch(fetchStack({type: 'weekly'}));
      }
    } else if (type === 'montly') {
      if (!(stackData?.stackMonthsData?.length > 0)) {
        dispatch(fetchStack({type: 'montly'}));
      }
    }
    setSelectedFun(type);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../../assets/image/stock.png')}
          style={styles.logo}
        />
        <View style={styles.padLeft}>
          <Text style={styles.tiile}>Stocks</Text>
          <Text style={styles.subTitle}>(STK)</Text>
        </View>
      </View>
      <View style={styles.header2}>
        <Text style={styles.price}>$430.098</Text>
        <Text style={styles.pres}>{`+ 140.254 (23.77%)`}</Text>
      </View>
      <TrendsModal />
      <View style={styles.selectionCon}>
        <TouchableOpacity
          style={[
            styles.pollbtn,
            selectedFun === 'oneHour'
              ? {
                  borderColor: IrisTheme.PRIMARY300,
                  backgroundColor: IrisTheme.BG500,
                }
              : {},
          ]}
          onPress={() => fetchData('oneHour')}>
          <Text
            style={[
              styles.selectionText,
              selectedFun === 'oneHour' ? {color: IrisTheme.BG000} : {},
            ]}>
            1Hr
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.pollbtn,
            selectedFun === 'hourly'
              ? {
                  borderColor: IrisTheme.PRIMARY300,
                  backgroundColor: IrisTheme.BG500,
                }
              : {},
          ]}
          onPress={() => fetchData('hourly')}>
          <Text
            style={[
              styles.selectionText,
              selectedFun === 'hourly' ? {color: IrisTheme.BG000} : {},
            ]}>
            24Hr
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.pollbtn,
            selectedFun === 'weekly'
              ? {
                  borderColor: IrisTheme.PRIMARY300,
                  backgroundColor: IrisTheme.BG500,
                }
              : {},
          ]}
          onPress={() => fetchData('weekly')}>
          <Text
            style={[
              styles.selectionText,
              selectedFun === 'weekly' ? {color: IrisTheme.BG000} : {},
            ]}>
            Weekly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.pollbtn,
            selectedFun === 'montly'
              ? {
                  borderColor: IrisTheme.PRIMARY300,
                  backgroundColor: IrisTheme.BG500,
                }
              : {},
          ]}
          onPress={() => fetchData('montly')}>
          <Text
            style={[
              styles.selectionText,
              selectedFun === 'montly' ? {color: IrisTheme.BG000} : {},
            ]}>
            Monthly
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default StackGraph;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flex: 1,
  },
  header: {paddingVertical: 20, flexDirection: 'row', alignItems: 'center'},
  logo: {
    resizeMode: 'contain',
    marginVertical: 0,
    width: 30,
    height: 40,
    // marginLeft: 10,
  },
  tiile: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
  },
  padLeft: {
    paddingLeft: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subTitle: {
    fontSize: 10,
    color: IrisTheme.BG600,
    paddingTop: 3,
    paddingLeft: 6,
  },
  header2: {
    // marginLeft: 45,
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    color: 'black',
    fontSize: 15,
    fontWeight: '600',
  },
  pres: {
    color: IrisTheme.GREEN400,
    fontSize: 12,
    fontWeight: '300',
    paddingLeft: 14,
  },
  selectionCon: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  pollbtn: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderWidth: 2,
    borderColor: IrisTheme.BG200,
    backgroundColor: IrisTheme.BG100,
    borderRadius: 20,
    alignItems: 'center',
  },
  selectionText: {
    color: IrisTheme.BG600,
    fontSize: 13,
  },
});
