import React, { useState } from 'react';
// hooks
import { useTheme } from '@src/hooks/useTheme';
// types
import { ITransaction, TTransactionCreate, TTransactionUpdate } from '@src/@types/transaction';
// form
import { useForm } from 'react-hook-form';
import { TransactionSchemas } from '@src/utils/form-schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  RHFProvider,
  RHFTextInput,
  RHFDatePicker,
  RHFCurrencyInput,
  RHFSegmentedButtons,
} from '@src/components/hook-form';
// components
import { View } from 'react-native';
import { Gap, Alert, Button, Container } from '@src/components/default';
// utils
import { dbMethods } from '@src/utils/firebase/database';
import { ScrollView } from 'react-native-gesture-handler';
// sections
// import { CategoryDialog } from './CategoryDialog';

// ----------------------------------------------------------------------

type Props = {
  onSuccess: VoidFunction;
  //
  isEdit?: boolean;
  editData?: ITransaction;
};

//

type CreateFormProps = TTransactionCreate & {
  afterSubmit?: string;
};

type UpdateFormProps = ITransaction & {
  afterSubmit?: string;
};

// ----------------------------------------------------------------------

export function CreateEditForm({ onSuccess, isEdit, editData }: Props) {
  const theme = useTheme();

  // ----------------------------------------------------------------------

  const defaultValues = {
    description: '',
    value: undefined,
    type: 'exit' as TTransactionCreate['type'],
    occurred_at: new Date(),
    // category: null,
    //
    afterSubmit: undefined,
  };

  const methods = useForm<CreateFormProps | UpdateFormProps>({
    resolver: yupResolver(isEdit ? TransactionSchemas.Update : TransactionSchemas.Create),
    defaultValues: isEdit ? editData : defaultValues,
  });

  const {
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: CreateFormProps | UpdateFormProps) => {
    try {
      if (!isEdit) {
        const _data = data as CreateFormProps;
        const createData: TTransactionCreate = {
          description: _data.description,
          value: _data.value,
          type: _data.type,
          occurred_at: _data.occurred_at,
          // category: null,
        };

        await dbMethods().transaction.create(createData);
        reset();
      }

      if (isEdit) {
        const _data = data as UpdateFormProps;
        const updateData: TTransactionUpdate = {
          description: _data.description,
          value: _data.value,
          occurred_at: _data.occurred_at,
          // category: null,
        };

        await dbMethods().transaction.update(_data.id, updateData);
      }

      onSuccess();
    } catch (error: any) {
      console.log('[ebuba] error: ', error);
      setError('afterSubmit', {
        ...error,
        message: error.message ?? 'Ocorreu um erro inesperado :/',
      });
    }
  };

  // ----------------------------------------------------------------------

  const [isDeleting, setIsDeleting] = useState(false);

  const onDelete = async () => {
    if (!isEdit || !editData) return;
    await setIsDeleting(true);
    try {
      await dbMethods().transaction.delete(editData.id);
      onSuccess();
    } catch (error: any) {
      console.log('[ebuba] error: ', error);
      setError('afterSubmit', {
        ...error,
        message: error.message ?? 'Ocorreu um erro inesperado :/',
      });
    }
    setIsDeleting(false);
  };

  // ----------------------------------------------------------------------

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <RHFProvider methods={methods}>
        <Container
          insets={['B', 'L', 'R']}
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <View>
            {!!errors.afterSubmit && (
              <>
                <Alert>{errors.afterSubmit.message}</Alert>
                <Gap />
              </>
            )}

            <RHFCurrencyInput name="value" label="Valor" />

            <Gap />

            <RHFTextInput name="description" label="Descrição" />

            <Gap />

            <RHFSegmentedButtons
              name="type"
              disabled={!!isEdit}
              buttons={[
                {
                  value: 'entry',
                  label: 'Entrada',
                  icon: 'circlePlus',
                },
                {
                  value: 'exit',
                  label: 'Saída',
                  icon: 'circleMinus',
                },
              ]}
            />

            <Gap />

            <RHFDatePicker name="occurred_at" />

            {/* <CategoryDialog
            category={category}
            setCategory={setCategory}
          /> */}
          </View>

          <View style={{}}>
            {isEdit && (
              <>
                <Gap />
                <Button
                  onPress={onDelete}
                  loading={isDeleting}
                  variant="text"
                  textStyle={{ color: theme.palette.error.main }}
                >
                  Deletar
                </Button>
              </>
            )}

            <Gap />

            <Button onPress={handleSubmit(onSubmit)} loading={isSubmitting}>
              {isEdit ? 'Salvar' : 'Adicionar'}
            </Button>
          </View>
        </Container>
      </RHFProvider>
    </ScrollView>
  );
}
