import React, { useState } from 'react';
// components
import { View } from 'react-native';
import { TextInput, SegmentedButtons, FAB } from 'react-native-paper';

// ----------------------------------------------------------------------

export function CreateForm() {
  const [isLoading, setIsLoading] = useState(false);

  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState('entry');

  function handleSubmit() {
    if (isLoading) return;
    setIsLoading(true);
  }

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: 'space-between' }}>
      <View>
        <TextInput
          mode="outlined"
          label="Descrição"
          value={description}
          onChangeText={setDescription}
          style={{ marginBottom: 12 }}
        />
        <TextInput
          mode="outlined"
          label="Valor"
          value={value}
          onChangeText={setValue}
          style={{ marginBottom: 20 }}
        />

        <SegmentedButtons
          value={type}
          onValueChange={setType}
          buttons={[
            {
              value: 'entry',
              label: 'Entrada',
              icon: 'plus-circle-outline',
              style: { width: '50%' },
            },
            {
              value: 'exit',
              label: 'Saída',
              icon: 'minus-circle-outline',
              style: { width: '50%' },
            },
          ]}
        />
      </View>

      <FAB icon="" label="Adicionar" onPress={handleSubmit} />
    </View>
  );
}
