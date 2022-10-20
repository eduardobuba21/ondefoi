// components
import { View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Appbar } from 'react-native-paper';
// sections
import { CreateForm } from './CreateForm';

// ----------------------------------------------------------------------

export function Create() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <Appbar.Header mode="center-aligned" elevated>
          <Appbar.Content title="Adicionar" />
        </Appbar.Header>

        <CreateForm />
      </View>
    </TouchableWithoutFeedback>
  );
}
