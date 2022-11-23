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
import { TUserCreate } from '@src/@types/user';
// utils
import { authMethods } from '@src/utils/firebase/auth';
import { FirebaseError } from 'firebase/app';

// ----------------------------------------------------------------------

type FormProps = Omit<TUserCreate, 'created_at'> & {
  afterSubmit?: string;
};

// ----------------------------------------------------------------------

export function SignUpForm() {
  const theme = useTheme();
  const [isPwdHidden, setIsPwdHidden] = useState(true);

  // ----------------------------------------------------------------------

  const defaultValues = {
    email: '',
    password: '',
    nickname: '',
    //
    afterSubmit: undefined,
  };

  const methods = useForm<FormProps>({
    resolver: yupResolver(AuthSchemas.Register),
    defaultValues,
  });

  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormProps) => {
    try {
      await authMethods().signUp(data.email, data.password, data.nickname);
    } catch (error: any) {
      if (error instanceof FirebaseError) {
        // TODO: firebase error message mapping
        return setError('afterSubmit', {
          ...error,
          message: 'Verifique os dados informados.',
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

      <RHFTextInput name="nickname" label="Nome" />

      <Gap />

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
        Registrar
      </Button>
    </RHFProvider>
  );
}
