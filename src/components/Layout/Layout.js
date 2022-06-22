import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookie from "js-cookie";
import ProfileBanner from "../ProfileBanner";
import Menu from "../Menu";
import { matchPath } from "react-router";
const privateRoutes = ["/", "/profile", "/edit", "/manage-listings"];

const Layout = props => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    var url = new URL(window.location.href);
    var access_token = url.searchParams.get("token");

    if (window.location.href.indexOf("token") > -1) {
      navigate(`/reset-password/${access_token}`);
      return;
    }

    if (
      (!Cookie.get("token") && location.pathname == "/") ||
      (!Cookie.get("token") && privateRoutes.includes(location.pathname))
    ) {
      navigate("/login");
      return;
    }

    if (
      (Cookie.get("token") && location.pathname == "/") ||
      (Cookie.get("token") && !privateRoutes.includes(location.pathname))
    ) {
      navigate("/profile");
      return;
    }
  }, []);

  return (
    <div className='wrapper min_height'>
      {Cookie.get("token") && (
        <>
          <ProfileBanner />
          <Menu />
        </>
      )}
      {props.children}
    </div>
  );
};

export default Layout;
