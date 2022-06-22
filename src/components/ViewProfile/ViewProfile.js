import Group from "./Group";
import { Link } from "react-router-dom";
import { faMapMarkerAlt, faUser, faEnvelope, faPhone, faGlobe, faPenAlt } from "@fortawesome/free-solid-svg-icons";
import Button from "../FormElements/Button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "redux/action-creators";
import { translate } from "components/helpers/translate";

const ViewProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    !user?.pk_i_id && dispatch(getUser());
  });

  const { s_first_name, s_name, s_email, s_website, s_address, s_city, s_city_area, s_country, s_zip, s_phone_land } =
    user;
  const s_info = user?.info?.s_info;
  return (
    <div className='profile-container'>
      <div className='view-profile'>
        <div className='profile-row'>
          <div className='profile-column'>
            <h3 className='title'>{translate("contactInfo")}</h3>
            {(s_first_name || s_name) && (
              <Group icon={faUser} text={`${s_first_name ? s_first_name + "&nbsp;" : ""}${s_name}`} bold={true} />
            )}
            {s_email && <Group icon={faEnvelope} text={s_email} underline={true} bold={true} />}
            {s_phone_land && <Group icon={faPhone} text={s_phone_land} bold={true} />}
            {s_website && <Group icon={faGlobe} text={s_website} bold={true} />}
          </div>
          <hr />
          <div className='profile-column'>
            <h3 className='title'>{translate("location")}</h3>
            {(s_address || s_city || s_city_area || s_country || s_zip) && (
              <Group
                icon={faMapMarkerAlt}
                text={`
                  ${s_country ? s_country + "<br/>" : ""} 
                  ${s_city ? s_city + "<br/>" : ""} 
                  ${s_city_area ? s_city_area + "<br/>" : ""}  
                  ${s_address ? s_address + "<br/>" : ""} 
                  ${s_zip ? s_zip : ""}
                `}
                bold={true}
              />
            )}
          </div>
          <hr />
          <div className='profile-column'>
            <h3 className='title'>{translate("about")}</h3>
            {s_info && <Group icon={faPenAlt} text={s_info} />}
          </div>
        </div>
        <Button>
          <Link to='/edit'>edit profile</Link>
        </Button>
      </div>
    </div>
  );
};

export default ViewProfile;
