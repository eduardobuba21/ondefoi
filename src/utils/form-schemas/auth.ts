import * as Yup from 'yup';

// ----------------------------------------------------------------------

export const Email = Yup.string()
  .required('Informe um email')
  .email('Email inválido')
  .max(128, 'Email muito grande');

const Password = Yup.string()
  .required('Insira uma senha')
  .matches(
    /^.*(?=.{8,})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    'Sua senha deve conter no mínimo: 8 caracteres, 1 maiúsculo, 1 minúsculo e 1 número'
  )
  .max(64, 'Sua senha pode ter no máximo 64 caracteres');

// ----------------------------------------------------------------------

const Login = Yup.object().shape({
  email: Email,
  password: Password,
});

const Register = Yup.object().shape({
  email: Email,
  password: Password,
});

// ----------------------------------------------------------------------

const AuthSchemas = { Login, Register };

export default AuthSchemas;
