import { translate } from "components/helpers/translate";
export default function validateReset(values) {
  let errors = {};

  if (!values.email) {
    errors.email = translate("emailRequired");
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = translate("emailInvalid");
  }
  if (!values.password) {
    errors.password = translate("passwordRequired");
  } else if (values.password.length < 9) {
    errors.password = translate("passwordLength");
  }

  if (!values.password_confirmation) {
    errors.password_confirmation = translate("passwordConfirmation");
  } else if (values.password_confirmation !== values.password) {
    errors.password_confirmation = translate("passwordMatch");
  }

  return errors;
}
