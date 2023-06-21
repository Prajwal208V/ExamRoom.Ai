import IrisTheme from '../common/Iris/Styles/IrisTheme';
import fonts from './font';
import DeviceInfo from 'react-native-device-info';

const xsSize = 10;
const smSize = 12;
const mdSize = 14;
const lgSize = 16;
const xlSize = 18;
const iconMdSize = 20;
const headerSize = 36;

const fontFamily = fonts.style.normal.fontFamily;

const cp_primary = IrisTheme.PRIMARY400;
const cp_brand = '#55bf9c';
const cp_disabled = '#bfbfbf';
const cp_background = '#ebf0f6';

const cp_theme_header = cp_primary;
const cp_theme_header_content = 'light-content'; //dark-content
const cp_theme_header_text = '#89a5c2';

const cp_content_text = 'grey';
const cp_secondary = '#f79646';
const cp_info = '#00afe6';
const cp_light = '#ccf3ff';
const cp_highlight = '#98ccd3';
const cp_content_background = 'white';
const cp_highlight_section = '#ebf0f6';
const cp_highlight_trach = '#ff0000';
const cp_vitals_immediate_priority = '#ea9999';
const cp_vitals_medium_priority = '#ffe599';

const cp_primary_dark = '#132238';

const cp_male = '#4d4dff';
const cp_female = '#ff5c77';

const cp_fair = '#00b300';
const cp_watcher = '#cca300';
const cp_comfort = '#b366ff';
const cp_unstable = '#ff6666';
const cp_notset = '#404040';

const cp_grey = '#f2f2f2';

const headerTintColor = 'white';
const cp_bgColor = 'whitesmoke';

