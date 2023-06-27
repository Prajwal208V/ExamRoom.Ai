import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native"
import React, { useState, useCallback, useEffect } from "react"
import IrisTheme from "../../../common/Iris/Styles/IrisTheme"
import { useSelector, useDispatch } from "react-redux"
import { fetchCrypto } from "../../../store/slices/Trends/CryptoSlice"
import Toast from "react-native-simple-toast"
import TrendsModal from "./helper"

const CryptoGraph = () => {
  const dispatch = useDispatch()
  const cryptoData = useSelector((state) => state.crypto)
  const [selectedFun, setSelectedFun] = useState("Daily")
  const [fecthError, setfecthError] = useState("")
  const [daysData, setDaysData] = useState([])
  const [weeksData, setWeeksData] = useState([])
  const [monthsData, setMonthsData] = useState([])

  useEffect(() => {
    setfecthError(cryptoData?.error)
    if (cryptoData?.error !== "") {
      Toast.show(cryptoData?.error, Platform.OS === "android" ? 0.5 : 1)
    }
  }, [cryptoData?.error])

  // const fetchData = useCallback(
  //   (type) => {
  //     setSelectedFun(type)
  //     if (type === "Daily") {
  //       if (!(cryptoData?.cryptoDaysData?.length > 0)) {
  //         dispatch(fetchCrypto({ type: "Daily" }))
  //       }
  //     } else if (type === "weekly") {
  //       if (!(cryptoData?.cryptoWeeksData?.length > 0)) {
  //         dispatch(fetchCrypto({ type: "weekly" }))
  //       }
  //     } else if (type === "monthly") {
  //       if (!(cryptoData?.cryptoMonthsData?.length > 0)) {
  //         dispatch(fetchCrypto({ type: "monthly" }))
  //       }
  //     }
  //   },
  //   [type]
  // )
  console.log("cryptoDaysData", JSON.stringify(cryptoData))

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../../assets/image/cryptoCion.png")}
          style={styles.logo}
        />
        <View style={styles.padLeft}>
          <Text style={styles.tiile}>Cryptocurrency</Text>
          <Text style={styles.subTitle}>(BTC)</Text>
        </View>
      </View>
      <View style={styles.header2}>
        <Text style={styles.price}>$230.456</Text>
        <Text style={styles.pres}>{`+ 14,54 (19.89%)`}</Text>
      </View>
      <TrendsModal />
      <View style={styles.selectionCon}>
        <TouchableOpacity
          style={[
            styles.pollbtn,
            selectedFun === "Daily"
              ? {
                  borderColor: IrisTheme.PRIMARY300,
                  backgroundColor: IrisTheme.BG500,
                }
              : {},
          ]}
          onPress={() => setSelectedFun("Daily")}
        >
          <Text
            style={[
              styles.selectionText,
              selectedFun === "Daily" ? { color: IrisTheme.BG000 } : {},
            ]}
          >
            Daily
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.pollbtn,
            selectedFun === "weekly"
              ? {
                  borderColor: IrisTheme.PRIMARY300,
                  backgroundColor: IrisTheme.BG500,
                }
              : {},
          ]}
          onPress={() => setSelectedFun("weekly")}
        >
          <Text
            style={[
              styles.selectionText,
              selectedFun === "weekly" ? { color: IrisTheme.BG000 } : {},
            ]}
          >
            Weekly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.pollbtn,
            selectedFun === "montly"
              ? {
                  borderColor: IrisTheme.PRIMARY300,
                  backgroundColor: IrisTheme.BG500,
                }
              : {},
          ]}
          onPress={() => setSelectedFun("montly")}
        >
          <Text
            style={[
              styles.selectionText,
              selectedFun === "montly" ? { color: IrisTheme.BG000 } : {},
            ]}
          >
            Monthly
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default CryptoGraph;

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
