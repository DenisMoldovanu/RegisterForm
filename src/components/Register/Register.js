import React, { useState } from "react";
import { Link } from "react-router-dom";
import validate from "../utilities/validateRegistration";
import useForm from "../utilities/useForm";
import { setUser } from "redux/action-creators";
import { types } from "redux/action-types";
import { translate } from "components/helpers/translate";
import { Spinner } from "react-bootstrap";
import "./Register.scss";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Register = () => {
  const { handleChange, handleSubmit, values, errors, isloading, setLoading, isDisabled, setDisabled } = useForm(
    submitForm,
    validate,
    setUser
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");

  const togglePassword = () => setShowPassword(!showPassword);
  const togglePassword2 = () => setShowPassword2(!showPassword2);
  const [errorMessages, setErrorMessages] = useState("");

  values.country = country;
  values.region = region;

  function submitForm(response) {
    if (response.type === types.SET_USER_SUCCESS) {
      setIsSubmitted(true);
    } else {
      setErrorMessages(response?.error?.response?.data?.errors);
      setDisabled(true);
      setLoading(false);
    }
  }

  return (
    <div className='form-container'>
      {!isSubmitted ? (
        <div className='row g-0 auth-wrapper'>
          <div className='col-12 col-md-7 col-lg-6 auth-main-col text-center'>
            <div className='d-flex flex-column align-content-end registration-block-form'>
              <div className='auth-body mx-auto'>
                <p className='register-title'>{translate("createYourAccount")}</p>
                <div className='auth-form-container text-start'>
                  <form className='auth-form' method='POST' onSubmit={handleSubmit} noValidate>
                    <div className='new-register register-block'>
                      {/* <p className='register-block-title'>{translate("registerTitle")}</p> */}
                      <div className='email mb-3'>
                        <input
                          className={`form-control ${errors.s_email ? "is-invalid " : ""}`}
                          type='email'
                          name='s_email'
                          placeholder={translate("labelEmail")}
                          value={values.s_email}
                          onChange={handleChange}
                        />
                        <div className={`invalid-feedback text-start ${errors.s_email ? "d-block" : "d-none"}`}>
                          {errors.s_email}
                        </div>
                      </div>
                      <div className='name mb-3'>
                        <input
                          type='text'
                          className={`form-control ${errors.s_username ? "is-invalid " : ""}`}
                          name='s_username'
                          value={values.s_username}
                          placeholder={translate("labelUserName")}
                          onChange={handleChange}
                        />
                        <div className={`invalid-feedback text-start ${errors.s_username ? "d-block" : "d-none"}`}>
                          {errors.s_username}
                        </div>
                      </div>
                      <div className='password mb-3'>
                        <div className='input-group'>
                          <input
                            type={showPassword ? "text" : "password"}
                            className={`form-control ${errors.s_password ? "is-invalid " : ""}`}
                            name='s_password'
                            placeholder={translate("labelPassword1")}
                            value={values.s_password}
                            onChange={handleChange}
                          />
                          <button type='button' className='btn btn-outline-primary btn-sm' onClick={togglePassword}>
                            <FontAwesomeIcon icon={showPassword == false ? faEyeSlash : faEye} />
                          </button>
                          <div className={`invalid-feedback text-start ${errors.s_password ? "d-block" : "d-none"}`}>
                            {errors.s_password}
                          </div>
                        </div>
                      </div>
                      <div className='password mb-3'>
                        <div className='input-group'>
                          <input
                            type={showPassword2 ? "text" : "password"}
                            className={`form-control ${errors.s_password_confirmation ? "is-invalid " : ""}`}
                            name='s_password_confirmation'
                            placeholder={translate("labelPassword2")}
                            value={values.s_password_confirmation}
                            onChange={handleChange}
                          />
                          <button type='button' className='btn btn-outline-primary btn-sm' onClick={togglePassword2}>
                            <FontAwesomeIcon icon={showPassword2 == false ? faEyeSlash : faEye} />
                          </button>
                          <div
                            className={`invalid-feedback text-start ${
                              errors.s_password_confirmation ? "d-block" : "d-none"
                            }`}>
                            {errors.s_password_confirmation}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='contacts-register  register-block'>
                      {/* <p className='register-block-title'>{translate("registerContacts")}</p> */}
                      <div className='mb-2 gender-block'>
                        {/* <p>{translate("genderTitle")}</p> */}
                        <div className='radio-btns-block'>
                          <div className='gender-radio-btn'>
                            <input
                              type='radio'
                              value='male'
                              name='gender'
                              checked={values.gender === "male"}
                              onChange={handleChange}
                            />{" "}
                            {translate("genderMale")}
                          </div>
                          <div className='gender-radio-btn'>
                            <input
                              type='radio'
                              value='female'
                              name='gender'
                              checked={values.gender === "female"}
                              onChange={handleChange}
                            />{" "}
                            {translate("genderFemale")}
                          </div>
                        </div>
                      </div>
                      <div className='name mb-3'>
                        <input
                          type='text'
                          className={`form-control ${errors.s_first_name ? "is-invalid " : ""}`}
                          name='s_first_name'
                          value={values.s_first_name}
                          placeholder={translate("labelName")}
                          onChange={handleChange}
                        />
                        <div className={`invalid-feedback text-start ${errors.s_first_name ? "d-block" : "d-none"}`}>
                          {errors.s_first_name}
                        </div>
                      </div>
                      <div className='name mb-3'>
                        <input
                          type='text'
                          className={`form-control ${errors.s_name ? "is-invalid " : ""}`}
                          name='s_name'
                          value={values.s_name}
                          placeholder={translate("labelLastName")}
                          onChange={handleChange}
                        />
                        <div className={`invalid-feedback text-start ${errors.s_name ? "d-block" : "d-none"}`}>
                          {errors.s_name}
                        </div>
                      </div>
                    </div>
                    <div className='adress-register register-block'>
                      {/* <p className='register-block-title'>{translate("registerAdress")}</p> */}
                      <div className='name mb-3'>
                        <CountryDropdown
                          className={`country_select ${errors.country ? "is-error" : ""}`}
                          value={country}
                          onChange={val => setCountry(val)}
                        />
                        <div className={`invalid-feedback text-start ${errors.country ? "d-block" : "d-none"}`}>
                          {errors.country}
                        </div>
                      </div>
                      <div className='name mb-3'>
                        <RegionDropdown
                          className={`region_select ${errors.region ? "is-error" : ""}`}
                          country={country}
                          value={region}
                          onChange={val => setRegion(val)}
                        />
                        <div className={`invalid-feedback text-start ${errors.region ? "d-block" : "d-none"}`}>
                          {errors.region}
                        </div>
                      </div>
                      <div className='name mb-3'>
                        <input
                          type='text'
                          className='form-control'
                          name='zip'
                          value={values.zip}
                          placeholder={translate("zipCode")}
                          onChange={handleChange}
                        />
                      </div>
                      <div className='name mb-3'>
                        <input
                          type='text'
                          className='form-control'
                          name='address'
                          value={values.address}
                          placeholder={translate("address")}
                          onChange={handleChange}
                        />
                      </div>
                      <div className='name mb-3'>
                        <input
                          type='text'
                          className={`form-control ${errors.phonenumber ? "is-invalid " : ""}`}
                          name='phonenumber'
                          value={values.phonenumber}
                          placeholder={translate("phone")}
                          onChange={handleChange}
                        />
                        <div className={`invalid-feedback text-start ${errors.phonenumber ? "d-block" : "d-none"}`}>
                          {errors.phonenumber}
                        </div>
                      </div>
                    </div>
                    <div className='register-terms-block '>
                      <div className='terms-checkbox terms-register'>
                        <input
                          name='terms'
                          type='checkbox'
                          id='agreeTerms'
                          checked={values.terms}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor='agreeTerms'
                          dangerouslySetInnerHTML={{ __html: translate("termsAndConditions") }}
                        />
                      </div>
                      <div className={`invalid-feedback text-start ${errors.terms ? "d-block" : "d-none"}`}>
                        {errors.terms}
                      </div>
                      <div className='policy-checkbox terms-register'>
                        <input
                          name='policy'
                          type='checkbox'
                          id='agreePolicy'
                          checked={values.policy}
                          onChange={handleChange}
                        />
                        <label htmlFor='agreePolicy' dangerouslySetInnerHTML={{ __html: translate("privacyPolicy") }} />
                      </div>
                      <div className={`invalid-feedback text-start ${errors.policy ? "d-block" : "d-none"}`}>
                        {errors.policy}
                      </div>
                    </div>
                    <p className='error-email'>
                      {Object.values(errorMessages).map(item => {
                        return (item = translate("EmailExists"));
                      })}
                    </p>
                    <div className='text-center'>
                      {isloading ? (
                        <button disabled={isDisabled} type='submit' className='btn btn-primary w-100 theme-btn mx-auto'>
                          <Spinner animation='border' role='status'>
                            <span className='visually-hidden'>Loading...</span>
                          </Spinner>
                        </button>
                      ) : (
                        <button disabled={isDisabled} type='submit' className='btn btn-primary w-100 theme-btn mx-auto'>
                          {translate("signUpbtn")}
                        </button>
                      )}
                    </div>
                  </form>
                  <hr />
                  <div className='auth-option text-center pt-2'>
                    {translate("questionAccount")}{" "}
                    <Link className='text-link' to='/login'>
                      {translate("linkSignIn")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='row g-0 auth-wrapper'>
          <div className='col-12 col-md-7 col-lg-6 auth-main-col text-center'>
            <div className='d-flex flex-column align-content-end'>
              <div className='auth-body mx-auto'>
                <p>{translate("succesRegister")}</p>
                <div className='auth-form-container text-start'>
                  <hr />
                  <div className='auth-option text-center pt-2'>
                    <Link className='text-link' to='/login'>
                      {translate("goLogin")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
