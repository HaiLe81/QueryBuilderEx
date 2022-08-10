import React, { useMemo, useEffect, useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const parseOptions = (options) => {
  if (!options) return [];
  return options.map((el) => ({ value: el.value, label: el.title }));
};

const Wrapper = styled.div`
  z-index: 999;
`;

export function ReactSelect({
  value, setValue, asyncFetch, ...props
}) {
  const [listOption, setListOption] = useState([]);

  useEffect(() => {
    if (!asyncFetch) return;
    async function getListOption() {
      const res = await asyncFetch();
      setListOption(res.values);
    }
    getListOption();
  }, [asyncFetch]);

  const initialValue = useMemo(() => {
    if (!value || !listOption?.length) return null;
    return parseOptions(listOption).find(
      (el) => el.value === value,
    );
  }, [listOption, value]);

  return (
    <Wrapper>
      <Select
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        options={parseOptions(listOption)}
        value={initialValue}
        onChange={(el) => setValue(el.value)}
      />
    </Wrapper>
  );
}

ReactSelect.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    title: PropTypes.string,
  })),
  asyncFetch: PropTypes.func,
};

ReactSelect.defaultProps = {
  value: undefined,
  options: [],
  asyncFetch: null,
};

export default ReactSelect;
