import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { Button } from '@rneui/base'
import PrimaryButton from './PrimaryButton'

const CreateShoppingListForm = ({onCancel}) => {

    const [newTitle, setNewTitle] = useState("");

  return (
    <View className="p-4 space-y-1">
            <Text>Shopping List Title</Text>
            <TextInput 
                value={newTitle}
                onChangeText={(value) => {setNewTitle(value)}}
                placeholder="Dinner Party"
            />
            {/* BUTTONS */}
            <View className="flex-row flex-1">
                <Button type="clear" title={"Cancel"} onPress={() => {onCancel()}}/>
                <PrimaryButton title={"Create"} onPress={handleOnCreate}/>
            </View>
      </View>
  )
}

export default CreateShoppingListForm