import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import FilterListIcon from '@material-ui/icons/FilterList';
import * as React from 'react';
import { FunctionComponent, useCallback, useRef, useState } from 'react';
import { DataTableAnyFilter } from '../DataTableFilterType/DataTableAnyFilter/DataTableAnyFilter';
import { FilterButton, FilterContainer, FilterPaper } from './DataTableFilterPopper.style';

export namespace DataTableFilterPopper {
  export type Props = {
    schema: DataTableAnyFilter.Schema;
    value: any;
    onChange: (value: any) => void;
  };
}

export const DataTableFilterPopper: FunctionComponent<DataTableFilterPopper.Props> = ({
  schema,
  value,
  onChange,
  ...props
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const onFilterButtonClick = useCallback(() => setOpen(true), []);
  const onAwayClick = useCallback(() => setOpen(false), []);

  return (
    <>
      <FilterContainer {...props}>
        <FilterButton
          buttonRef={ref}
          onClick={onFilterButtonClick}
          open={open}
          active={value !== undefined}
        >
          <FilterListIcon fontSize="small" />
        </FilterButton>
      </FilterContainer>
      <Popper open={open} anchorEl={ref.current} placement="bottom-end" transition>
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={onAwayClick}>
            <Grow {...TransitionProps}>
              <FilterPaper>
                <DataTableAnyFilter schema={schema} value={value} onChange={onChange} />
              </FilterPaper>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
};
