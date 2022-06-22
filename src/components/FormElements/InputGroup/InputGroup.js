import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import classNames from "classnames";

const InputGroup = props => {
  const { label, placeholder, icon, columnWidth, name, inputClass, error, disabled } = props;
  const inputValue = props?.inputValue;
  const [isFocused, setIsFocused] = useState(false);
  const type = props?.type ? props.type : "text";
  const componentIcon = icon && <FontAwesomeIcon icon={icon} onClick={props.handleIconClick} />;

  return (
    <div
      className={classNames("profile-column", {
        "double-width": columnWidth == "double",
      })}>
      <div className='input-group'>
        {label && <label>{label}</label>}
        {props?.children ? (
          <>
            {props.children}
            {componentIcon}
          </>
        ) : (
          <div className='input' onClick={() => setIsFocused(true)}>
            {props?.readOnly ? (
              <div className='readOnly'>{inputValue ? inputValue : ""}</div>
            ) : (
              <input
                className={inputClass}
                type={type}
                onChange={props.onChange}
                value={inputValue ? inputValue : ""}
                placeholder={placeholder}
                name={name}
                autoFocus={isFocused}
                onBlur={() => setIsFocused(false)}
                disabled={disabled ? true : false}
              />
            )}

            {error && <small className='error message'>{error}</small>}
            {componentIcon}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputGroup;
