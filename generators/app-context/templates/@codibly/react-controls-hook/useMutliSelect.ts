import { useCallback } from 'react';

export function useMultiSelect<T = string>(values?: T[]) {
  const isSelected = useCallback((aValue: T) => (values || []).some((value) => value === aValue), [
    values
  ]);

  const unselect = useCallback((aValue: T) => (values || []).filter((value) => value !== aValue), [
    values
  ]);

  const select = useCallback((aValue: T) => (values || []).concat([aValue]), [values]);
  const toggle = useCallback(
    (aValue: T) => (isSelected(aValue) ? unselect(aValue) : select(aValue)),
    [values]
  );
  const toggleSingle = useCallback((aValue: T) => (isSelected(aValue) ? [] : [aValue]), [values]);

  return {
    isSelected,
    unselect,
    select,
    toggle,
    toggleSingle
  };
}
