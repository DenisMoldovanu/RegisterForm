import { translate } from "components/helpers/translate";

export default function validateLogin(values) {
  let errors = {};

  if (!values.s_email) {
    errors.s_email = translate("emailRequired");
  } else if (!/\S+@\S+\.\S+/.test(values.s_email)) {
    errors.s_email = translate("emailInvalid");
  }
  if (!values.s_password) {
    errors.s_password = translate("passwordRequired");
  } else if (values.s_password.length < 9) {
    errors.s_password = translate("passwordLength");
  }
  return errors;
}
