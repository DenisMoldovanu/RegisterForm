import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../utilities/useForm";
import validate from "../utilities/ValidateReset";
import { types } from "redux/action-types";
import "./Reset.scss";
import { useDispatch } from "react-redux";
import { translate } from "components/helpers/translate";
import { Spinner } from "react-bootstrap";
import { resetPassword } from "redux/action-creators";
import { useParams } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ResetPassword = () => {
  let { token } = useParams();
  const [values, setValues] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isloading, setLoading] = useState(false);
  const [isDisabled, setDisabled] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const [showPassword2, setShowPassword2] = useState(false);
  const [errorMessages, setErrorMessages] = useState("");
  const togglePassword2 = () => setShowPassword2(!showPassword2);

  const handleChange = e => {
    const target = e.target;
    const name = target.name;
    let value = target.type;
    switch (value) {
      case "radio":
        value = target.value;
        break;
      case "checkbox":
        value = target.checked;
        break;
      default:
        value = target.value;
    }
    setValues({
      ...values,
      [name]: value,
    });
    setDisabled(false);
  };

  const submitPassword = e => {
    e.preventDefault();
    setErrors(validate(values));
    const isValid = Object.keys(validate(values)).length === 0;

    if (isValid) {
      dispatch(resetPassword(token, values)).then(response => {
        if (response.type === types.RESET_PASSWORD_SUCCESS) {
          navigate("/login");
        } else {
          setErrorMessages(response?.error?.response?.data?.error);
          setDisabled(true);
          setLoading(false);
        }
      });
      setLoading(true);
      setDisabled(true);
    }
  };

  return (
    <div className='row g-0 auth-wrapper'>
      <div className='col-12 col-md-7 col-lg-6 auth-main-col text-center'>
        <div className='d-flex flex-column align-content-end'>
          <div className='auth-body mx-auto'>
            <p className='signInTitle'>{translate("resetPassword")}</p>
            <p className='error-email'>{errorMessages ? translate("errorReset") : ""}</p>
            <div className='auth-form-container text-start'>
              <form className='auth-form' method='POST' onSubmit={submitPassword} autoComplete={"off"}>
                <div className='email mb-3'>
                  <input
                    className={`form-control ${errors.email ? "is-invalid " : ""}`}
                    type='email'
                    name='email'
                    placeholder={translate("labelEmail")}
                    value={values.email}
                    onChange={handleChange}
                  />

                  <div className={`invalid-feedback text-start ${errors.email ? "d-block" : "d-none"}`}>
                    {errors.email}
                  </div>
                </div>

                <div className='password mb-3'>
                  <div className='input-group'>
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control ${errors.password ? "is-invalid " : ""}`}
                      name='password'
                      placeholder={translate("labelPassword1")}
                      value={values.password}
                      onChange={handleChange}
                    />

                    <button type='button' className='btn btn-outline-primary btn-sm' onClick={togglePassword}>
                      <FontAwesomeIcon icon={showPassword == false ? faEyeSlash : faEye} />
                    </button>

                    <div className={`invalid-feedback text-start ${errors.password ? "d-block" : "d-none"}`}>
                      {errors.password}
                    </div>
                  </div>
                </div>
                <div className='password mb-3'>
                  <div className='input-group'>
                    <input
                      type={showPassword2 ? "text" : "password"}
                      className={`form-control ${errors.password_confirmation ? "is-invalid " : ""}`}
                      name='password_confirmation'
                      placeholder={translate("labelPassword2")}
                      value={values.password_confirmation}
                      onChange={handleChange}
                    />

                    <button type='button' className='btn btn-outline-primary btn-sm' onClick={togglePassword2}>
                      <FontAwesomeIcon icon={showPassword2 == false ? faEyeSlash : faEye} />
                    </button>

                    <div
                      className={`invalid-feedback text-start ${errors.password_confirmation ? "d-block" : "d-none"}`}>
                      {errors.password_confirmation}
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
                      {translate("reset")}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
