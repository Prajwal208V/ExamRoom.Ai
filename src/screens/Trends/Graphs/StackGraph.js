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
import React, { useState, useEffect, useCallback } from "react"
import IrisTheme from "../../../common/Iris/Styles/IrisTheme"
import { useSelector, useDispatch } from "react-redux"
import { fetchStack } from "../../../store/slices/Trends/StackSlice"
import Toast from "react-native-simple-toast"
import TrendsModal from "./helper"

const StackGraph = () => {
  const stackData = useSelector((state) => state.stacks)
  const dispatch = useDispatch()
  const [fecthError, setfecthError] = useState("")
  const [selectedFun, setSelectedFun] = useState("oneHour")
  const [minutesData, setMinutesData] = useState([])
  const [hoursData, setHoursData] = useState([])
  const [weeksData, setWeeksData] = useState([])
  const [monthsData, setMonthsData] = useState([])

  console.log("stackOneHourData", JSON.stringify(stackData?.stackMonthsData))

  useEffect(() => {
    if (
      selectedFun === "oneHour" &&
      stackData?.stackOneHourData?.length > 0 &&
      minutesData?.length === 0
    ) {
      let graphData = stackData?.stackOneHourData
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
      stackData?.stackHoursData?.length > 0 &&
      hoursData?.length === 0
    ) {
      let graphData = stackData?.stackHoursData
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
      stackData?.stackWeeksData?.length > 0 &&
      weeksData?.length === 0
    ) {
      let graphData = stackData?.stackWeeksData
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
      stackData?.stackMonthsData?.length > 0 &&
      monthsData?.length === 0
    ) {
      let graphData = stackData?.stackMonthsData
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
      console.log("graphData", graphData, graphData?.length)
      if (graphData.length > 0) {
        setMonthsData(graphData)
      }
    }
  }, [
    selectedFun,
    stackData?.stackOneHourData,
    stackData?.stackHoursData,
    stackData?.stackWeeksData,
    stackData?.stackMonthsData,
  ])

  useEffect(() => {
    setfecthError(stackData?.error)
    if (stackData?.error !== "") {
      Toast.show(stackData?.error, Platform.OS === "android" ? 0.5 : 1)
    }
  }, [stackData?.error])
  const fetchData = () => {}
  // const fetchData = useCallback(
  //   (selectedFun) => {
  //     if (selectedFun === "oneHour") {
  //       if (!(stackData?.stackOneHourData?.length > 0)) {
  //         dispatch(fetchStack({ type: "oneHour" }))
  //       }
  //     } else if (selectedFun === "hourly") {
  //       if (!(stackData?.stackHoursData?.length > 0)) {
  //         dispatch(fetchStack({ type: "hourly" }))
  //       }
  //     } else if (selectedFun === "weekly") {
  //       if (!(stackData?.stackWeeksData?.length > 0)) {
  //         dispatch(fetchStack({ type: "weekly" }))
  //       }
  //     } else if (selectedFun === "montly") {
  //       if (!(stackData?.stackMonthsData?.length > 0)) {
  //         dispatch(fetchStack({ type: "montly" }))
  //       }
  //     }
  //   },
  //   [selectedFun]
  // )
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../../assets/image/stock.png")}
          style={styles.logo}
        />
        <View style={styles.padLeft}>
          <Text style={styles.tiile}>Stocks</Text>
          <Text style={styles.subTitle}>(STK)</Text>
        </View>
      </View>
      <View style={styles.header2}>
        <Text style={styles.price}>$430.098</Text>
        <Text style={styles.pres}>{`+ 140.254`}</Text>
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
          onPress={() => {
            setSelectedFun("oneHour")
            fetchData()
          }}
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
          onPress={() => {
            setSelectedFun("hourly")
            fetchData()
          }}
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
          onPress={() => {
            setSelectedFun("weekly")
            fetchData()
          }}
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
          onPress={() => {
            setSelectedFun("montly")
            fetchData()
          }}
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
