import React, { useState } from 'react';
// components
import { Chip, Button, TextInput } from 'react-native-paper';
// form
import { useForm } from 'react-hook-form';
import { AuthSchemas } from '@src/utils/form-schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { RHFProvider, RHFTextInput } from '@src/components/hook-form';
// types
import { TUserAuth } from '@src/@types/auth';
// utils
import { FirebaseError } from 'firebase/app';
import { authMethods } from '@src/utils/firebase/auth';

// ----------------------------------------------------------------------

type FormProps = TUserAuth & {
  afterSubmit?: string;
};

// ----------------------------------------------------------------------

export function SignInForm() {
  const [isPwdHidden, setIsPwdHidden] = useState(true);

  // ----------------------------------------------------------------------

  const defaultValues = {
    email: '',
    password: '',
    //
    afterSubmit: undefined,
  };

  const methods = useForm<FormProps>({
    resolver: yupResolver(AuthSchemas.Login),
    defaultValues,
  });

  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormProps) => {
    try {
      await authMethods().signIn(data.email, data.password);
    } catch (error: any) {
      if (error instanceof FirebaseError) {
        // TODO: firebase error message mapping
        return setError('afterSubmit', {
          ...error,
          message: 'Dados de acesso inválidos.',
        });
      }

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
      {!!errors.afterSubmit && (
        <Chip icon="information" style={{ marginBottom: 12 }}>
          {errors.afterSubmit.message}
        </Chip>
      )}

      <RHFTextInput name="email" label="Email" />
      <RHFTextInput
        name="password"
        label="Senha"
        secureTextEntry={isPwdHidden}
        right={
          <TextInput.Icon
            icon={isPwdHidden ? 'eye' : 'eye-off'}
            onPress={() => setIsPwdHidden(!isPwdHidden)}
          />
        }
      />

      <Button
        mode="contained"
        loading={isSubmitting}
        onPress={handleSubmit(onSubmit)}
        style={{ marginTop: 24 }}
      >
        Entrar
      </Button>
    </RHFProvider>
  );
}