module.exports = {
  color: {
    cp_brand,

    cp_theme_header,
    cp_theme_header_content,
    cp_theme_header_text,

    cp_primary,
    cp_background,
    cp_content_background,
    cp_content_text,
    cp_secondary,
    cp_info,
    cp_light,
    cp_highlight,
    cp_disabled,
    cp_highlight_section,
    cp_highlight_trach,

    cp_primary_dark,

    cp_male,
    cp_female,

    cp_fair,
    cp_watcher,
    cp_comfort,
    cp_unstable,
    cp_notset,

    cp_grey,

    headerTintColor,
    cp_bgColor,
    cp_vitals_immediate_priority,
    cp_vitals_medium_priority,
  },
  class: {
    // circle button
    circleBtn: {
      borderRadius: 64,
      height: 30,
      width: 30,
      marginRight: 0,
      justifyContent: 'center',
    },
    circleBtnIcon: {
      // textAlign: "center",
      fontWeight: 'bold',
      alignSelf: 'center',
    },
    // Active primary button
    activePrimaryButton: {
      marginVertical: 16,
      flex: 1,
      // backgroundColor: cp_primary,
      width: '100%',
      paddingVertical: 4,
      borderRadius: 2,
    },
    // InActive primary button
    inActivePrimaryButton: {
      marginVertical: 16,
      backgroundColor: 'lightgray',
      width: '100%',
      paddingVertical: 4,
      borderRadius: 2,
    },
    //optionButton
    optionButton: {
      flex: 1,
      marginHorizontal: 2,
      borderRadius: 2,
      padding: '1%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      paddingVertical: 8,
      borderColor: cp_content_text,
    },
    //optionButtonSelected
    optionButtonSelected: {
      backgroundColor: cp_theme_header,
      borderColor: cp_theme_header,
    },
    optionButtonText: {
      fontSize: mdSize,
      color: cp_content_text,
    },
    optionButtonTextSelected: {
      color: 'white',
    },
    //EmergencyButton
    emergencyButton: {
      padding: 8,
      width: '49%',
      margin: 2,
      elevation: 5,
      backgroundColor: 'white',
      borderRadius: 4,
      borderColor: cp_primary,
      borderWidth: 2,
      // shadowColor: '#000',
      // shadowOffset: { width: 0, height: 1 },
      // shadowOpacity: 0.5,
      // shadowRadius: 2
    },

    timeFormatText: {
      paddingHorizontal: 32,
      alignSelf: 'center',
      color: 'white',
    },
    //badges
    headerStyle: {
      height: 30,
      backgroundColor: cp_theme_header,
      color: 'white',
    },
    cp_badge: {
      paddingHorizontal: 3,
      paddingVertical: 1,
      borderRadius: 2,
      fontSize: smSize,
      fontWeight: '700',
      textAlign: 'center',
      ...fonts.style.bold,
      overflow: 'hidden',
      marginRight: 1,
      marginVertical: 2,
    },
    cp_bg_primary: {
      backgroundColor: cp_primary,
      color: 'white',
    },
    cp_brand: {
      backgroundColor: cp_brand,
      color: 'white',
    },
    cp_bg_red: {
      backgroundColor: 'red',
      color: 'white',
    },
    cp_bg_yellow: {
      backgroundColor: cp_watcher,
      color: 'white',
    },
    cp_bg_green: {
      backgroundColor: 'green',
      color: 'white',
    },
    cp_bg_purple: {
      backgroundColor: cp_comfort,
      color: 'white',
    },
    cp_bg_light: {
      backgroundColor: cp_light,
      color: cp_primary,
    },
    no_data: {
      color: cp_disabled,
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    pickerStyle: {
      width: '100%',
      borderColor: 'lightgray',
      borderBottomWidth: 1,
      borderRadius: 10,
      height: 40,
    },
    paperTextInput: {
      backgroundColor: 'transparent',
      paddingVertical: 6,
      minHeight: 40,
    },
    paperTextInputDisabled: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      borderBottomWidth: 1,
      borderBottomColor: 'lightgray',
      paddingVertical: 6,
    },
    paperTextInputTheme: {
      colors: {
        primary: cp_primary,
      },
    },
    textInputDisabled: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      borderBottomColor: 'lightgray',
      paddingVertical: 6,
    },
    dateTime: {
      alignItems: 'flex-start',
    },
    justifyContentSpaceBetween: {
      justifyContent: 'space-between',
    },
    subscript: {
      fontSize: 8,
      lineHeight: 15,
    },
    superscript: {
      // fontSize: 8,
      // lineHeight: 30
    },
    // get shadow effect
    cp_shadow: {
      shadowColor: '#cccccc',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      borderRadius: 4,
      elevation: 5,
    },
    // tile design
    scrollBackground: {
      padding: 2,
    },
    scrollBackgroundInput: {
      padding: 5,
    },
    inputView: {
      padding: 2,
      borderRadius: 4,
    },
    warningMessageView: {
      alignItems: 'center',
    },
    warningMessageTextRed: {
      color: 'red',
      textAlign: 'center',
    },
    warningMessageTextGrey: {
      color: 'grey',
      textAlign: 'center',
    },
    hospitalInfo: {
      flexDirection: 'row',
      backgroundColor: cp_light,
      alignItems: 'center',
    },
    patientCount: {
      width: '100%',
      justifyContent: 'center',
    },
    patientCountText: {
      color: cp_primary_dark,
      fontSize: lgSize,
      paddingLeft: 10,
      fontWeight: 'bold',
    },
    tilesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      marginLeft: '0.5%',
      marginRight: '0.5%',
    },
    content: {
      width: DeviceInfo.isTablet() ? '32.8%' : '49.4%',
      backgroundColor: cp_content_background,
      borderRadius: 4,
      margin: '0.25%',
    },
    contentView: {
      minHeight: 100,
      justifyContent: 'space-between',
      alignItems: 'center',
      overflow: 'hidden',
      padding: 2,
    },
    indicators: {
      flexDirection: 'row',
      width: '100%',
    },
    indicatorViewTop: {
      flexDirection: 'row',
      width: '50%',
      justifyContent: 'flex-start',
    },
    indicatorViewBottomn: {
      flexDirection: 'row',
      width: '50%',
      justifyContent: 'flex-end',
    },
    pendCount: {
      fontSize: mdSize,
      color: cp_watcher,
      fontFamily,
    },
    chatIndicator: {
      fontSize: mdSize,
      color: cp_primary,
      fontFamily,
    },
    count: {
      color: cp_primary_dark,
      fontSize: lgSize,
      fontFamily,
    },
    name: {
      fontWeight: 'bold',
      fontSize: smSize,
      color: cp_content_text,
      fontFamily,
    },

    //patient and sbar style
    patientSbarCard: {
      width: DeviceInfo.isTablet() ? '49.5%' : '99.5%',
      borderRadius: 4,
      marginLeft: '0.25%',
      marginRight: '0.25%',
      marginBottom: 8,
      backgroundColor: 'white',
      justifyContent: 'center',
      borderBottomColor: '#d3d3d3',
      borderBottomWidth: 1,
    },
    flexDirectionRow: {
      flexDirection: 'row',
    },
    patientSbarContent: {
      width: '100%',
    },
    patientSbarContentView: {
      minHeight: 75,
      borderRadius: 4,
      padding: 5,
    },
    patientSbarTitleHeaderValue: {
      fontWeight: 'bold',
      fontSize: xlSize,
      fontFamily,
    },
    patientSbarSmallTitle: {
      fontSize: xsSize,
      color: cp_content_text,
      fontFamily,
    },
    patientSbarValue: {
      fontWeight: 'normal',
      color: cp_content_text,
      fontSize: smSize,
      fontFamily,
    },
    patientSbarLabel: {
      fontWeight: 'bold',
      color: cp_content_text,
      fontSize: smSize,
      fontFamily,
    },
    patientSbarMargin: {
      marginRight: 5,
    },

    fontBold: {
      marginLeft: 1,
      fontWeight: 'bold',
      ...fonts.style.bold,
    },
    highlightedText: {
      fontWeight: 'bold',
      fontSize: headerSize,
    },
    fabRightTop: {
      position: 'absolute',
      right: 10,
      top: 5,
      backgroundColor: cp_primary,
    },
    camera: {
      flexDirection: 'row',
      justifyContent: 'center',
      padding: 2,
    },
    cameraTouch: {
      backgroundColor: cp_primary,
      borderRadius: 7,
      padding: 5,
    },
    cameraView: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    cameraIcon: {
      color: 'white',
      marginRight: 5,
      alignSelf: 'center',
    },
    cameraText: {
      color: 'white',
    },
    flexRow: {
      flex: 1,
      flexDirection: 'row',
    },
    collapsible: {
      list: {
        padding: 2,
      },
      iconView: {
        position: 'absolute',
        right: 0,
      },
      touchableList: {
        padding: 5,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        backgroundColor: cp_light,
      },
      touchableListActive: {
        padding: 5,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: cp_info,
      },
      textHeader: {
        fontSize: mdSize,
        color: 'black',
      },
      textHeaderActive: {
        fontSize: mdSize,
        color: 'white',
        fontWeight: 'bold',
      },
      headerTime: {
        fontSize: xsSize,
        color: 'grey',
        fontWeight: 'normal',
        position: 'absolute',
      },
      headerTimeActive: {
        color: 'white',
      },
      collapseIcon: {
        textAlign: 'right',
        color: cp_primary,
        marginTop: 10,
      },
      collapseIconActive: {
        textAlign: 'right',
        color: 'white',
        transform: [{rotateX: '180deg'}],
        marginTop: 10,
      },
      displayItem: {
        backgroundColor: cp_content_background,
        paddingLeft: 5,
        paddingRight: 5,
        borderWidth: 1,
        borderColor: cp_info,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
      },
    },
  },
  font: {
    xsSize,
    smSize,
    mdSize,
    lgSize,
    xlSize,
    iconMdSize,
    headerSize,
    fontFamily,
  },
  flexOne: {
    flex: 1,
    justifyContent: 'center',
  },
  customBootstrap: {
    newMessage: {
      newMsgHolder: {
        marginBottom: 10,
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#e6e1e1',
      },
      newMsg: {
        fontSize: 12,
      },
    },
    overlayLoader: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      backgroundColor: 'rgba(204, 204, 204, 0.5)',
      zIndex: +20,
    },
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  upperCalenderContainer: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    marginBottom: 5,
    borderBottomColor: '#d3d3d3',
    borderBottomWidth: 1,
  },
  dateContainer: {
    flex: 1,
    margin: 5,
  },
  dateTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  calenderBox: {
    marginTop: 5,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#CDD7EB',
    borderWidth: 1,
  },
};
