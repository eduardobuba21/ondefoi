import React, { useState } from 'react';
// components
import { View } from 'react-native';
import { FAB, Chip, Button } from 'react-native-paper';
// import { CategoryDialog } from './CategoryDialog';
// hooks
import { useTheme } from '@src/hooks/useTheme';
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
// types
import { ITransaction, TTransactionCreate, TTransactionUpdate } from '@src/@types/transaction';
// utils
import { dbMethods } from '@src/utils/firebase/database';

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

        await dbMethods().transactions.create(createData);
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

        await dbMethods().transactions.update(_data.id, updateData);
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
      await dbMethods().transactions.delete(editData.id);
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
    <RHFProvider methods={methods}>
      <View style={{ padding: 24, paddingTop: 0 }}>
        <View>
          {!!errors.afterSubmit && (
            <Chip icon="information" style={{ marginBottom: 12 }}>
              {errors.afterSubmit.message}
            </Chip>
          )}

          <RHFCurrencyInput name="value" label="Valor" />

          <RHFTextInput name="description" label="Descrição" />

          <RHFSegmentedButtons
            name="type"
            buttons={[
              {
                value: 'entry',
                label: 'Entrada',
                icon: 'plus-circle-outline',
                style: { width: '50%' },
                disabled: isEdit,
              },
              {
                value: 'exit',
                label: 'Saída',
                icon: 'minus-circle-outline',
                style: { width: '50%' },
                disabled: isEdit,
              },
            ]}
            style={{ marginBottom: 12, marginTop: 4 }}
          />

          <RHFDatePicker name="occurred_at" />

          {/* <CategoryDialog
            category={category}
            setCategory={setCategory}
          /> */}
        </View>

        <View style={{ marginTop: 80 }}>
          {isEdit && (
            <Button
              mode="outlined"
              textColor={theme.colors.secondary}
              onPress={onDelete}
              loading={isDeleting}
            >
              Deletar
            </Button>
          )}
          <FAB
            style={{ marginTop: 12 }}
            icon=""
            mode="flat"
            variant="secondary"
            label={isEdit ? 'Salvar' : 'Adicionar'}
            loading={isSubmitting}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </RHFProvider>
  );
}
