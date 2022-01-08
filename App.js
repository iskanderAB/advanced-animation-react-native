import { transform } from '@babel/core';
import React, { useEffect, useRef } from 'react';
import { 
  StatusBar,
  Animated, 
  Text, 
  Image, 
  View, 
  StyleSheet, 
  Dimensions, 
  FlatList 
} from 'react-native';
const {width , height} = Dimensions.get("screen");

// https://www.flaticon.com/packs/retro-wave
// inspiration: https://dribbble.com/shots/11164698-Onboarding-screens-animation
// https://twitter.com/mironcatalin/status/1321180191935373312

const bgs = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#B98EFF'];
const DATA = [
  {
    "key": "3571572",
    "title": "Multi-lateral intermediate moratorium",
    "description": "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
    "image": "https://image.flaticon.com/icons/png/256/3571/3571572.png"
  },
  {
    "key": "3571747",
    "title": "Automated radical data-warehouse",
    "description": "Use the optical SAS system, then you can navigate the auxiliary alarm!",
    "image": "https://image.flaticon.com/icons/png/256/3571/3571747.png"
  },
  {
    "key": "3571680",
    "title": "Inverse attitude-oriented system engine",
    "description": "The ADP array is down, compress the online sensor so we can input the HTTP panel!",
    "image": "https://image.flaticon.com/icons/png/256/3571/3571680.png"
  },
  {
    "key": "3571603",
    "title": "Monitored global data-warehouse",
    "description": "We need to program the open-source IB interface!",
    "image": "https://image.flaticon.com/icons/png/256/3571/3571603.png"
  }
]



export default function App() {
  const scrollx = useRef(new Animated.Value(0)).current; 


  const bgc = scrollx.interpolate({
    inputRange : bgs.map((_, i)=> i * width),
    outputRange: bgs.map((bg)=> bg )
  })
  const Indicator = ()=> { 
    return <View style={{ position: 'absolute' , bottom : 50, flexDirection: 'row' }}>
      {
        DATA.map((_,i)=>{
          const wid = scrollx.interpolate({
            inputRange : [(i-1)* width, i * width, (i+1) * width],
            outputRange: [10, 20, 10],
            extrapolate : 'clamp'
          })
          const opacity = scrollx.interpolate({
            inputRange : [(i-1)* width, i * width, (i+1) * width],
            outputRange: [.5,1,.5],
            extrapolate : 'clamp'
          })
          // console.log("scale => " , scale); 
          return <Animated.View
            key={`indcator-${i}`}
            style={{
              width: wid,
              height: 10,
              borderRadius: 5,
              margin : 5,
              backgroundColor: "#fff",
              opacity
              // transform: [{scale}]
            }}
          />
        })
      }
    </View>
  }

  const Square = ({scrollX})=> { 
    const squareAnimation = Animated.divide(Animated.modulo(scrollX,width),width);
    const rotate = squareAnimation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange : ['35deg', '0deg', '35deg']
    })
    const translateX = squareAnimation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange : [0, -height, 0]
    })
    return <Animated.View
      style={{
        width : height,
        height : height,
        backgroundColor :'#fff',
        borderRadius: 80,
        position: 'absolute',
        top : -height * 0.65,
        left: -height * 0.35,
        transform: [{
          rotate
        },
        {
          translateX
        }
      ]
      }}
    />
  }

  // const BackDrop = ({scrollX})=> { 
  //   const backgroundColor = scrollX.interpolate({
  //     inputRange : bgs.map((_, i)=> i * width),
  //     outputRange: bgs.map((bg)=> bg )
  //   })
  //   return <Animated.View
  //     style={[
  //       StyleSheet.absoluteFillObject,
  //       { backgroundColor }
  //     ]}
  //   />
  // }
  return (
    <Animated.View style={{...styles.container, backgroundColor: bgc}}>
     <Square scrollX={scrollx} />
     <Animated.FlatList
      data={DATA}
      keyExtractor={item => item.key}
      horizontal
      showsHorizontalScrollIndicator={false} 
      showsVerticalScrollIndicator={false}
      pagingEnabled
      scrollEventThrottle={32}
      onScroll={Animated.event(
        [{nativeEvent: {contentOffset: {x : scrollx}}}],
        {
          listener: (event) => console.log("scrolle event ",scrollx),
          useNativeDriver: false
      },
        
      )}
      contentContainerStyle={{paddingBottom : 100}}
      renderItem={({item}) => {
        return( 
        <View style={{
          width ,
          alignItems: 'center',
          padding: 20
          }}>
            <View 
              style={{
                flex : 0.7 ,
                justifyContent: 'center'
              }}
            >
              <Image 
                source={{uri : item.image}}
                style={{
                  width : width / 2,
                  height : width / 2,
                }}
                resizeMode='contain'
                //blurRadius={10} trodha floooo 
              />
            </View> 
            <View style={{ flex :0.3 }}>
              <Text style={{fontWeight: '800',fontSize: 24, marginBottom: 10, color: 'white'}} >{item.title} </Text>
              <Text style={{fontWeight: '300',color: 'white'}} > {item.description} </Text>
            </View>   
        </View>
        )
      }}
     />
     <Indicator scrollX={scrollx}/>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});