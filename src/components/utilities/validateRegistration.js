import { translate } from "components/helpers/translate";
export default function validateRegistration(values) {
  let errors = {};

  // if (!values.username.trim()) {
  //   errors.username = "Username required";
  // }
  // else if (!/^[A-Za-z]+/.test(values.name.trim())) {
  //   errors.name = 'Enter a valid name';
  // }
  if (!values.s_username) {
    errors.s_username = translate("userNameRequired");
  }

  if (!values.s_first_name) {
    errors.s_first_name = translate("firstNameRequired");
  }

  if (!values.s_name) {
    errors.s_name = translate("lastNameRequired");
  }
  if (!values.country) {
    errors.country = translate("countryerror");
  }
  if (!values.region) {
    errors.region = translate("regionerror");
  }

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

  if (!values.s_password_confirmation) {
    errors.s_password_confirmation = translate("passwordConfirmation");
  } else if (values.s_password_confirmation !== values.s_password) {
    errors.s_password_confirmation = translate("passwordMatch");
  }

  if (!values.phonenumber) {
    errors.phonenumber = translate("phoneNumberRequired");
  } else if (values.phonenumber.length < 6) {
    errors.phonenumber = translate("phoneNumberLength");
  }

  if (!values.terms) {
    errors.terms = translate("termsRequired");
  }

  if (!values.policy) {
    errors.policy = translate("policyRequired");
  }
  return errors;
}
