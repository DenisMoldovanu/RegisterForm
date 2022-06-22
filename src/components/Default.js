import { translate } from "./helpers/translate";

const handleRedirectToLogin = () => {
  setTimeout(() => {
    handleChangeLocation();
  }, 3000);
};

const handleChangeLocation = () => {
  let domain = window.location.origin;
  window.location.href = domain + "/benutzer/anmeldung";
};

const Default = () => {
  return (
    <div className='default'>
      <div id='react-confirm-alert'>
        <div className='react-confirm-alert-overlay'>
          <div className='react-confirm-alert'>
            <div className='react-confirm-alert-body'>
              <h1>{translate("unauthErr")}</h1>
              <div className='react-confirm-alert-button-group'>
                <button
                  onClick={() => {
                    handleChangeLocation();
                  }}>
                  {translate("login")}
                </button>
                {handleRedirectToLogin()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Default;
