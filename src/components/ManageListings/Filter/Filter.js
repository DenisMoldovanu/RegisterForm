import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getRegions, getCities, getCategories } from "redux/action-creators";
import { types } from "redux/action-types";
import Button from "../../FormElements/Button";
import InputGroup from "../../FormElements/InputGroup";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faUndoAlt } from "@fortawesome/free-solid-svg-icons";
import {
  selectsOptions,
  resetSelectsDefault,
  setSelectItems,
  theme,
  customSelectStyles,
  setOptions,
  renderDropdownIndicator,
} from "../../helpers";
import classNames from "classnames";

const Filter = props => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const [selects, setSelects] = useState([...selectsOptions]);
  const countries = useSelector(state => state.countries);

  // Get list of countries and categories
  useEffect(() => {
    handleUseReduxAction(getCategories, "CATEGORIES", "category_id", "id", "title");
    if (countries?.length > 0) {
      let seletOptions = setOptions(countries, "s_country", "pk_c_code", "s_name", selects);
      setSelects([...seletOptions]);
    } else {
      handleUseReduxAction(getCountries, "COUNTRIES", "s_country", "pk_c_code", "s_name");
    }
    setForm({});
    resetSelectsDefault(["s_country", "category_id", "s_city", "premium", "active", "block", "spam"]);
    setSelects([...selectsOptions]);
  }, []);

  // Get list of regions and cities
  useEffect(() => {
    if (form?.country !== "Country" && form?.country) {
      handleUseReduxAction(getRegions, "REGIONS", "s_region", "pk_i_id", "s_name", form.country);
    }
    if (form?.region !== "Region" && form?.region) {
      let pKCode = selects.filter(item => item.name === "s_region");
      handleUseReduxAction(getCities, "CITIES", "s_city", "pk_i_id", "s_name", pKCode[0]?.selected?.value);
    }
  }, [form.country, form.region]);

  // Dispatch redux action
  const handleUseReduxAction = (action, type, name, id, title, params = null) => {
    dispatch(action(params)).then(res => {
      if (res.type === types[`GET_${type}_SUCCESS`] && res.payload.data.length > 0) {
        if (selects.length > 0) {
          let seletOptions = setOptions(res.payload.data, name, id, title, selects);
          setSelects([...seletOptions]);
        }
      }
    });
  };

  // change form filter values
  const handleOnChange = e => {
    const name = e?.target ? e?.target?.name : e?.name;

    const value = e?.target ? e.target.value : e.value;

    let items = selects;

    const index = name !== "email" && items.findIndex(select => select.name === name);

    let changeForm = form,
      selected;

    if (name !== "email") {
      selected = items[index]["options"].filter(item => item.value === value);

      items[index]["selected"] = {
        value: value,
        label: selected[0].label,
      };
    }

    // Verify form attribute value
    const verifyAttr = (value, name) => {
      if (!value || value === "Country" || value === "Region" || value === "City") {
        delete changeForm[name];
      } else {
        changeForm[name] = value;
      }
    };

    switch (name) {
      case "s_country":
        verifyAttr(value, "country");
        delete changeForm.region;
        delete changeForm.city;
        items = setSelectItems(items, [
          { name: "s_region", title: "Region" },
          { name: "s_city", title: "City" },
        ]);
        break;

      case "s_region":
        verifyAttr(selected[0].label, "region");
        delete changeForm.city;
        items = setSelectItems(items, [{ name: "s_city", title: "City" }]);
        break;

      case "s_city":
        verifyAttr(selected[0].label, "city");
        break;

      default:
        if (value === '') {
          delete changeForm[name];
        } else {
          changeForm[name] = value;
        }
        break;
    }

    if (name !== "email") {
      setSelects(items);
    }

    setForm({ ...changeForm });
  };

  // Reset extended filter
  const resetForm = () => {
    resetSelectsDefault(["s_country", "category_id", "s_city", "premium", "active", "block", "spam"]);

    setSelects([...selectsOptions]);

    setForm({});

    props.resetFilter({});
  };

  return (
    <ul className='extendedFilters'>
      <li className='filter-item'>
        <InputGroup
          type='email'
          placeholder='Email'
          name='email'
          inputValue={form?.email ? form.email : ""}
          onChange={handleOnChange}
        />
      </li>
      {selects &&
        selects.length > 0 &&
        selects.map((item, index) => {
          return (
            <li
              className={classNames("filter-item", {
                doubleWidth: index === 2,
              })}
              key={index}>
              {item.title && <label>{item.title}</label>}
              <Select
                theme={theme}
                styles={customSelectStyles}
                options={item.options}
                onChange={e => handleOnChange({ ...e, name: item.name })}
                isDisabled={item.options.length > 1 ? false : true}
                className='react-select'
                value={item.selected}
                components={{ renderDropdownIndicator }}
              />
            </li>
          );
        })}
      <li className='filter-item full'>
        <Button text='apply filter' onClick={() => props.submitForm(form)}>
          <FontAwesomeIcon icon={faCheckSquare} style={{ marginLeft: "10px" }} />
        </Button>
        <Button text='reset filter' btnClass='outline' onClick={resetForm}>
          <FontAwesomeIcon icon={faUndoAlt} style={{ marginLeft: "10px" }} />
        </Button>
      </li>
    </ul>
  );
};

export default Filter;
