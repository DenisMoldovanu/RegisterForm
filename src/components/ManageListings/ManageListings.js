import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import Filter from "./Filter";
import Button from "../FormElements/Button";
import InputGroup from "../FormElements/InputGroup";
import classNames from "classnames";
import { confirmAlert } from "react-confirm-alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faEye,
  faPlay,
  faSortDown,
  faSortUp,
  faBriefcase,
  faFileExport,
  faStopCircle,
  faChevronLeft,
  faChevronRight,
  faPlus,
  faCheck,
  faSearch,
  faEllipsisV,
  faBars,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";
import { getAds, archiveAd, activateAd, deactivateAd, deleteAd } from "redux/action-creators";
import { tableHeaderRowItems, bulkActions, listings, theme, customSelectStyles } from "../helpers";
import { translate } from "../helpers/translate";
import { types } from "redux/action-types";

// Hook
function usePrevious(value) {
  const ref = useRef();
  // Store current fitler value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

const ManageListings = () => {
  const dispatch = useDispatch();
  const ads = useSelector(state => state.ads.data);
  const current_page = useSelector(state => state.current_page);
  const links = useSelector(state => state.links);
  const [filter, setFilter] = useState({ perPage: 10, page: 1 });
  const [showFilter, setShowFilter] = useState(false);
  const [bulkAction, setBulkAction] = useState(false);
  const [adsToDelete, setAdsToDelete] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [perPage, setPerPage] = useState({ value: 10, label: "Listings" });
  const prevFilter = usePrevious(filter);

  useEffect(() => {
    // Verify prevFilter statement with the current one to don't do multiple API calls
    if (JSON.stringify(prevFilter) !== JSON.stringify(filter)) {
      setIsSubmitting(true);
      dispatch(getAds(filter)).then(res => {
        if (res.type === types.GET_ADS_SUCCESS) {
          if (parseInt(filter.page) > parseInt(res.payload.data.last_page)) {
            handleSetFilter({ page: 1 });
          }
        }
        setTimeout(() => {
          setIsSubmitting(false);
        }, 200);
      });
    }
  }, [filter]);

  // Sort by one column in table
  const sortBy = (name, sortDirection) => {
    handleSetFilter({
      orderBy: name,
      orderDirection: sortDirection === false ? "asc" : "desc",
    });
    const activeIndex = tableHeaderRowItems.findIndex(item => item.name === name);
    const index = tableHeaderRowItems.findIndex(item => item.sortDirection === true);
    if (index !== -1 && index !== activeIndex) {
      tableHeaderRowItems[index]["sortDirection"] = false;
    }
  };

  // Archivate / Unarchivate ads
  const handlePostAdToArchive = (id, archive) => {
    let body = { value: parseInt(archive) === 0 ? 1 : 0 };
    dispatch(archiveAd(id, body)).then(() => {
      handleGetAds();
    });
  };

  // Activate / Deactivate ads
  const handleActivateDeactivateAd = async (id, active) => {
    parseInt(active) === 0 ? await dispatch(activateAd(id)) : dispatch(deactivateAd(id));
    handleGetAds();
  };

  // Get Ads
  const handleGetAds = () => {
    setIsSubmitting(true);
    dispatch(getAds(filter)).then(() => {
      setIsSubmitting(false);
    });
  };

  // Select all Ads from current page
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      ads.map(item => {
        if (!adsToDelete.includes(item.pk_i_id)) {
          setAdsToDelete(adsToDelete => {
            return [...adsToDelete, item.pk_i_id];
          });
        }
      });
    } else {
      setAdsToDelete([]);
    }
  };

  // Select single Ads
  const handleSelectByOne = pk_i_id => {
    if (adsToDelete.includes(pk_i_id)) {
      setSelectAll(false);
      const index = adsToDelete.findIndex(item => item === pk_i_id);
      adsToDelete.splice(index, 1);
      setAdsToDelete(ads => {
        return [...ads];
      });
    } else {
      setAdsToDelete(adsToDelete => {
        return [...adsToDelete, pk_i_id];
      });
    }
  };

  // Delete single / multiple Ads
  const handleDeleteAds = async (type = null, id = null, name = null) => {
    confirmAlert({
      title: name !== null ? translate("confirmToDelete") + ` ${name}?` : translate("confirmToDeleteList"),
      buttons: [
        {
          label: translate("yes"),
          onClick: async () => {
            setIsSubmitting(true);
            if (type == "single") {
              await dispatch(deleteAd(id));
            } else {
              for (let i = 0; i < adsToDelete.length; i++) {
                await dispatch(deleteAd(adsToDelete[i]));
              }
              setAdsToDelete([]);
              setSelectAll(false);
            }
            handleGetAds();
          },
        },
        {
          label: translate("no"),
        },
      ],
    });
  };

  // Set page
  const handleChangePage = link => {
    let page = parseInt(link.label);
    switch (link.label) {
      case "pagination.next":
        page = current_page + 1;
        break;
      case "pagination.previous":
        page = current_page - 1;
        break;
    }
    handleSetFilter({ page });
  };

  // Set filter
  const handleSetFilter = newFilter => {
    setFilter(prevFilter => {
      return {
        ...prevFilter,
        ...newFilter,
      };
    });
  };

  // Reset filter
  const handleResetFilter = () => {
    let filters = {
      perPage: perPage.value,
      page: current_page,
    };
    if (filter.q) {
      filters.q = filter.q;
    }
    setFilter(filters);
  };

  // Remove one key from filter oject
  const removeFilterKey = key => {
    const filtered = Object.keys(filter)
      .filter(key1 => key1 !== key)
      .reduce((obj, key) => {
        obj[key] = filter[key];
        return obj;
      }, {});
    setFilter(filtered);
  };

  // Add extended filter to request
  const handleSubmitForm = newFilter => {
    handleResetFilter();
    handleSetFilter(newFilter);
  };

  // Handle for input change
  const handleOnChange = e => {
    if (!e.target.value) {
      removeFilterKey("q");
    } else {
      handleSetFilter({ q: e.target.value });
    }
  };

  // Redirect to the editing page
  const handleRedirect = (id, type) => {
    const domain = window.location.origin;
    switch (type) {
      case "edit":
        window.location.href = domain + "/inserat-aufgeben" + `?id=${id}`;
        break;
      case "view":
        window.location.href = domain + id;
        break;
      default:
        window.location = domain;
        break;
    }
  };

  return (
    <div className='profile-container manage-listings'>
      <div className='filter'>
        <a href='http://git_evodi@evodi.creativsoft.md/inserat-aufgeben' className='btn add'>
          {translate("addNew")}
          <FontAwesomeIcon icon={faPlus} style={{ marginLeft: "5px" }} />
        </a>
        <ul className='filter-list'>
          <li className='filter-list-item'>
            <Select
              name='bulkAction'
              theme={theme}
              styles={customSelectStyles}
              defaultValue={bulkActions[0]}
              activeValue={bulkActions[0]}
              options={bulkActions}
              onChange={item => {
                item.value === "delete" ? setBulkAction(true) : setBulkAction(false);
              }}
              className='react-select'
            />
            <Button
              btnClass='append ml'
              onClick={handleDeleteAds}
              disabled={bulkAction === true && adsToDelete.length > 0 ? false : true}>
              <FontAwesomeIcon icon={faCheck} style={{ width: ".8em" }} className='disabled' />
            </Button>
          </li>
          <li className='filter-list-item'>
            <Select
              name='listings'
              theme={theme}
              styles={customSelectStyles}
              defaultValue={listings[0]}
              activeValue={listings[0]}
              options={listings}
              value={perPage}
              onChange={item => {
                setPerPage({ value: item.value, label: item.label });
                handleSetFilter({ perPage: item.value });
              }}
              className='react-select'
            />
          </li>
          <li className='filter-list-item'>
            <InputGroup>
              <div className='append'>
                <input
                  type='text'
                  name='q'
                  placeholder={translate("search")}
                  style={{ maxWidth: "145px" }}
                  value={filter?.q ? filter?.q : ""}
                  onChange={handleOnChange}
                />
                <FontAwesomeIcon icon={faSearch} style={{ width: ".8em", cursor: "pointer" }} />
              </div>
            </InputGroup>
          </li>
          <li className='filter-list-item'>
            <Button
              text={showFilter === false ? translate("showFilter") : translate("hideFilter")}
              btnClass={`hide ${!showFilter && "outline"}`}
              onClick={() => {
                handleResetFilter();
                setShowFilter(!showFilter);
              }}>
              <FontAwesomeIcon
                icon={faEllipsisV}
                style={{
                  marginLeft: "10px",
                }}
              />
              <FontAwesomeIcon icon={faBars} />
            </Button>
          </li>
        </ul>
        {showFilter && <Filter submitForm={handleSubmitForm} resetFilter={handleResetFilter} />}
      </div>
      <div className='table'>
        {isSubmitting && (
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
        )}
        <div className='table-body'>
          <div className='table-row'>
            {tableHeaderRowItems.map(item => {
              return (
                <div
                  className='table-th'
                  key={item.id}
                  onClick={
                    item?.name
                      ? () => {
                          sortBy(item.name, item.sortDirection);
                          item.sortDirection = !item.sortDirection;
                        }
                      : null
                  }
                  style={{ cursor: item.name ? "pointer" : "text" }}>
                  <div className='title'>
                    {item.name == "check" ? (
                      <input type='checkbox' onChange={handleSelectAll} checked={selectAll === false ? false : true} />
                    ) : (
                      item.title
                    )}
                    {item.arrow && (
                      <>
                        <FontAwesomeIcon
                          icon={!item?.sortDirection ? faSortDown : faSortUp}
                          style={{
                            marginBottom: !item?.sortDirection ? "4px" : "",
                            marginLeft: "4px",
                            marginTop: item?.sortDirection ? "4px" : "",
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {ads &&
            ads.length > 0 &&
            ads.map((item, index) => {
              return (
                <div
                  className={classNames("table-row", {
                    archived: item.b_arhive === 1,
                  })}
                  key={`${item.pk_i_id}${index}`}>
                  <div className='table-td'>
                    <div className='item'>
                      <input
                        type='checkbox'
                        checked={adsToDelete.includes(item.pk_i_id) ? true : false}
                        onChange={() => handleSelectByOne(item.pk_i_id)}
                      />
                    </div>
                  </div>
                  <div className='table-td'>
                    <div className='item'>{item.pk_i_id}</div>
                  </div>
                  <div className='table-td'>
                    <div className='item'>{item.s_title}</div>
                  </div>
                  <div className='table-td'>
                    <div className='item'>{item.s_contact_name}</div>
                  </div>
                  <div className='table-td'>
                    <div className='item'>{item.s_location_country_name}</div>
                  </div>
                  <div className='table-td'>
                    <div className='item'>{item.s_location_country_name}</div>
                  </div>
                  <div className='table-td'>
                    <div className='item'>{item.dt_pub_date}</div>
                  </div>
                  <div className='table-td'>
                    <div className='item'>{item.b_active === 0 ? "Inactive" : "Active"}</div>
                  </div>
                  <div className='table-td'>
                    <div className='item'>
                      <div className='icon-box' onClick={() => handleRedirect(item.pk_i_id, "edit")}>
                        <FontAwesomeIcon icon={faPen} />
                        <div className='pop-up'>{translate("edit")}</div>
                      </div>
                      <div className='icon-box' onClick={() => handleDeleteAds("single", item.pk_i_id, item.s_title)}>
                        <FontAwesomeIcon icon={faTrash} />
                        <div className='pop-up'>{translate("delete")}</div>
                      </div>
                      <div className='icon-box'>
                        <FontAwesomeIcon icon={faEye} onClick={() => handleRedirect(item.slug, "view")} />
                        <div className='pop-up'>{translate("view")}</div>
                      </div>
                      <div className='icon-box' onClick={() => handleActivateDeactivateAd(item.pk_i_id, item.b_active)}>
                        <FontAwesomeIcon icon={parseInt(item.b_active) === 0 ? faPlay : faStopCircle} />
                        <div className='pop-up'>
                          {parseInt(item.b_active) === 0 ? translate("activate") : translate("deactivate")}
                        </div>
                      </div>
                      <div className='icon-box' onClick={() => handlePostAdToArchive(item.pk_i_id, item.b_arhive)}>
                        <FontAwesomeIcon icon={parseInt(item.b_arhive) === 0 ? faBriefcase : faFileExport} />
                        <div className='pop-up'>
                          {parseInt(item.b_arhive) === 0 ? translate("archive") : translate("unarchive")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {ads && ads.length === 0 ? <p className='warning'>{translate("noAdsMsg")}</p> : null}
      {links && links.length > 3 ? (
        <div className='pagination-parent'>
          <ul className='pagination'>
            <li
              className={classNames("pagination-item", {
                disabled: links[0].url === null,
              })}
              onClick={links[0].url !== null ? () => handleChangePage(links[0]) : null}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </li>
            {links.map((link, index) => {
              if (index === 0 || index === links.length - 1) {
                return null;
              }
              return (
                <li
                  className={classNames("pagination-item", {
                    active: link.active === true,
                  })}
                  onClick={parseInt(link.label) !== current_page ? () => handleChangePage(link) : null}
                  key={index}>
                  {link.label}
                </li>
              );
            })}
            <li
              className={classNames("pagination-item", {
                disabled: links[links.length - 1].url === null,
              })}
              onClick={links[links.length - 1].url !== null ? () => handleChangePage(links[links.length - 1]) : null}>
              <FontAwesomeIcon icon={faChevronRight} />
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default ManageListings;
