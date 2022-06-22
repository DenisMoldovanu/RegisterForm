import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUser, logOut } from '../redux/action-creators';
import Button from './FormElements/Button';
import Avatar from '../assets/img/avatar.jpg';
import { translate } from './helpers/translate';
import { NavLink } from 'react-router-dom';

const ProfileBanner = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    !user?.pk_i_id && dispatch(getUser());
  }, []);

  const { s_name, s_first_name, s_email } = user;

  const handleLogOut = () => {
    dispatch(logOut());
  }

  return (
    <div className="profile-banner">
      <div className="profile-info">
        <div className="avatar">
          <img src={Avatar} alt="avatar" />
          <NavLink to="/edit">
            <div className="edit-btn">
              <FontAwesomeIcon icon={faPen} />
            </div>
          </NavLink>
        </div>
        <div className="profile-description">
          {(s_first_name || s_name) && (
            <h2>
              {s_first_name && s_first_name + ' '}
              {s_name && s_name}
            </h2>
          )}
          {s_email && <p>{s_email}</p>}
        </div>
      </div>
      <Button text={translate('logOut')} btnClass="log-out outline" onClick={handleLogOut}>
        <FontAwesomeIcon icon={faExternalLinkAlt} />
      </Button>
    </div>
  );
};

export default ProfileBanner;
