// components
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
// types
import { ITransaction } from '@src/@types/transaction';
// sections
import { CreateEditForm } from './sections/create-edit/CreateEditForm';

// ----------------------------------------------------------------------

type Props = {
  onSuccess?: VoidFunction;
  //
  isEdit?: boolean;
  editData?: ITransaction;
};

// ----------------------------------------------------------------------

export function TransactionCreateEdit({ onSuccess, isEdit = false, editData }: Props) {
  return (
    <>
      <Text variant="titleLarge" style={{ textAlign: 'center', paddingVertical: 20 }}>
        {isEdit ? 'Editar Transação' : 'Adicionar Transação'}
      </Text>

      <ScrollView>
        <CreateEditForm
          onSuccess={onSuccess ? onSuccess : () => {}}
          isEdit={isEdit}
          editData={editData}
        />
      </ScrollView>
    </>
  );
}
