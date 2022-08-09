import React, { useMemo } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const parseOptions = (options) => {
  if (!options) return [];
  return options.map((el) => ({ value: el.value, label: el.title }));
};

const listValue = [
  {
    value: 'yellow',
    title: 'Yellow',
  },
  {
    value: 'green',
    title: 'Green',
  },
  {
    value: 'orange',
    title: 'Orange',
  },
];

export function ReactSelect({
  value, setValue, ...props
}) {
  const Wrapper = styled.div`
    z-index: 999;
  `;

  const initialValue = useMemo(() => {
    if (!value || !listValue?.length) return null;
    return parseOptions(listValue).find(
      (el) => el.value === value,
    );
  }, [listValue, value]);

  return (
    <Wrapper>
      <Select
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        options={parseOptions(listValue)}
        value={initialValue}
        onChange={(el) => setValue(el.value)}
      />
    </Wrapper>
  );
}

ReactSelect.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
};

ReactSelect.defaultProps = {
  value: undefined,
};

export default ReactSelect;
