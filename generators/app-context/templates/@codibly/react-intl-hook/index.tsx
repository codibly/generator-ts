import * as React from 'react';
import { createContext, FC, useContext } from 'react';
import { InjectedIntl, injectIntl, IntlProvider as ReactIntlProvider } from 'react-intl';

const IntlContext = createContext<InjectedIntl | undefined>(undefined);

const IntlHookProvider = injectIntl(({ intl, children }: any) => (
  <IntlContext.Provider value={intl}>{children}</IntlContext.Provider>
));

export const IntlProvider: FC<ReactIntlProvider.Props> = ({ children, ...props }) => (
  <ReactIntlProvider {...props}>
    <IntlHookProvider>{children}</IntlHookProvider>
  </ReactIntlProvider>
);

export function useIntl() {
  const intl = useContext(IntlContext);

  if (!intl) {
    throw new Error(
      'Cannot use `useIntl` outside <IntlProvider /> from @codibly/react-intl-hook package'
    );
  }

  return intl;
}

export function useFormatDate() {
  return useIntl().formatDate;
}

export function useFormatTime() {
  return useIntl().formatTime;
}

export function useFormatRelative() {
  return useIntl().formatRelative;
}

export function useFormatNumber() {
  return useIntl().formatNumber;
}

export function useFormatPlural() {
  return useIntl().formatPlural;
}

export function useFormatMessage() {
  return useIntl().formatMessage;
}

export function useFormatHTMLMessage() {
  return useIntl().formatHTMLMessage;
}

export function useLocale() {
  return useIntl().locale;
}
