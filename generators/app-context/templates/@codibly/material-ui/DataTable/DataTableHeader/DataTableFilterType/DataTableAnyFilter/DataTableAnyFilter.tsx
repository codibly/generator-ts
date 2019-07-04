import * as React from 'react';
import { FunctionComponent } from 'react';
import { DataTableEnumFilter } from '../DataTableEnumFilter/DataTableEnumFilter';

export namespace DataTableAnyFilter {
  export type Schema = DataTableEnumFilter.Schema;
  export type Props = {
    schema: Schema;
    value: any;
    onChange: (value: any) => void;
  };
}

export const DataTableAnyFilter: FunctionComponent<DataTableAnyFilter.Props> = ({
  schema,
  value,
  onChange
}) => {
  if (schema.type === 'enum') {
    return <DataTableEnumFilter config={schema.config} value={value} onChange={onChange} />;
  }

  return null;
};
