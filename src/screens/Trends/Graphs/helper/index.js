import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef} from 'react';
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
import IrisTheme from '../../../../common/Iris/Styles/IrisTheme';

const data = [
  {x: '12:30', y: 1},
  {x: '01:30', y: 98},
  {x: '02:30', y: 97},
  {x: '04:00', y: 67},
  {x: '12:07', y: 56},
  {x: '02:45', y: 89},
  {x: '07:30', y: 54},
  {x: '13:01', y: 98},
  {x: '14:12', y: 111},
  {x: '15:08', y: 12},
  {x: '07:58', y: 60},
  {x: '03:45', y: 125},
  {x: '18:34', y: 44},
  {x: '22:23', y: 56},
  {x: '23:22', y: 78},
  {x: '08:45', y: 23},
  {x: '09:38', y: 80},
  {x: '12:45', y: 76},
  {x: '18:09', y: 45},
  {x: '17:23', y: 23},
  {x: '20:52', y: 13},
  {x: '23:37', y: 33},
  {x: '21:47', y: 89},
  {x: '11:27', y: 79},
  {x: '15:17', y: 99},
  {x: '19:22', y: 69},
  {x: '04:37', y: 59},
  {x: '03:23', y: 109},
  {x: '17:26', y: 23},
  {x: '20:32', y: 13},
  {x: '23:17', y: 33},
  {x: '21:27', y: 89},
  {x: '11:32', y: 79},
  {x: '15:45', y: 99},
  {x: '19:45', y: 69},
  {x: '04:34', y: 59},
  {x: '03:25', y: 109},
  {x: '17:23', y: 23},
  {x: '20:51', y: 13},
  {x: '23:31', y: 33},
  {x: '21:56', y: 89},
  {x: '11:25', y: 79},
  {x: '15:24', y: 99},
  {x: '19:42', y: 69},
  {x: '04:29', y: 59},
  {x: '03:12', y: 109},
];

const VictoryZoomVoronoiContainer = createContainer('cursor', 'voronoi'); // 01

const findClosestPointSorted = (data, value) => {
  // 02
  let index = Math.round(value) >= 0 ? Math.round(value) : 0;
  console.log('indx of cordinate', value, index);

  if (value) {
    return [data[index - 1], index];
  } else {
    return null;
  }
};

const graphSize = overView => {
  return overView
    ? Platform.OS === 'android'
      ? Dimensions.get('screen').width + data?.length * 10
      : Dimensions.get('screen').width + data?.length * 13
    : Platform.OS === 'android'
    ? Dimensions.get('screen').width + 10
    : Dimensions.get('screen').width;
};

