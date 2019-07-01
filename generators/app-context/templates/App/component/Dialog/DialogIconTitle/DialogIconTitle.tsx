import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { ComponentType } from 'react';
import { DialogIcon } from './DialogIconTitle.style';

export namespace DialogIconTitle {
  export type Props = {
    icon: ComponentType<SvgIconProps>;
    label: string;
  };
}

export const DialogIconTitle: FunctionComponent<DialogIconTitle.Props> = (props) => (
  <DialogTitle>
    <DialogIcon icon={props.icon} /> {props.label}
  </DialogTitle>
);
