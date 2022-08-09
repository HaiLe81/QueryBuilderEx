/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useMemo, useCallback } from 'react';
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
} = QbUtils;

const InitialConfig = AntdConfig;

function QueryForm({ config, loadedInitLogic }) {
  const initLogic = useMemo(() => (loadedInitLogic && Object.keys(loadedInitLogic).length > 0
    ? loadedInitLogic
    : undefined), [loadedInitLogic]);

  const initTree = useMemo(() => checkTree(
    loadFromJsonLogic(initLogic, config),
    config,
  ), [initLogic, config]);

  const [state, setState] = useState({
    tree: initTree,
    config,
  });

  const onChange = useCallback((immutableTree, configForm, actionMeta) => {
    if (!actionMeta) return;
    setState((prevState) => ({ ...prevState, tree: immutableTree, config: configForm }));
  }, []);

  const renderBuilder = (props) => (
    <div className="query-builder-container">
      <div className="query-builder qb-lite">
        <Builder {...props} />
      </div>
    </div>
  );

  const onReaderLoad = (e) => {
    const uploadFileValue = checkTree(
      loadFromJsonLogic(JSON.parse(e.target.result), config),
      config,
    );
    setState((prevState) => ({ ...prevState, tree: uploadFileValue }));
  };

  const onChangeSpelJson = (e) => {
    const reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(e.target.files[0]);
  };

  return (
    <div>
      <Query
        {...config}
        value={state.tree}
        onChange={onChange}
        renderBuilder={renderBuilder}
      />
      <div className="query-import-spel">
        Import JSON Rules:
        <input type="file" name="file" onChange={onChangeSpelJson} />
      </div>

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
          Json Rules:
          {' '}
          <pre>
            {/* {JSON.stringify(jsonLogicFormat(state.tree, state.config))} */}
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
  loadedInitLogic: PropTypes.shape({}),
};

QueryForm.defaultProps = {
  config: { ...InitialConfig },
  loadedInitLogic: null,
};

export default QueryForm;
