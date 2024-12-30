import * as yup from 'yup'

export const profileSchema = yup.object({
    name: yup.string().required("El nombre es requerido"),
    lastname: yup.string().required("El apellido es requerido"),
    address: yup.string().required("La dirección es requerida"),
    email: yup.string().required("el email es requerido"),
    password: yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(20, 'La contraseña no puede tener más de 20 caracteres')
    .matches(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
    .matches(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula')
    .matches(/[0-9]/, 'La contraseña debe contener al menos un número')
    .matches(/[@$!%*?&]/, 'La contraseña debe contener al menos un carácter especial (@, $, !, %, *, ?, &)')
    .matches(/^\S*$/, 'La contraseña no puede contener espacios'),
    confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir')
})