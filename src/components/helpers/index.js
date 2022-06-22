import { components } from 'react-select';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { translate } from './translate';

export const setObj = (label) => {
  return {
    value: '',
    label: label,
  };
};

export const locationOptions = {
  s_country: setObj('Country'),
  s_region: setObj('Region'),
  s_city: setObj('City'),
};

export const tableHeaderRowItems = [
  {
    id: 0,
    name: 'check',
  },
  {
    id: 1,
    title: translate('id'),
    name: 'pk_i_id',
    sortDirection: false,
    arrow: true,
  },
  {
    id: 2,
    title: translate('title'),
    name: 's_title',
    sortDirection: false,
    arrow: true,
  },
  {
    id: 3,
    title: translate('username'),
    name: 's_contact_name',
    sortDirection: false,
    arrow: true,
  },
  {
    id: 4,
    title: translate('adsLocation'),
    name: 's_location_country_name',
    sortDirection: false,
    arrow: true,
  },
  {
    id: 5,
    title: translate('adsLocation'),
    name: 's_location_country_name',
    sortDirection: false,
    arrow: true,
  },
  {
    id: 6,
    title: translate('date'),
    name: 'dt_pub_date',
    sortDirection: false,
    arrow: true,
  },
  {
    id: 7,
    title: translate('staus'),
    name: 'b_active',
    sortDirection: false,
    arrow: true,
  },
  {
    id: 8,
    title: translate('actions'),
  },
];

export const bulkActions = [
  {
    value: '0',
    label: translate('bulkAction'),
  },
  {
    value: 'delete',
    label: translate('delete'),
  },
];

export const listings = [
  {
    value: 10,
    label: translate('listings'),
  },
  {
    value: '3',
    label: '3',
  },
  {
    value: '10',
    label: '10',
  },
  {
    value: '25',
    label: '25',
  },
  {
    value: '50',
    label: '50',
  },
  {
    value: '100',
    label: '100',
  },
];

export const pattern = [
  {
    value: 0,
    label: 'Pattern',
  },
  {
    value: 1,
    label: '0',
  },
  {
    value: 2,
    label: '1',
  },
  {
    value: 3,
    label: '2',
  },
];

export const options = [
  {
    value: '',
    label: translate('chooseOption'),
  },
  {
    value: 0,
    label: translate('no'),
  },
  {
    value: 1,
    label: translate('yes'),
  },
];

export const selectsOptions = [
  {
    name: 's_country',
    dataName: 'countries',
    options: [setObj('Country')],
    selected: [setObj('Country')],
  },
  {
    name: 's_region',
    dataName: 'regions',
    options: [setObj('Region')],
    selected: [setObj('Region')],
  },
  {
    name: 's_city',
    dataName: 'cities',
    options: [setObj('City')],
    selected: [setObj('City')],
  },
  {
    name: 'category_id',
    dataName: 'categories',
    title: translate('category'),
    options: [setObj('Category')],
    selected: [setObj('Category')],
  },
  {
    name: 'premium',
    dataName: 'options',
    title: translate('premium'),
    options: options,
    selected: options[0],
  },
  {
    name: 'active',
    dataName: 'options',
    title: translate('active'),
    options: options,
    selected: options[0],
  },
  {
    name: 'block',
    dataName: 'options',
    title: translate('block'),
    options: options,
    selected: options[0],
  },
  {
    name: 'spam',
    dataName: 'options',
    title: translate('spam'),
    options: options,
    selected: options[0],
  },
];

// Set selects options
export const setOptions = (array, name, value, label, selects) => {
  const options = [];
  const filterItems = selects;
  if(filterItems.length > 0 && array?.length > 0) {
    const index = filterItems.findIndex((item) => item.name === name);
    let item;
  
    options.push(filterItems[index]['options'][0]);
  
    array.map((item, index) => {
      let newItem = {
        value: item[value],
        label: item[label],
      };
      options[index + 1] = newItem;
    });
  
    item = {
      name: name,
      dataName: filterItems[index]['dataName'],
      options: options,
      title: filterItems[index]['title'] || '',
      selected: filterItems[index]['selected'],
    };
  
    if (name === 's_country' || name === 'category_id') {
      selectsOptions[index] = item;
    }
  
    filterItems[index] = item;
  }

  return filterItems;
};

export const resetSelectsDefault = (names) => {
  let index;
  names.map((name) => {
    index = selectsOptions.findIndex((item) => item.name === name);
    selectsOptions[index]['selected'] = selectsOptions[index]['options'][0];
  });
};

export const setSelectItems = (selects, names) => {
  let index;
  names.map((item) => {
    index = selects.findIndex((select) => select.name === item.name);
    selects[index]['selected'] = setObj(item.title);
    selects[index]['options'] = [setObj(item.title)];
  });
  return selects;
};

export const customSelectStyles = {
  option: (styles) => {
    return {
      ...styles,
      ':active': {
        backgorund: '#f7f4ee',
      },
    };
  },
};

export const theme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#f7f4ee',
    primary: '#AC8E56',
  },
});

// Set select dropdown icon
export const renderDropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <FontAwesomeIcon
        icon={faCaretDown}
        style={{ fontSize: '14px', color: '#000' }}
      />
    </components.DropdownIndicator>
  );
};