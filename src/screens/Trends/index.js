import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import IrisTheme from '../../common/Iris/Styles/IrisTheme';
import IrisModal from '../../common/Iris/Component/Modal/index';
import MarketGraph from './Graphs';

const {height} = Dimensions.get('window');
const TrendsScreen = props => {
  const stackData = useSelector(state => state.stacks);
  const forexData = useSelector(state => state.forex);
  const cryptoData = useSelector(state => state.crypto);
  const [isModalOpen, setIsModalClose] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState('');

  console.log(
    ' stackData',
    JSON.stringify(stackData?.stackOneHourData?.[0]?.data?.['1. open']),
  );
  console.log(
    ' forexData',
    JSON.stringify(forexData?.forexOneHourData?.[0]?.data?.['1. open']),
  );
  console.log(
    'cryptoData',
    JSON.stringify(cryptoData?.cryptoDaysData?.[0]?.data?.['1b. open (USD)']),
  );

  const onClose = () => {
    setIsModalClose(false);
    setSelectedMarket('');
  };
  return (
    <SafeAreaView style={styles.JobPortalScreenWrap}>
      <View style={styles.coinsHeader}>
        <Text style={styles.headerText}> Your Coins</Text>
      </View>
      <View style={styles.valueBox}>
        <View style={styles.insideBox}>
          <Text style={{color: 'white', fontSize: 12}}>Total Value</Text>
          <Text
            style={{
              color: 'white',
              fontSize: 23,
              fontWeight: '600',
              letterSpacing: 1,
            }}>
            $<Text>524.00</Text>
          </Text>
        </View>
        <View style={{marginTop: 30, marginBottom: 20}}>
          <Text
            style={{
              color: IrisTheme.BG500,
              fontWeight: '500',
              letterSpacing: 1,
            }}>
            List of Coins
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.mainBox}
            onPress={() => {
              setIsModalClose(true);
              setSelectedMarket('Forex');
            }}>
            <View>
              <Image
                source={require('../../assets/image/forex.png')}
                style={styles.logo}
              />
            </View>
            <View style={styles.padLeft}>
              <Text style={styles.tiile}>Forex</Text>
              <Text style={styles.subTitle}>FX</Text>
            </View>
            <View style={styles.padRight}>
              <Text style={styles.tiile}>
                {' '}
                {`$ ${
                  forexData?.forexOneHourData?.[0]?.data?.['1. open']
                    ? parseFloat(
                        forexData?.forexOneHourData?.[0]?.data?.['1. open'],
                      )
                    : 12.67345
                }`}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mainBox}
            onPress={() => {
              setIsModalClose(true);
              setSelectedMarket('Stocks');
            }}>
            <View>
              <Image
                source={require('../../assets/image/stock.png')}
                style={styles.logo}
              />
            </View>
            <View style={styles.padLeft}>
              <Text style={styles.tiile}>Stocks</Text>
              <Text style={styles.subTitle}>STK</Text>
            </View>
            <View style={styles.padRight}>
              <Text style={styles.tiile}>
                {`$ ${
                  stackData?.stackOneHourData?.[0]?.data?.['1. open']
                    ? parseFloat(
                        stackData?.stackOneHourData?.[0]?.data?.['1. open'],
                      )
                    : 430.098
                }`}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mainBox}
            onPress={() => {
              setIsModalClose(true);
              setSelectedMarket('Cryptocurrency');
            }}>
            <View>
              <Image
                source={require('../../assets/image/cryptoCion.png')}
                style={styles.logo}
              />
            </View>
            <View style={styles.padLeft}>
              <Text style={styles.tiile}>Cryptocurrency</Text>
              <Text style={styles.subTitle}>BTC</Text>
            </View>
            <View style={styles.padRight}>
              <Text style={styles.tiile}>{`$ ${
                cryptoData?.cryptoDaysData?.[0]?.data?.['1b. open (USD)']
                  ? parseFloat(
                      cryptoData?.cryptoDaysData?.[0]?.data?.['1b. open (USD)'],
                    )
                  : 230.456
              }`}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {isModalOpen ? (
        <IrisModal
          title={selectedMarket}
          isVisible={isModalOpen}
          onClose={onClose}
          paddingTop={height * 0.02}
          headColor="white"
          closeButton={false}>
          <MarketGraph type={selectedMarket} />
        </IrisModal>
      ) : null}
    </SafeAreaView>
  );
};

export default TrendsScreen;

const styles = StyleSheet.create({
  JobPortalScreenWrap: {
    backgroundColor: IrisTheme.BG200,
    height: '100%',
    flex: 1,
  },
  coinsHeader: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  headerText: {
    color: IrisTheme.BG600,
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 1,
  },
  valueBox: {
    width: '100%',
    alignItems: 'center',
  },
  insideBox: {
    paddingVertical: 40,
    paddingHorizontal: 120,
    backgroundColor: IrisTheme.PRIMARY400,
    alignItems: 'center',
  },
  mainBox: {
    backgroundColor: IrisTheme.BG000,
    width: 335,
    height: 80,
    borderRadius: 5,
    marginBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 8,
  },
  logo: {
    resizeMode: 'contain',
    marginVertical: 0,
    width: 40,
    height: 50,
    marginLeft: 10,
  },
  tiile: {
    color: 'black',
    fontSize: 14,
    fontWeight: '400',
  },
  padLeft: {
    // paddingLeft: 12,
    position: 'absolute',
    left: 65,
  },
  subTitle: {
    fontSize: 10,
    color: IrisTheme.BG600,
    paddingTop: 3,
  },
  padRight: {},
});
