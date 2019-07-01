import styled from '@emotion/styled';
import { SvgIconProps } from '@material-ui/core/SvgIcon/SvgIcon';
import * as React from 'react';
import { ComponentType } from 'react';
import { darkBlue, lightBlue } from '../../../theme';

export type DialogIconProps = SvgIconProps & {
  icon: ComponentType<SvgIconProps>;
};

export const DialogIcon: ComponentType<DialogIconProps> = styled(({ icon: Icon, ...props }) => (
  <Icon {...props} />
))({
  marginRight: 10,
  backgroundColor: lightBlue,
  fill: darkBlue,
  padding: 9,
  borderRadius: '50%',
  width: 40,
  height: 40,
  textAlign: 'center',
  lineHeight: 30,
  verticalAlign: 'middle',
  boxShadow: '0 5px 16.83px 0.17px rgba(0,0,0,.03)'
});
