import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { types } from "redux/action-types";
import { updateUserPassword } from "redux/action-creators";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../FormElements/Button";
import InputGroup from "../../FormElements/InputGroup";
import { translate } from "components/helpers/translate";
import { confirmAlert } from "react-confirm-alert";
import classNames from "classnames";

const PasswordForm = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    newPass: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({
    newPass: false,
    confirm: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOnChangePassword = e => {
    const { name, value } = e.target || "";

    setForm(form => {
      return {
        ...form,
        [name]: value !== "" ? value : null,
      };
    });
  };

  const submitPasswordForm = e => {
    e.preventDefault();
    let errors = { newPass: false, confirm: false };
    if (!form.newPass) {
      errors = { ...errors, newPass: translate("newPsdErrorMsg") };
    }
    if (!form.confirm) {
      errors = { ...errors, confirm: translate("confirmPsdErrorMsg") };
    }

    setErrors(errors);

    if (!errors.newPass && !errors.confirm) {
      setIsSubmitting(true);
      dispatch(
        updateUserPassword({
          password: form.newPass,
          password_confirmation: form.confirm,
        })
      ).then(response => {
        if (response.type === types.UPDATE_USER_PASSWORD_SUCCESS) {
          setForm({
            newPass: "",
            confirm: "",
          });
          setMessage(false);
          setShowPassword(false);
          confirmAlert({
            title: translate("updatePsdSuccessMsg"),
            buttons: [
              {
                label: translate("close"),
              },
            ],
          });
        } else if (response.type === types.UPDATE_USER_PASSWORD_FAIL) {
          let text = "";
          text =
            response?.error?.response?.data?.errors?.password ||
            response?.error?.response?.data?.errors?.password_confirmation;
          setMessage({
            type: "error",
            text: text,
          });
          setErrors({
            newPass: true,
            confirm: true,
          });
        }
        setIsSubmitting(false);
      });
    }
  };

  const type = showPassword == false ? "password" : "text";
  const elements = [
    {
      id: 1,
      type: type,
      name: "newPass",
      placeholder: translate("newPsd"),
      class: `normal ${errors.newPass && "error"}`,
      value: form.newPass,
      onChange: handleOnChangePassword,
      error: errors.newPass,
    },
    {
      id: 2,
      type: type,
      name: "confirm",
      placeholder: translate("confirmPsd"),
      class: `normal ${errors.confirm && "error"}`,
      value: form.confirm,
      onChange: handleOnChangePassword,
      error: errors.confirm,
    },
  ];

  return (
    <React.Fragment>
      <h2 className='title marginTop'>
        Change password{" "}
        {message !== false && (
          <div
            className={classNames("message", {
              error: message.type === "error",
              success: message.type !== "error",
            })}>
            {" "}
            - {message.text}
          </div>
        )}
      </h2>
      <form onSubmit={submitPasswordForm}>
        <div className='edit-profile-row two'>
          {elements &&
            elements.map(el => {
              return (
                <InputGroup
                  key={el.id}
                  type={el.type}
                  name={el.name}
                  placeholder={el.placeholder}
                  inputClass={el.class}
                  inputValue={el.value}
                  onChange={el.onChange}
                  error={el.error}
                />
              );
            })}
          <FontAwesomeIcon
            icon={showPassword == false ? faEyeSlash : faEye}
            onClick={() => setShowPassword(!showPassword)}
            className={classNames("showPassword", {
              error: errors.newPass !== false || errors.confirm !== false,
              msg: errors.newPass === true || errors.confirm === true,
            })}
          />
        </div>
        <Button text={translate("save")} btnClass='save' onClick={submitPasswordForm} disabled={isSubmitting} />
      </form>
    </React.Fragment>
  );
};

export default PasswordForm;
