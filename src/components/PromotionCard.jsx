import { View, Text, useWindowDimensions, Image } from 'react-native'
import React from 'react'

const FeaturedCard = ({title, cta, text,image}) => {
 
    const {width, height} = useWindowDimensions();

    return (
    <View className="h-36 bg-white shadow-black shadow-md rounded-xl mr-2 relative"
        style={{width:width-34}}
    >

        <View className="absolute -z-10 w-full h-full sepia">
        <Image
        source={{uri:image}}
        className="w-full h-full rounded-xl"
        />
        </View>

        <View className=" absolute left-6 top-6 ">
            <Text className="text-xs text-white">{title}</Text>
            <Text className="font-bold uppercase w-40 text-lg text-white">{text}</Text>            
        </View>


    </View>
  )
}

export default FeaturedCard