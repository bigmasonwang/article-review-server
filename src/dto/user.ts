import * as yup from 'yup';

export const UserSchema = yup.object().shape({
  userName: yup
    .string()
    .required('userName is required!')
    .min(2, 'userName is too short - should be 6 chars minimum!')
    .max(50, 'userName is too long - should be 50 chars maximum!!')
    .required('userName is required!'),
  email: yup
    .string()
    .required('email is required')
    .email('Should be valide email address!'),
  password: yup
    .string()
    .required('password is required!')
    .min(6, 'password is too short - should be 6 chars minimum!')
    .max(40, 'password is too long - should be 40 chars maximum!'),
});
