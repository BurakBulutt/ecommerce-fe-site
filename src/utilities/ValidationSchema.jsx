import * as Yup from 'yup';

export const LoginRequestSchema = Yup.object({
    username: Yup.string().required('Bu Alan Boş Bırakılamaz'),
    password: Yup.string().required('Bu Alan Boş Bırakılamaz')
});

export const RegisterRequestSchema = Yup.object({
    name: Yup.string().required('Bu Alan Boş Bırakılamaz'),
    surname: Yup.string().required('Bu Alan Boş Bırakılamaz'),
    username: Yup.string().required('Bu Alan Boş Bırakılamaz'),
    password: Yup.string().required('Bu Alan Boş Bırakılamaz')
});

export const PaymentRequestSchema = Yup.object({
    deliveryAddress: Yup.string().required('Bu Alan Boş Bırakılamaz'),
    billingAddress: Yup.string().required('Bu Alan Boş Bırakılamaz')
});