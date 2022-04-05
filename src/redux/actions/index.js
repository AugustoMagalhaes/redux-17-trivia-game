import { GET_EMAIL, GET_PASSWORD } from '../reducers/loginReducer';

export const getEmailAction = (value) => ({ type: GET_EMAIL, data: { email: value } });
export const getPassWordAction = (value) => (
  { type: GET_PASSWORD, data: { password: value } });
