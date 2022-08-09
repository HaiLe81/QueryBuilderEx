/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useMemo } from 'react';
import {
  Query, Builder, Utils as QbUtils,
} from 'react-awesome-query-builder';
import PropTypes from 'prop-types';

import AntdConfig from 'react-awesome-query-builder/lib/config/antd';
import 'antd/dist/antd.min.css';
import 'react-awesome-query-builder/lib/css/styles.css';

const {
  jsonLogicFormat,
  queryString,
  mongodbFormat,
  sqlFormat,
  checkTree,
  loadFromJsonLogic,
  loadTree,
} = QbUtils;

const InitialConfig = AntdConfig;

const emptyJsonTree = {
  id: QbUtils.uuid(),
  type: 'group',
};

function QueryForm({ config, initValue }) {
  const initTree = useMemo(() => ((initValue && Object.keys(initValue).length) ? checkTree(
    loadFromJsonLogic(initValue, config),
    config,
  ) : checkTree(loadTree(emptyJsonTree), config)), [initValue, config]);

  const [state, setState] = useState({
    tree: initTree,
    config,
  });

  const onChange = (immutableTree, configForm) => {
    setState((prevState) => ({ ...prevState, tree: immutableTree, config: configForm }));
  };

  const renderBuilder = (props) => (
    <div className="query-builder-container">
      <div className="query-builder qb-lite">
        <Builder {...props} />
      </div>
    </div>
  );

  return (
    <div>
      <Query
        {...config}
        value={state.tree}
        onChange={onChange}
        renderBuilder={renderBuilder}
      />

      <div className="query-builder-result">
        <div>
          Query string:
          {' '}
          <pre>{JSON.stringify(queryString(state.tree, state.config))}</pre>
        </div>
        <div>
          MongoDb query:
          {' '}
          <pre>{JSON.stringify(mongodbFormat(state.tree, state.config))}</pre>
        </div>
        <div>
          SQL where:
          {' '}
          <pre>{JSON.stringify(sqlFormat(state.tree, state.config))}</pre>
        </div>
        <div>
          Json Rules::
          {' '}
          <pre>
            {JSON.stringify(
              jsonLogicFormat(state.tree, state.config).logic,
              undefined,
              2,
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}

QueryForm.propTypes = {
  config: PropTypes.shape({}),
  initValue: PropTypes.shape({}),
};

QueryForm.defaultProps = {
  config: { ...InitialConfig },
  initValue: null,
};

export default QueryForm;
