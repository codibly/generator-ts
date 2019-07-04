import * as React from 'react';
import ReactLoadable from 'react-loadable';
import { LoadableComponent, Options as LoadableOptions } from 'react-loadable';
import * as ReactLazyLoadable from 'react-loadable-visibility/react-loadable';
import { ComponentLoader } from '../ComponentLoader/ComponentLoader';

export namespace Loadable {
  export type Options<Props, Exports extends object> = Partial<LoadableOptions<Props, Exports>> & {
    lazy?: boolean;
  };
}

export function Loadable<Props, Exports extends object = any>({
  lazy = false,
  ...options
}: Loadable.Options<Props, Exports>): React.ComponentType<Props> & LoadableComponent {
  return (lazy ? ReactLazyLoadable : (ReactLoadable as any))({
    loading: ComponentLoader,
    delay: 500,
    timeout: 10000,
    lazy,
    ...options
  });
}
