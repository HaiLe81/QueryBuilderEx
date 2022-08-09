import React from 'react';

// For AntDesign widgets only:
import AntdConfig from 'react-awesome-query-builder/lib/config/antd';

import { ReactSelect } from './ReactSelect';

const InitialConfig = AntdConfig;

const operators = {
  ...InitialConfig.operators,
  valid: {
    label: 'valid',
    reversedOp: 'not_valid',
    labelForFormat: '==',
    cardinality: 1,
    formatOp: (field, _op, value, _valueSrc, _valueType, opDef) => `${field} ${opDef.labelForFormat} ${value}`,
    mongoFormatOp: (field, op, value) => ({ [field]: { $eq: value } }),
  },
  no_valid: {
    label: 'no_valid',
    reversedOp: 'valid',
    labelForFormat: '!==',
    cardinality: 1,
    formatOp: (field, _op, value, _valueSrc, _valueType, opDef) => `${field} ${opDef.labelForFormat} ${value}`,
    mongoFormatOp: (field, op, value) => ({ [field]: { $eq: value } }),
  },
};

const fields = {
  ...InitialConfig.fields,
  qty: {
    label: 'Qty',
    type: 'number',
    fieldSettings: {
      min: 0,
    },
    valueSources: ['value'],
    preferWidgets: ['number'],
  },
  cars: {
    label: 'Cars',
    type: '!group',
    mode: 'array',
    conjunctions: ['AND', 'OR'],
    showNot: true,
    operators: [
      'equal',
      'not_equal',
      'less',
      'less_or_equal',
      'greater',
      'greater_or_equal',
      'between',
      'not_between',
      'some',
      'all',
      'none',
    ],
    defaultOperator: 'some',
    initialEmptyWhere: true,

    subfields: {
      vendor: {
        type: 'select',
        fieldSettings: {
          listValues: ['Ford', 'Toyota', 'Tesla'],
        },
        valueSources: ['value'],
      },
      year: {
        type: 'number',
        fieldSettings: {
          min: 1990,
          max: 2021,
        },
        valueSources: ['value'],
      },
    },
  },
  birthDay: {
    label: 'BirthDay',
    type: 'datetime',
    valueSources: ['value'],
  },

  user: {
    type: '!struct',
    label: 'User',
    subfields: {
      name: {
        type: 'text',
        label: 'Name',
        label2: 'User name',
        fieldSettings: {
          validateValue: (val) => val.length <= 20,
        },
        operators: ['equal', 'valid', 'no_valid'],
      },
      password: {
        type: 'text',
        label: 'Password',
        label2: 'User Password',
        fieldSettings: {
          validateValue: (val) => val.length <= 20,
        },
        operators: ['equal', 'valid', 'no_valid'],
      },
    },
  },
  name: {
    label: 'name',
    label2: 'Ahihi Name ne',
    type: 'text',
    valueSources: ['value'],
    fieldSettings: {
      maxLength: 6,
      validateValue: (val) => val.length <= 6,
    },
    mainWidgetProps: {
      valueLabel: 'xxxx',
      valuePlaceholder: 'xxx here',
    },
    preferWidgets: ['value'],
    operators: ['equal', 'valid'],
  },
  price: {
    label: 'Price',
    type: 'number',
    valueSources: ['value'],
    fieldSettings: {
      min: 10,
      max: 100,
    },
    preferWidgets: ['slider', 'rangeslider'],
  },
  color: {
    label: 'Color',
    type: 'select',
    valueSources: ['value'],
    mainWidgetProps: {
      valueLabel: 'xxxx',
      valuePlaceholder: 'xxx here',
    },
    fieldSettings: {
      listValues: [
        { value: 'yellow', title: 'Yellow' },
        { value: 'green', title: 'Green' },
        { value: 'orange', title: 'Orange' },
      ],
    },
  },
  is_promotion: {
    label: 'Promo?',
    type: 'boolean',
    operators: ['equal'],
    valueSources: ['value'],
  },
};

const widgets = {
  ...InitialConfig.widgets,
  select: {
    ...InitialConfig.widgets.select,
    factory: (props) => (
      <div className="ahihi-day-ne">
        <ReactSelect
            // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
          setValue={props.setValue}
          value={props.value}
        />
      </div>
    ),
  },
};

const localeSettings = {
  addGroupLabel: 'Add group',
  addRuleLabel: 'Add rule',
  addSubRuleLabel: 'Add sub rule',
};

const settings = {
  ...InitialConfig.settings,
  ...localeSettings,
  addGroupLabel: 'Add group',
  addRuleLabel: 'Add rule',
  addSubRuleLabel: 'Add sub rule',
  maxNesting: 3,
};

const config = {
  ...InitialConfig,
  operators,
  fields,
  widgets,
  settings,
};

export default config;
