const Button = (props) => {
    const { btnClass, onClick, text, children, disabled } = props;
    return (
      <button className={`btn ${btnClass}`} onClick={onClick} disabled={disabled}>
        {text}
        {children}
      </button>
    );
  };
  
  export default Button;
  