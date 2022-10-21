import React, { useState } from 'react';
// components
import { View } from 'react-native';
import { FAB, Chip } from 'react-native-paper';
// import { CategoryDialog } from './CategoryDialog';
// form
import { useForm } from 'react-hook-form';
import { TransactionSchemas } from '@src/utils/form-schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { RHFProvider, RHFSegmentedButtons, RHFTextInput } from '@src/components/hook-form';
// types
import { TTransactionCreate } from '@src/@types/transaction';
// utils
import { dbMethods } from '@src/utils/firebase/database';

// ----------------------------------------------------------------------

type FormProps = TTransactionCreate & {
  afterSubmit?: string;
};

// ----------------------------------------------------------------------

export function CreateForm() {
  // ----------------------------------------------------------------------

  const defaultValues = {
    description: '',
    value: undefined,
    type: 'exit' as TTransactionCreate['type'],
    // category: null,
    //
    afterSubmit: undefined,
  };

  const methods = useForm<FormProps>({
    resolver: yupResolver(TransactionSchemas.Create),
    defaultValues,
  });

  const {
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormProps) => {
    try {
      const createData: TTransactionCreate = {
        description: data.description,
        value: data.value,
        type: data.type,
        occurred_at: new Date(),
        // category: null,
      };

      await dbMethods().transactions.create(createData);

      reset();
    } catch (error: any) {
      console.log('[ebuba] error: ', error);
      setError('afterSubmit', {
        ...error,
        message: error.message ?? 'Ocorreu um erro inesperado :/',
      });
    }
  };

  // ----------------------------------------------------------------------

  return (
    <RHFProvider methods={methods}>
      <View style={{ flex: 1, padding: 24, justifyContent: 'space-between' }}>
        <View>
          {!!errors.afterSubmit && (
            <Chip icon="information" style={{ marginBottom: 12 }}>
              {errors.afterSubmit.message}
            </Chip>
          )}

          <RHFTextInput name="description" label="Descrição" />
          <RHFTextInput name="value" label="Valor" />

          <RHFSegmentedButtons
            name="type"
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
            style={{ marginBottom: 12, marginTop: 4 }}
          />

          {/* <CategoryDialog
            category={category}
            setCategory={setCategory}
          /> */}
        </View>

        <FAB
          icon=""
          mode="flat"
          label="Adicionar"
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </RHFProvider>
  );
}