const TrendsModal = props => {
  const [overView, setOverView] = useState(true);
  const [activePoint, setActivePoint] = useState(data[data.length - 1]); // 03
  const [postionIndex, setPostionIndex] = useState(data.length - 1);
  const coursorLineRef = useRef(null);

  function handleCursorChange(value) {
    let currentCoursor = findClosestPointSorted(data, value);
    setActivePoint(currentCoursor ? currentCoursor[0] : activePoint); //04
    setPostionIndex(currentCoursor?.[1] ? currentCoursor?.[1] : postionIndex);
  }

  const point = activePoint ? (
    <VictoryScatter
      name="scatter"
      data={[activePoint]}
      size={Platform.OS === 'ios' ? 2.2 : 1.8}
      style={{
        data: {size: 200, fill: '#7946de', stroke: '#c9bdfb', strokeWidth: 10},
      }}
    />
  ) : null;

  return (
    <View>
      {/*  for single graph */}
      <View style={{marginTop: 15}}></View>

      <View
        // key={postionIndex}
        style={{
          paddingRight: 10,
          paddingLeft: 6,
          // height: 32,
          // flexDirection: 'row',
          borderRadius: 4,
          // alignItems: 'center',
          // right: -(postionIndex * data.length),
          // Dimensions.get('screen').width - postionIndex * Math.PI,
          paddingVertical: 5,
          right: 10,
          position: 'absolute',
          marginTop: 5,
          marginRight: 5,
          top: -30,
          backgroundColor: 'white',
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOpacity: 0.5,
              shadowRadius: 5,
              shadowOffset: {
                height: 5,
                width: 5,
              },
            },
            android: {
              shadowColor: '#000',
              shadowOpacity: 0.26,
              shadowOffset: {width: 0, height: 2},
              shadowRadius: 10,
              elevation: 3,
            },
          }),
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: 6,
              height: 6,
              backgroundColor: '#7946de',
              borderRadius: 50,
              marginRight: 8,
            }}
          />
          <Text style={{color: '#2B2A3A', fontSize: 12}}>{activePoint?.y}</Text>
          <View
            style={{
              width: 1.2,
              height: 16,
              backgroundColor: '#CDD7EB',
              marginHorizontal: 5,
            }}
          />
          <Text style={{color: '#2B2A3A', fontSize: 12}}>{activePoint?.x}</Text>
        </View>
      </View>

      <ScrollView
        horizontal
        scrollEnabled={overView}
        style={{
          marginTop: 1,
          // flex: 1,
          // backgroundColor: 'yellow',
        }}
        key={overView}>
        <VictoryChart
          domainPadding={{x: 25}}
          padding={{top: 50, bottom: 50, right: 0, left: 0}}
          maxDomain={{y: Math.max(...data.map(({y}) => y))}}
          minDomain={{y: Math.min(...data.map(({y}) => y))}}
          animate={{
            duration: overView ? 400 : 500,
          }}
          height={Dimensions.get('screen').height - 450}
          width={graphSize(overView)}
          containerComponent={
            //05
            <VictoryZoomVoronoiContainer
              responsive={true}
              voronoiDimension="x"
              cursorDimension="x"
              voronoiBlacklist={['scatter']}
              // cursorLabel={point => point.x}
              cursorComponent={
                <Line
                  style={{
                    stroke: '#596782',
                    strokeWidth: DeviceInfo.isTablet() ? 1 : 0.6,
                    strokeDasharray: 3.5,
                  }}
                />
              }
              onCursorChange={(value, props) => {
                console.log('onCursorChange', props);
                handleCursorChange(value);
              }}
            />
          }
          style={{
            background: {fill: '#F4F7FE'},
          }}
          domainPadding={1}
          backgroundComponent={
            <Background y={Dimensions.get('screen').height - 450} height={24} />
          }>
          <VictoryAxis
            crossAxis={false}
            tickCount={10}
            domain={{y: [0, 125]}}
            dependentAxis={true}
            // tickFormat={y => y}
            style={{
              axis: {
                stroke: '#F6F7F9', //CHANGE COLOR OF Y-AXIS
                strokeDasharray: '0',
              },
              tickLabels: {
                fill: 'white', //CHANGE COLOR OF Y-AXIS LABELS
                fillDasharray: '0',
                // fontSize: 11,
                // padding: 5,
                // angle: 45,
              },
              //   grid: {
              //     stroke: '#F6F7F9',
              //     strokeDasharray: '0',
              //   },
              axisLabel: {fontSize: 16, fill: '#E0F2F1'},
            }}
          />

          {overView ? (
            <VictoryAxis
              tickFormat={y => y}
              style={{
                axis: {stroke: '#E0F2F1'},
                axisLabel: {fontSize: 11},
                ticks: {stroke: '#ccc'},
                tickLabels: {
                  fill: '#2B2A3A', //CHANGE COLOR OF Y-AXIS LABELS
                  fillDasharray: '0',
                  fontSize: 8,
                  padding: 18,
                  angle: -90,
                },
                // grid: {
                //   stroke: '#F6F7F9',
                //   strokeDasharray: '0',
                // },
              }}
            />
          ) : null}
          <VictoryLine
            data={data}
            style={{
              data: {
                stroke: '#7946de',
                strokeWidth: Platform.OS === 'ios' ? 1.4 : 0.9,
              },
            }}
            events={[
              {
                target: 'data',
                eventHandlers: {
                  onPressIn: () => console.log('Pressed!'),
                },
              },
            ]}
          />
          {/* <VictoryScatter
            name="scatter"
            data={data}
            size={Platform.OS === 'ios' ? 2.2 : 1.8}
            style={{
              data: {
                fill: '#34A2B1',
                stroke: '#34A2B1',
                strokeWidth: 0.2,
              },
            }}
          /> */}
          {point}
        </VictoryChart>
      </ScrollView>
    </View>
  );
};

export default TrendsModal;
