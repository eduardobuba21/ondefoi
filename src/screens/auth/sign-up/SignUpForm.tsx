import React, { useState } from 'react';
// components
import { Chip, Button, TextInput } from 'react-native-paper';
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
        <Chip icon="information" style={{ marginBottom: 12 }}>
          {errors.afterSubmit.message}
        </Chip>
      )}

      <RHFTextInput name="nickname" label="Como quer ser chamado?" />

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
        Registrar
      </Button>
    </RHFProvider>
  );
}
