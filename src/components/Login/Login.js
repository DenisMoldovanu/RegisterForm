import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useForm from "../utilities/useForm";
import validate from "../utilities/validateLogin";
import { authenticate, getUser } from "redux/action-creators";
import { types } from "redux/action-types";
import "./Login.scss";
import { useDispatch } from "react-redux";
import { translate } from "components/helpers/translate";
import { Spinner } from "react-bootstrap";

const Login = () => {
  const { handleChange, handleSubmit, values, errors, isloading, setLoading, setDisabled, isDisabled } = useForm(
    submitForm,
    validate,
    authenticate
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const [errorMessages, setErrorMessages] = useState("");

  function submitForm(response) {
    if (response.type === types.LOG_IN_USER_SUCCESS) {
      navigate("/profile");
    } else {
      setErrorMessages(response?.error?.response?.data?.errors);
      setDisabled(true);
      setLoading(false);
    }
  }

  return (
    <div className='row g-0 auth-wrapper'>
      <div className='col-12 col-md-7 col-lg-6 auth-main-col text-center'>
        <div className='d-flex flex-column align-content-end'>
          <div className='auth-body mx-auto'>
            <p className='signInTitle'>{translate("loginAccount")}</p>
            <p className='error-email'>
              {Object.values(errorMessages).map(item => {
                return (item = translate("EmailPasswordError"));
              })}
            </p>
            <div className='auth-form-container text-start'>
              <form className='auth-form' method='POST' onSubmit={handleSubmit} autoComplete={"off"}>
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

                  <div className='extra mt-3 row justify-content-between'>
                    <div className='col-6 rememberMe'>
                      <div className='form-check'>
                        <input
                          name='remember'
                          type='checkbox'
                          id='remember'
                          checked={values.remember}
                          onChange={handleChange}
                        />
                        <label className='form-check-label remember-me' htmlFor='remember'>
                          {translate("rememberMecheck")}
                        </label>
                      </div>
                    </div>
                    <div className='col-6 forgotPassword'>
                      <div className='forgot-password text-end'>
                        <Link to='/forgot-password'>{translate("forgotPassword")}</Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='text-center'>
                  {isloading ? (
                    <button disabled={isDisabled} type='submit' className='btn btn-primary w-100 theme-btn mx-auto'>
                      <Spinner animation='border' role='status'>
                        <span className='visually-hidden'>Loading...</span>
                      </Spinner>
                    </button>
                  ) : (
                    <button disabled={isDisabled} type='submit' className='btn btn-primary w-100 theme-btn mx-auto'>
                      {translate("loginBtn")}
                    </button>
                  )}
                </div>
              </form>

              <hr />
              <div className='auth-option text-center pt-2'>
                {translate("noAccount")}{" "}
                <Link className='text-link' to='/registration-page'>
                  {translate("signUpLink")}{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
