import * as React from 'react';
import { FunctionComponent, ReactNode } from 'react';
import { InfoLabel, InfoRow, InfoValue } from './Info.style';

export namespace Info {
  export type Row = {
    label: ReactNode;
    value: ReactNode;
  };

  export type Props = {
    info: Row[];
  };
}

export const Info: FunctionComponent<Info.Props> = ({ info }) => (
  <>
    {(info || []).map((row, index) => (
      <InfoRow key={index}>
        <InfoLabel variant="body2" component="div">
          {row.label}
        </InfoLabel>
        <InfoValue variant="body1" component="div">
          {row.value}
        </InfoValue>
      </InfoRow>
    ))}
  </>
);
