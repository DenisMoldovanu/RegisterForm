import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCountries, getUser, updateUserProfile, getRegions, getCities } from "redux/action-creators";
import {
  faUser,
  faPhone,
  faEnvelope,
  faGlobe,
  faPenAlt,
  faMapMarkerAlt,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  selectsOptions,
  setOptions,
  setSelectItems,
  setObj,
  locationOptions,
  theme,
  renderDropdownIndicator,
  customSelectStyles,
} from "../../helpers/index";
import { translate } from "components/helpers/translate";
import InputGroup from "../../FormElements/InputGroup";
import Select from "react-select";
import Button from "../../FormElements/Button";
import { types } from "redux/action-types";
import { confirmAlert } from "react-confirm-alert";
import { useNavigate } from "react-router-dom";

const ProfileForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const countries = useSelector(state => state.countries);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({ ...locationOptions });
  const [form, setForm] = useState();

  useEffect(() => {
    (async function () {
      setIsSubmitting(true);

      const countryList =
        countries.length > 0
          ? countries
          : await dispatch(getCountries()).then(res => {
              if (res.type === types.GET_COUNTRIES_SUCCESS && res.payload.data.length > 0) {
                return res.payload.data;
              }
            });

      if (user?.pk_i_id) {
        setDefaultFormData(user, countryList);
      } else {
        await dispatch(getUser()).then(response => {
          if (response.type === types.GET_USER_SUCCESS) {
            setDefaultFormData(response.payload.data, countryList);
          }
        });
      }
    })();

    return () => {
      setSelectItems(selectsOptions, [
        { name: "s_region", title: "Region" },
        { name: "s_city", title: "City" },
      ]);
    };
  }, []);

  const setDefaultFormData = async (user, countries) => {
    let id;

    setForm(form => {
      return {
        ...form,
        s_first_name: user?.s_first_name,
        s_name: user?.s_name,
        s_email: user?.s_email,
        s_phone_mobile: user?.s_phone_mobile,
        s_phone_land: user?.s_phone_land,
        s_website: user?.s_website,
        s_country: user?.s_country,
        s_region: user?.s_region,
        s_city: user?.s_city,
        s_city_area: user?.s_city_area,
        s_zip: user?.s_zip,
        s_address: user?.s_address,
        fk_c_country_code: "",
        fk_i_region_id: "",
        fk_i_city_id: "",
        s_info: user?.info?.s_info,
      };
    });

    // Set new arrays for react selects using user default info
    setOptions(countries, "s_country", "pk_c_code", "s_name", selectsOptions);

    if (user?.s_country && countries?.length > 0) {
      id = handleSetSelected("s_country", countries, "pk_c_code", user);

      const regions = await dispatch(getRegions(id)).then(res => {
        if (res.type === types.GET_REGIONS_SUCCESS && res.payload.data.length > 0) {
          return res.payload.data;
        }
      });

      if (user?.s_region && regions?.length > 0) {
        setOptions(regions, "s_region", "pk_i_id", "s_name", selectsOptions);
        id = handleSetSelected("s_region", regions, "pk_i_id", user);

        const cities = await dispatch(getCities(id)).then(res => {
          if (res.type === types.GET_CITIES_SUCCESS && res.payload.data.length > 0) {
            return res.payload.data;
          }
        });

        if (cities?.length > 0) {
          setOptions(cities, "s_city", "pk_i_id", "s_name", selectsOptions);
          user?.s_city && handleSetSelected("s_city", cities, "pk_i_id", user);
        }
      }
    }
    setIsSubmitting(false);
  };

  // set selected options using created arrays of objects with { value: '', label: '' }
  const handleSetSelected = (type, array, id, user) => {
    let index = array.filter(item => item.s_name === user[type]);

    setSelectedOptions(items => {
      return {
        ...items,
        [type]: {
          value: index?.[0]?.[id],
          label: user[type],
        },
      };
    });
    return index?.[0]?.[id];
  };

  // update user profile data
  const submitProfileForm = e => {
    setIsSubmitting(true);

    dispatch(updateUserProfile(form)).then(res => {
      if (res.type === types.UPDATE_USER_PROFILE_SUCCESS) {
        handleConfirmAlert(translate("updateProfileSuccessMsg"));
      } else {
        handleConfirmAlert(translate("updateProfileErrorMsg"));
      }
      setIsSubmitting(false);
    });
  };

  const handleConfirmAlert = title => {
    confirmAlert({
      title: title,
      buttons: [
        {
          label: translate("close"),
          onClick: () => {
            navigate("/");
          },
        },
      ],
      onClickOutside: () => {
        navigate("/");
      },
    });
  };

  // input handle on change
  const handleOnChange = async e => {
    const { name, value } = e.target || "";
    const changeForm = form;
    changeForm[name] = value !== "" ? value : null;
    setForm(form => {
      return { ...form, ...changeForm };
    });
  };

  // select handle on change
  const handleOnChangeSelect = async e => {
    const { value, label, name } = e;
    const options = selectedOptions;
    const changeForm = form;
    const rIndex = selectsOptions.findIndex(item => item.name === "s_region");
    const cIndex = selectsOptions.findIndex(item => item.name === "s_city");
    let items;

    // set selected options for s_country, s_region and s_city
    switch (name) {
      case "s_country":
        // Update state of selected country and get the regions for it
        selectsOptions[cIndex]["options"] = [setObj("City")];
        await dispatch(getRegions(value)).then(res => {
          if (res.type === types.GET_REGIONS_SUCCESS && res?.payload?.data?.length > 0) {
            items = setOptions(res.payload.data, "s_region", "pk_i_id", "s_name", selectsOptions);
            // Set select s_region options with the new ones
            selectsOptions[rIndex]["options"] = items[rIndex]["options"];
          } else {
            // If no regions commes, set select options to default
            selectsOptions[rIndex]["options"] = [setObj("Region")];
          }
        });

        changeForm.s_country = value !== "" ? label : "";
        changeForm.s_region = "";
        changeForm.s_city = "";

        // update state options
        options.s_region = setObj("Region");
        options.s_city = setObj("City");
        break;

      case "s_region":
        // Update state of selected region and get the cities for it
        await dispatch(getCities(value)).then(res => {
          if (res.type === types.GET_CITIES_SUCCESS && res.payload.data.length > 0) {
            items = setOptions(res.payload.data, "s_city", "pk_i_id", "s_name", selectsOptions);
            selectsOptions[cIndex]["options"] = items[cIndex]["options"];
          } else {
            selectsOptions[cIndex]["options"] = [setObj("City")];
          }
        });

        changeForm.s_region = value !== "" ? label : "";
        changeForm.s_city = "";

        options.s_city = setObj("City");
        break;

      case "s_city":
        changeForm.s_city = value !== "" ? label : "";
        break;
    }

    // Update form data
    setForm(prevFormData => {
      return {
        ...prevFormData,
        ...changeForm,
      };
    });

    // Update state of selected options
    setSelectedOptions(items => {
      return {
        ...items,
        ...options,
        [name]: {
          value: value,
          label: label,
        },
      };
    });
  };

  const profileInfoRows = [
    {
      id: 0,
      class: "edit-profile-row two",
      title: <h2 className='title'>{translate("contactInfo")}</h2>,
      children: [
        {
          id: 0,
          name: "s_first_name",
          label: translate("firstName"),
          value: form?.s_first_name,
          icon: faUser,
        },
        {
          id: 1,
          name: "s_name",
          label: translate("name"),
          value: form?.s_name,
          icon: faUser,
        },
      ],
    },
    {
      id: 1,
      class: "edit-profile-row two",
      children: [
        {
          id: 0,
          type: "email",
          name: "s_email",
          label: translate("email"),
          value: form?.s_email,
          icon: faEnvelope,
          disabled: true,
        },
        {
          id: 1,
          name: "s_phone_mobile",
          label: translate("cellPhone"),
          value: form?.s_phone_mobile,
          icon: faPhone,
        },
      ],
    },
    {
      id: 2,
      class: "edit-profile-row two",
      children: [
        {
          id: 0,
          name: "s_phone_land",
          label: translate("phone"),
          value: form?.s_phone_land,
          icon: faPhone,
        },
        {
          id: 1,
          name: "s_website",
          label: translate("website"),
          value: form?.s_website,
          icon: faGlobe,
        },
      ],
    },
    {
      id: 3,
      class: "edit-profile-row",
      title: <h2 className='title marginTop'>{translate("about")}</h2>,
      children: [
        {
          id: 0,
          label: translate("additionalInfo"),
          columnWidth: "double",
          icon: faPenAlt,
          child: {
            type: "textarea",
            name: "s_info",
            value: form?.s_info,
          },
        },
      ],
    },
    {
      id: 4,
      class: "edit-profile-row two",
      title: <h2 className='title marginTop'>{translate("location")}</h2>,
      children: [
        {
          id: 0,
          label: translate("country"),
          child: {
            type: "select",
            name: "s_country",
            select: selectsOptions.filter(item => item.name === "s_country")[0],
          },
        },
        {
          id: 1,
          label: translate("region"),
          child: {
            type: "select",
            name: "s_region",
            select: selectsOptions.filter(item => item.name === "s_region")[0],
          },
        },
      ],
    },
    {
      id: 5,
      class: "edit-profile-row two",
      children: [
        {
          id: 0,
          label: translate("city"),
          child: {
            type: "select",
            name: "s_city",
            select: selectsOptions.filter(item => item.name === "s_city")[0],
          },
        },
        {
          id: 1,
          name: "s_city_area",
          label: translate("cityArea"),
          value: form?.s_city_area,
          icon: faMapMarkerAlt,
        },
      ],
    },
    {
      id: 6,
      class: "edit-profile-row two",
      children: [
        {
          id: 0,
          name: "s_address",
          label: translate("address"),
          value: form?.s_address,
          icon: faMapMarkerAlt,
        },
        {
          id: 1,
          name: "s_zip",
          label: translate("zipCode"),
          value: form?.s_zip,
          icon: faEnvelope,
        },
      ],
    },
  ];

  return (
    <React.Fragment>
      <form onSubmit={submitProfileForm}>
        {isSubmitting === true ? (
          <div className='loading'>
            <FontAwesomeIcon
              icon={faCircleNotch}
              spin
              style={{
                marginLeft: 5,
                color: "#AC8E56",
                width: "2em",
                height: "2em",
                marginBottom: "1pt",
              }}
              rotation={90}
            />
          </div>
        ) : null}
        {profileInfoRows.map(row => {
          return (
            <div key={row.id}>
              {row.title && row.title}
              <div className={row.class}>
                {row.children.map(item => {
                  return (
                    <InputGroup
                      name={item?.name}
                      label={item?.label}
                      icon={item?.icon}
                      columnWidth={item?.columnWidth}
                      inputValue={item?.value}
                      onChange={handleOnChange}
                      key={item?.id}
                      readOnly={item?.name === "s_email" ? true : undefined}>
                      {item.child &&
                        (item.child.type === "select" ? (
                          <Select
                            theme={theme}
                            styles={customSelectStyles}
                            activeValue={item.child.select.options[0]}
                            defaultValue={item.child.select.options[0]}
                            options={item.child.select.options}
                            value={selectedOptions[item.child.name]}
                            onChange={e =>
                              handleOnChangeSelect({
                                ...e,
                                name: item.child.name,
                              })
                            }
                            isDisabled={item.child.select.options.length > 1 ? false : true}
                            className='react-select'
                            components={{ renderDropdownIndicator }}
                          />
                        ) : (
                          <textarea
                            name={item.child.name}
                            value={item.child.value ? item.child.value : ""}
                            onChange={handleOnChange}
                          />
                        ))}
                    </InputGroup>
                  );
                })}
              </div>
            </div>
          );
        })}
        <Button text={translate("updateProfile")} onClick={submitProfileForm} disabled={isSubmitting} />
      </form>
    </React.Fragment>
  );
};

export default ProfileForm;
