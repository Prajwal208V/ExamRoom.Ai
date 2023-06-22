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
import { fetchForex } from "../../../store/slices/Trends/ForexSlice"
import DeviceInfo from "react-native-device-info"
import { useSelector, useDispatch } from "react-redux"
import TrendsModal from "./helper"
import Toast from "react-native-simple-toast"

const ForexGraph = () => {
  const forexData = useSelector((state) => state.forex)
  const dispatch = useDispatch()
  const [fecthError, setfecthError] = useState("")
  const [minutesData, setMinutesData] = useState([])
  const [hoursData, setHoursData] = useState([])
  const [weeksData, setWeeksData] = useState([])
  const [monthsData, setMonthsData] = useState([])

  useEffect(() => {
    setfecthError(forexData?.error)
    if (forexData?.error !== "") {
      Toast.show(forexData?.error, Platform.OS === "android" ? 0.5 : 1)
    }
  }, [forexData?.error])

  const [selectedFun, setSelectedFun] = useState("oneHour")
  useEffect(() => {
    if (
      selectedFun === "oneHour" &&
      forexData?.forexOneHourData?.length > 0 &&
      minutesData?.length === 0
    ) {
      let graphData = forexData?.forexOneHourData
        ?.filter((item, ind) => ind <= 59)
        ?.map((item, ind) => {
          let xValue = parseFloat(item?.data?.["1. open"])
          if (!isNaN(xValue)) {
            console.log("indind", ind)
            let minuteObj = { x: item?.timeStam, y: xValue }
            return minuteObj
          }
        })
        .sort(
          (stk1, stk2) =>
            new Date(stk1.x).getTime() - new Date(stk2.x).getTime()
        )
      if (graphData.length > 0) {
        setMinutesData(graphData)
      }
    } else if (
      selectedFun === "hourly" &&
      forexData?.forexHoursData?.length > 0 &&
      hoursData?.length === 0
    ) {
      let graphData = forexData?.forexHoursData
        ?.filter((item, ind) => ind <= 100)
        ?.map((item, ind) => {
          let xValue = parseFloat(item?.data?.["1. open"])
          if (!isNaN(xValue)) {
            let minuteObj = { x: item?.timeStam, y: xValue }
            return minuteObj
          }
        })
        .sort(
          (stk1, stk2) =>
            new Date(stk1.x).getTime() - new Date(stk2.x).getTime()
        )
      if (graphData.length > 0) {
        setHoursData(graphData)
      }
    } else if (
      selectedFun === "weekly" &&
      forexData?.forexWeeksData?.length > 0 &&
      weeksData?.length === 0
    ) {
      let graphData = forexData?.forexWeeksData
        ?.filter((item, ind) => ind <= 100)
        ?.map((item, ind) => {
          let xValue = parseFloat(item?.data?.["1. open"])
          if (!isNaN(xValue)) {
            let minuteObj = { x: item?.timeStam, y: xValue }
            return minuteObj
          }
        })
        .sort(
          (stk1, stk2) =>
            new Date(stk1.x).getTime() - new Date(stk2.x).getTime()
        )
      if (graphData.length > 0) {
        setWeeksData(graphData)
      }
    } else if (
      selectedFun === "montly" &&
      forexData?.forexMonthsData?.length > 0 &&
      monthsData?.length === 0
    ) {
      let graphData = forexData?.forexMonthsData
        ?.filter((item, ind) => ind <= 100)
        ?.map((item, ind) => {
          let xValue = parseFloat(item?.data?.["1. open"])
          if (!isNaN(xValue)) {
            let minuteObj = { x: item?.timeStam, y: xValue }
            return minuteObj
          }
        })
        .sort(
          (stk1, stk2) =>
            new Date(stk1.x).getTime() - new Date(stk2.x).getTime()
        )
      if (graphData.length > 0) {
        setMonthsData(graphData)
      }
    }
  }, [
    selectedFun,
    forexData?.forexOneHourData,
    forexData?.forexHoursData,
    forexData?.forexWeeksData,
    forexData?.forexMonthsData,
  ])

  // const fetchData = useCallback(
  //   (type) => {
  //     setSelectedFun(type)
  //     if (type === "oneHour") {
  //       if (!(forexData?.forexOneHourData?.length > 0)) {
  //         dispatch(fetchForex({ type: "oneHour" }))
  //       }
  //     } else if (type === "hourly") {
  //       if (!(forexData?.forexHoursData?.length > 0)) {
  //         dispatch(fetchForex({ type: "hourly" }))
  //       }
  //     } else if (type === "weekly") {
  //       if (!(forexData?.forexWeeksData?.length > 0)) {
  //         dispatch(fetchForex({ type: "weekly" }))
  //       }
  //     } else if (type === "montly") {
  //       if (!(forexData?.forexMonthsData?.length > 0)) {
  //         dispatch(fetchForex({ type: "montly" }))
  //       }
  //     }
  //   },
  //   [type]
  // )
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../../assets/image/forex.png")}
          style={styles.logo}
        />
        <View style={styles.padLeft}>
          <Text style={styles.tiile}>Forex</Text>
          <Text style={styles.subTitle}>(FX)</Text>
        </View>
      </View>
      <View style={styles.header2}>
        <Text style={styles.price}>$12.67345</Text>
        <Text style={styles.pres}>{`+ 10.254`}</Text>
      </View>
      <TrendsModal
        data={
          selectedFun === "oneHour"
            ? minutesData
            : selectedFun === "hourly"
            ? hoursData
            : selectedFun === "weekly"
            ? weeksData
            : selectedFun === "montly"
            ? monthsData
            : []
        }
        selectedFun={selectedFun}
      />
      <View style={styles.selectionCon}>
        <TouchableOpacity
          style={[
            styles.pollbtn,
            selectedFun === "oneHour"
              ? {
                  borderColor: IrisTheme.PRIMARY300,
                  backgroundColor: IrisTheme.BG500,
                }
              : {},
          ]}
          onPress={() => setSelectedFun("oneHour")}
        >
          <Text
            style={[
              styles.selectionText,
              selectedFun === "oneHour" ? { color: IrisTheme.BG000 } : {},
            ]}
          >
            1Hr
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.pollbtn,
            selectedFun === "hourly"
              ? {
                  borderColor: IrisTheme.PRIMARY300,
                  backgroundColor: IrisTheme.BG500,
                }
              : {},
          ]}
          onPress={() => setSelectedFun("hourly")}
        >
          <Text
            style={[
              styles.selectionText,
              selectedFun === "hourly" ? { color: IrisTheme.BG000 } : {},
            ]}
          >
            24Hr
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
export default ForexGraph;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flex: 1,
  },
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
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
