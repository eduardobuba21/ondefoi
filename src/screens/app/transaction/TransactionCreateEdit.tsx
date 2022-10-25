// components
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
// sections
import { CreateEditForm } from './sections/create-edit/CreateEditForm';

// ----------------------------------------------------------------------

type Props = {
  isEdit?: boolean;
};

// ----------------------------------------------------------------------

export function TransactionCreateEdit({ isEdit = false }: Props) {
  return (
    <>
      <Text variant="titleLarge" style={{ textAlign: 'center', paddingVertical: 20 }}>
        {isEdit ? 'Editar Transação' : 'Adicionar Transação'}
      </Text>

      <ScrollView>
        <CreateEditForm />
      </ScrollView>
    </>
  );
}
