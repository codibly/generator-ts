import { useMultiSelect } from '@codibly/react-controls-hook';
import { FormGroup } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import * as React from 'react';
import { FunctionComponent, ReactNode } from 'react';

export namespace DataTableEnumFilter {
  export type Option = {
    label: ReactNode;
    value: any;
  };
  export type Config = {
    options: Option[];
    single?: boolean;
  };
  export type Schema = {
    type: 'enum';
    config: Config;
  };
  export type Props = {
    config: Config;
    value?: any[];
    onChange: (value?: any[]) => void;
  };
}

export const DataTableEnumFilter: FunctionComponent<DataTableEnumFilter.Props> = ({
  config,
  value,
  onChange
}) => {
  const { isSelected, toggle, toggleSingle } = useMultiSelect(value);

  const onToggle = (optionValue: any) => () => {
    const toggled = config.single ? toggleSingle(optionValue) : toggle(optionValue);

    onChange(toggled.length ? toggled : undefined);
  };

  return (
    <FormGroup>
      {config.options.map((option, index) => (
        <FormControlLabel
          key={index}
          control={<Checkbox checked={isSelected(option.value)} onClick={onToggle(option.value)} />}
          label={option.label}
        />
      ))}
    </FormGroup>
  );
};
