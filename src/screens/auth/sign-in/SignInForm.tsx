import React, { useState } from 'react';
// components
import { Gap, Alert, Button, IconButton } from '@src/components/default';
// hooks
import { useTheme } from '@src/hooks/useTheme';
// form
import { useForm } from 'react-hook-form';
import { AuthSchemas } from '@src/utils/form-schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { RHFProvider, RHFTextInput } from '@src/components/hook-form';
// types
import { TUserLogin } from '@src/@types/auth';
// utils
import { FirebaseError } from 'firebase/app';
import { authMethods } from '@src/utils/firebase/auth';

// ----------------------------------------------------------------------

type FormProps = TUserLogin & {
  afterSubmit?: string;
};

// ----------------------------------------------------------------------

export function SignInForm() {
  const theme = useTheme();
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
        <>
          <Alert>{errors.afterSubmit.message}</Alert>
          <Gap />
        </>
      )}

      <RHFTextInput name="email" label="Email" />

      <Gap />

      <RHFTextInput
        name="password"
        label="Senha"
        secureTextEntry={isPwdHidden}
        right={
          <IconButton
            name={isPwdHidden ? 'eye' : 'eyeOff'}
            onPress={() => setIsPwdHidden(!isPwdHidden)}
            color={theme.palette.text.faded}
          />
        }
      />

      <Button loading={isSubmitting} style={{ marginTop: 24 }} onPress={handleSubmit(onSubmit)}>
        Entrar
      </Button>
    </RHFProvider>
  );
}
