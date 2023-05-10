import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Button } from '@rneui/base'
import PrimaryButton from './PrimaryButton'
import { setUser } from '../redux/UserSlice'
import { useSelector } from 'react-redux'

const CreateShoppingListForm = ({onCancel, onCreate}) => {

    const [newTitle, setNewTitle] = useState("");

    const user = useSelector((state) => state.authUser.user);

  return (
    <View className="px-4 py-8 space-y-1 bg-white">
            <Text className="text-lg ">Shopping List Title:</Text>
            <TextInput 
                autoFocus={true}
                value={newTitle}
                onChangeText={(value) => {setNewTitle(value)}}
                placeholder="e.g. Dinner Party"
                className="mb-4 border-primary border-b-2 py-4"

            />
            {/* BUTTONS */}
            <View className="flex-row flex-1 justify-between">
                <Button className="w-1/2 text-center" type="clear" title={"Cancel"} onPress={() => {onCancel()}}/>
                <View className="flex-row  w-1/2">
                <PrimaryButton title={"Create"} onPress={() => {onCreate(newTitle)}}/>
                </View>
            </View>
      </View>
  )
}

export default CreateShoppingListForm