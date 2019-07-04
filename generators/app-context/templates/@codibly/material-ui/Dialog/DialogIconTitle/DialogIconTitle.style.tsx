import styled from '@emotion/styled';
import { SvgIconProps } from '@material-ui/core/SvgIcon/SvgIcon';
import * as React from 'react';
import { ComponentType } from 'react';

export type DialogIconProps = SvgIconProps & {
  icon: ComponentType<SvgIconProps>;
  backgroundcolor: string;
  fill: string;
};

export const DialogIcon: ComponentType<DialogIconProps> = styled(({ icon: Icon, ...props }) => (
  <Icon {...props} />
))`
  margin-right: 10px;
  background-color: ${ (props) => props.backgroundcolor };
  fill: ${ (props) => props.fill };
  padding: 9px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 30;
  vertical-align: middle;
  box-shadow: 0 5px 16.83px 0.17px rgba(0,0,0,.03);
`;
