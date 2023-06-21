import {
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from "react-native"
import moment from "moment"
import React, { useState } from "react"
import IrisTheme from "../../common/Iris/Styles/IrisTheme"
import { useSelector, useDispatch } from "react-redux"
import { FlatList, RefreshControl } from "react-native-gesture-handler"
import { refreshJob } from "../../store/slices/JobsSlice"
import { isValidUrl } from "../../common/Iris/Component/supportFunctions/miscFunctions"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import IrisModal from "../../common/Iris/Component/Modal/index"
const { height } = Dimensions.get("window")
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle"
const JobList = (props) => {
  const dispatch = useDispatch()
  const jobsData = useSelector((state) => state.jobs)
  const [isModalOpen, setisModalOpen] = useState(false)
  const [particularJob, setParticularJob] = useState(null)

  console.log("jobDatajobData", jobsData?.jobData)
  const onRefreshFun = () => {
    dispatch(refreshJob())
  }
  const onClose = () => {
    setisModalOpen(false)
  }
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.clickable}
        onPress={() => {
          setParticularJob(item)
          setisModalOpen(true)
        }}
      >
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              src={item?.employer_logo}
              style={styles.employer_logo}
              source={
                isValidUrl(item?.employer_logo)
                  ? { uri: item?.employer_logo }
                  : require("../../assets/image/jobImagePlaceHolder.png")
              }
              defaultSource={require("../../assets/image/jobImagePlaceHolder.png")}
            />
            <View
              style={{
                flex: 1,
              }}
            >
              <Text style={styles.head} numberOfLines={2}>
                {item?.job_title}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 8,
                fontWeight: "300",
                color: IrisTheme?.PRIMARY600,
                paddingLeft: 6,
              }}
            >{`(${item?.job_employment_type})`}</Text>
          </View>
          <View style={{ marginLeft: 45, marginBottom: 10 }}>
            <Text style={{ fontSize: 10, fontWeight: "500", color: "black" }}>
              {item?.employer_name}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "400",
                }}
              >{`${item?.job_city ? item?.job_city : ""}, ${
                item?.job_state ? item?.job_state : ""
              }, ${item?.job_country ? item?.job_country : ""}`}</Text>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "400",
                  position: "relative",
                  right: -120,
                }}
              >
                {item?.job_required_experience?.required_experience_in_months
                  ? `Experience: ${parseFloat(
                      parseFloat(
                        item?.job_required_experience
                          ?.required_experience_in_months
                      ) / 12
                    )} Years`
                  : null}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 1,
              width: "110%",
              flex: 1,
              position: "relative",
              left: 0,
              backgroundColor: IrisTheme?.COOLGREY200,
              marginTop: 1,
              marginLeft: 35,
              // marginVertical: 5,
            }}
          />
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={jobsData?.jobData}
        keyExtractor={(item, index) => `jOB${index}`}
        renderItem={renderItem}
        style={styles.flatlistWrap}
        contentContainerStyle={styles.flatlist}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefreshFun} />
        }
      />
      {isModalOpen ? (
        <IrisModal
          //   title={particularJob?.job_title}
          isVisible={isModalOpen}
          onClose={onClose}
          paddingTop={height * 0.09}
          headColor="white"
          closeButton={false}
        >
          <View style={styles.Modalcontainer}>
            <ScrollView style={{ paddingHorizontal: 10, width: "100%" }}>
              <View style={{ paddingLeft: 0 }}>
                <Text style={styles.Modalhead} numberOfLines={2}>
                  {particularJob?.job_title}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 10,
                }}
              >
                <Image
                  src={particularJob?.employer_logo}
                  style={styles.employer_logo}
                  source={
                    isValidUrl(particularJob?.employer_logo)
                      ? { uri: particularJob?.employer_logo }
                      : require("../../assets/image/jobImagePlaceHolder.png")
                  }
                  defaultSource={require("../../assets/image/jobImagePlaceHolder.png")}
                />
                <View style={{ flexDirection: "column", paddingLeft: 8 }}>
                  <Text
                    style={{ fontSize: 11, fontWeight: "500", color: "black" }}
                  >
                    {particularJob?.employer_name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "400",
                    }}
                  >{`${item?.job_city ? item?.job_city : ""}, ${
                    item?.job_state ? item?.job_state : ""
                  }, ${item?.job_country ? item?.job_country : ""}`}</Text>
                </View>
              </View>
              <View style={{ marginLeft: 0, marginTop: 10 }}>
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 12,
                    paddingVertical: 4,
                  }}
                >
                  Job posted :
                  <Text style={{ fontWeight: "500", fontSize: 11 }}>
                    {` ${moment(
                      new Date(particularJob?.job_posted_at_datetime_utc)
                    ).format("DD-MM-YYYY")}`}
                  </Text>
                </Text>
                {particularJob?.job_required_experience
                  ?.required_experience_in_months ? (
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "400",
                      position: "relative",
                      //   right: -120,
                      fontWeight: "600",
                      fontSize: 12,
                      paddingVertical: 4,
                    }}
                  >
                    {particularJob?.job_required_experience
                      ?.required_experience_in_months
                      ? `Experience: ${parseFloat(
                          parseFloat(
                            particularJob?.job_required_experience
                              ?.required_experience_in_months
                          ) / 12
                        )} Years`
                      : null}
                  </Text>
                ) : null}
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 12,
                    paddingVertical: 4,
                  }}
                >
                  Job type :
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "400",
                      color: IrisTheme?.PRIMARY600,
                      // paddingLeft: 5,
                    }}
                  >{` ${particularJob?.job_employment_type}`}</Text>
                </Text>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingLeft: 10,
                    // width: '100%',
                    // marginHorizontal: 17,
                    paddingVertical: 4,
                    width: "100%",
                    height: 30,
                    backgroundColor: IrisTheme?.BLUE500,
                    borderRadius: 15,
                    marginVertical: 10,
                    alignSelf: "center",
                  }}
                  onPress={() => {
                    Linking.openURL(particularJob?.job_apply_link)
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    color={"white"}
                    size={Platform.OS === "ios" ? 21 : 20}
                  />
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "700",
                      marginLeft: 5,
                      letterSpacing: 0.5,
                      fontSize: Platform.OS === "ios" ? 15 : 14,
                    }}
                  >
                    Apply
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: 4,
                  width: "110%",
                  //   flex: 1,
                  position: "relative",
                  left: 0,
                  backgroundColor: IrisTheme?.COOLGREY200,
                  marginTop: 1,
                  marginLeft: 0,
                  marginVertical: 10,
                }}
              />
              <Text
                style={{ fontSize: 15, fontWeight: "500", marginBottom: 5 }}
              >
                Job Description
              </Text>
              <View style={{ flex: 1, width: "100%", paddingBottom: 40 }}>
                <Text style={{ fontSize: 12, textAlign: "auto" }}>
                  {particularJob?.job_description}
                </Text>
              </View>
            </ScrollView>
          </View>
        </IrisModal>
      ) : null}
    </View>
  )
}

export default JobList;

const styles = StyleSheet.create({
  flatlistWrap: {flex: 1, backgroundColor: IrisTheme.BG100},
  flatlist: {padding: 5},
  container: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingHorizontal: 5,
    paddingVertical: 6,
  },
  employer_logo: {width: 40, height: 40, resizeMode: 'contain'},
  head: {
    color: IrisTheme.Text600,
    fontSize: 13,
    // marginBottom: 10,
    fontWeight: '600',
    paddingLeft: 6,
    textAlign: 'left',
    width: '99%',
  },
  Modalhead: {
    color: IrisTheme.Text600,
    fontSize: 18,
    // marginBottom: 10,
    fontWeight: '600',
    // paddingLeft: 6,
    textAlign: 'left',
    width: '99%',
  },
  Modalcontainer: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingVertical: 6,
    // height: 30,
  },
});
