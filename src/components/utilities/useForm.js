import { useState } from "react";
import { useDispatch } from "react-redux";

const useForm = (callback, validate, setUser) => {
  const dispatch = useDispatch();
  const [isloading, setLoading] = useState(false);
  const [isDisabled, setDisabled] = useState(false);

  const [values, setValues] = useState({
    s_email: "",
    s_password: "",
    s_password_confirmation: "",
    s_username: "",
    s_name: "",
    s_first_name: "",
    phonenumber: "",
    country: "",
    region: "",
    zip: "",
    address: "",
    terms: false,
    policy: false,
    gender: "male",
  });

  const [errors, setErrors] = useState({});
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

  const handleSubmit = e => {
    e.preventDefault();

    setErrors(validate(values));
    const isValid = Object.keys(validate(values)).length === 0;
    if (isValid) {
      dispatch(setUser(values)).then(response => {
        callback(response);
      });
      setLoading(true);
      setDisabled(true);
    }
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
    isloading,
    setLoading,
    setDisabled,
    isDisabled,
  };
};

export default useForm;
