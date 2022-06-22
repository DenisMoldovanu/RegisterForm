import { useState } from "react";
import { Link } from "react-router-dom";
import { translate } from "components/helpers/translate";
import { types } from "redux/action-types";
import { sendResetEmail } from "redux/action-creators";
import { useDispatch } from "react-redux";
const Forgot = () => {
  const [email, setEmail] = useState({
    s_email: "",
  });
  const [error, setError] = useState(false);
  const [isSuccessmessage, setSuccessmessage] = useState(false);
  const [showErrormsg, setErrormsg] = useState(false);
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;
    setEmail({
      ...email,
      [name]: value,
    });
  };

  const forgotPassword = e => {
    e.preventDefault();

    if (!email.s_email) {
      setError("Email required");
    } else if (!/\S+@\S+\.\S+/.test(email.s_email)) {
      setError("Email address is invalid");
    } else {
      setError(false);
      dispatch(sendResetEmail(email)).then(response => {
        if (response.type === types.SEND_RESET_EMAIL_SUCCESS) {
          setSuccessmessage(true);
        } else {
          setSuccessmessage(false);
          setErrormsg(true);
        }
      });
    }
  };

  return (
    <div className='row g-0 auth-wrapper'>
      <div className='col-12 col-md-7 col-lg-6 auth-main-col text-center'>
        <div className='d-flex flex-column align-content-end'>
          {!isSuccessmessage ? (
            <div className='auth-body mx-auto'>
              <p className='forgotTitle'>{translate("forgotPassword")}</p>
              <p className='error-email'>{showErrormsg ? translate("EmailPasresetError") : ""}</p>
              <div className='auth-form-container text-start'>
                <form className='auth-form' method='POST' onSubmit={forgotPassword} autoComplete={"off"}>
                  <div className='email mb-3'>
                    <input
                      type='email'
                      className={`form-control ${error ? "is-invalid " : ""}`}
                      id='email'
                      name='s_email'
                      value={email.s_email}
                      placeholder={translate("labelEmail")}
                      onChange={handleChange}
                    />
                    <div className={`invalid-feedback text-start ${error ? "d-block" : "d-none"}`}>{error}</div>
                  </div>
                  <div className='text-center'>
                    <button type='submit' className='btn btn-primary w-100 theme-btn mx-auto'>
                      {translate("forgotPasswordBtn")}
                    </button>
                  </div>
                </form>
                <hr />
                <div className='auth-option text-center pt-2'>
                  <Link className='text-link' to='/login'>
                    {translate("backLoginLink")}
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className='auth-body mx-auto'>
              <p className='forgotTitle'>{translate("successlink")}</p>
              <div className='auth-form-container text-start'>
                <hr />
                <div className='auth-option text-center pt-2'>
                  <Link className='text-link' to='/login'>
                    {translate("backLoginLink")}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Forgot;
