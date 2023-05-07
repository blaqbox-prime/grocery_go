import { View, Text } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress'

const ProgressIndicator = ({color="#009B37", size="60"}) => {
  return (
    <Progress.Circle size={size} indeterminate={true} color={color} />
  )
}

export default ProgressIndicator