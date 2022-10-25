import React, { useState } from 'react';
// components
import { ScrollView, Pressable } from 'react-native';
import { Button, Portal, Dialog, TextInput, RadioButton } from 'react-native-paper';

// ----------------------------------------------------------------------

type Props = {
  category: string;
  setCategory: (category: string) => void;
};

const categories = [
  {
    id: 'other',
    label: 'Outras',
  },
  {
    id: 'food',
    label: 'Alimentação',
  },
  {
    id: 'apartment',
    label: 'Aluguel',
  },
];

// ----------------------------------------------------------------------

export function CategoryDialog({ category, setCategory }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const selected = categories.find((_category) => _category.id === category)?.label || 'Categoria';

  return (
    <>
      <Pressable onPress={openDialog}>
        <TextInput
          mode="outlined"
          label="Categoria"
          value={selected}
          editable={false}
          right={<TextInput.Icon icon="chevron-down" onPress={openDialog} />}
        />
      </Pressable>

      <Portal>
        <Dialog visible={isOpen} onDismiss={closeDialog}>
          <Dialog.Title>Categoria</Dialog.Title>

          <Dialog.ScrollArea style={{ maxHeight: 220, paddingHorizontal: 0 }}>
            <ScrollView>
              <RadioButton.Group onValueChange={(value) => setCategory(value)} value={category}>
                {categories.map((_category) => (
                  <RadioButton.Item
                    key={_category.id}
                    label={_category.label}
                    value={_category.id}
                  />
                ))}
              </RadioButton.Group>
            </ScrollView>
          </Dialog.ScrollArea>

          <Dialog.Actions>
            <Button onPress={closeDialog}>Continuar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}
