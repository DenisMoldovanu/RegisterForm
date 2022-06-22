import React from "react";
import { NavLink } from "react-router-dom";
import { translate } from "../helpers/translate";

const Menu = () => {
  return (
    <ul className='profile-menu'>
      <NavLink to='/profile' activeclassname='active' className='profile-menu-item'>
        {translate("menuFirstItem")}
      </NavLink>
      <NavLink to='/edit' activeclassname='active' className='profile-menu-item'>
        {translate("menuSecondItem")}
      </NavLink>
      <NavLink to='/manage-listings' activeclassname='active' className='profile-menu-item'>
        {translate("menuThirdItem")}
      </NavLink>
    </ul>
  );
};

export default Menu;
