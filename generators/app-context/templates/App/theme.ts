import createMuiTheme, {
  Theme as MuiTheme,
  ThemeOptions as MuiThemeOptions
} from '@material-ui/core/styles/createMuiTheme';

// primary colors
export const darkBlue = '#74A1BE';
export const mediumBlue = '#52758F';
export const lightBlue = '#E6F3F6';

// grey colors
export const darkGrey = '#5F5F5F';
export const mediumGrey = '#929FB1';
export const borderGrey = '#F1F3F4';
export const lightGrey = '#F7F5FE';
export const backgroundGrey = '#F8FAFB';
export const lineGrey = '#E9E9E9';

// login colors
export const loginBackgroundColor = '#F8FAFB';

// action colors
export const darkestGreen = '#0A4933';
export const darkGreen = '#38C172';
export const mediumGreen = '#38C172';
export const lightGreen = '#A8EEC1';
export const lightestGreen = '#D7F5EA';
export const darkestRed = '#5A0D0D';
export const mediumRed = '#F44336';
export const lightestRed = '#FFECEC';

// semantic colors
export const neutralDark = '#004466';
export const neutralLight = '#F1F3F4';
export const positiveDark = darkestGreen;
export const positiveLight = lightestGreen;
export const negativeDark = darkestRed;
export const negativeLight = lightestRed;

type BrandingTheme = {
  darkGrey: string;
  mediumGrey: string;
  lightGrey: string;
  positive: {
    dark: string;
    medium: string;
    light: string;
  };
  negative: {
    dark: string;
    medium: string;
    light: string;
  };
};

export type Theme = MuiTheme & {
  branding: BrandingTheme;
};

export type WithTheme = {
  theme?: Theme;
};

export const theme = createMuiTheme({
  branding: {
    darkGrey: darkGrey,
    mediumGrey: mediumGrey,
    lightGrey: lightGrey,
    positive: {
      dark: darkestGreen,
      medium: mediumGreen,
      light: lightGreen
    },
    negative: {
      dark: darkestRed,
      medium: mediumRed,
      light: lightestRed
    }
  },
  codibly: {
    MuiStatusPill: {
      negative: {
        color: negativeDark,
        backgroundColor: negativeLight
      },
      neutral: {
        color: neutralDark,
        backgroundColor: neutralLight
      },
      positive: {
        color: positiveDark,
        backgroundColor: positiveLight
      }
    }
  },
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: darkBlue
    },
    secondary: {
      main: darkGrey
    },
    background: {
      default: backgroundGrey
    },
    text: {
      primary: darkGrey,
      secondary: mediumGrey,
      disabled: 'rgba(0, 0, 0, 0.18)',
      hint: 'rgba(0, 0, 0, 0.18)'
    },
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.05)',
      hoverOpacity: 0.08,
      selected: 'rgba(0, 0, 0, 0.09)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)'
    },
    divider: 'rgba(0, 0, 0, 0.1)'
  },
  overrides: {
    MuiTooltip: { tooltip: { fontSize: 14 } },
    MuiDialog: { paperWidthMd: { maxWidth: 750 } },
    MuiTableSortLabel: {
      root: {
        '&:active, &:hover, &:focus, &:focus-within, &:visited': {
          color: 'white',
          fontWeight: 800,
          textShadow: '1px 2px 0px rgba(0, 0, 0, 0.08)'
        }
      },
      active: { color: 'white', fontWeight: 800, textShadow: '1px 2px 0px rgba(0, 0, 0, 0.08)' }
    },
    MuiTableHead: { root: { backgroundColor: darkBlue } },
    MuiTableCell: {
      head: {
        color: 'white',
        padding: '4px 24px 4px 24px'
      },
      body: {
        borderBottom: `1px solid ${lineGrey}`,
        padding: '15px 24px 15px 24px'
      }
    },
    MuiSwitch: {
      colorSecondary: {
        '&$checked': {
          '& + $bar': {
            backgroundColor: mediumGreen
          }
        },
        '&$disabled': {
          color: lightGrey,
          opacity: 0.6,
          '&$checked': {
            '& + $bar': {
              backgroundColor: `${mediumGreen} !important`,
              opacity: 0.2
            }
          }
        }
      },
      switchBase: { color: mediumGrey },
      iconChecked: { color: darkGreen },
      bar: { backgroundColor: mediumGrey }
    },
    MuiButton: {
      root: {
        paddingLeft: '1.5em',
        paddingRight: '1.5em'
      },
      text: {
        paddingLeft: '1.5em',
        paddingRight: '1.5em'
      },
      containedPrimary: {
        color: 'white',
        '&:hover': { backgroundColor: darkBlue }
      }
    },
    MuiTouchRipple: {
      root: {
        opacity: 0.2
      }
    },
    MuiCard: {
      root: {
        boxShadow:
          '0px 1px 2px 0px rgba(0,0,0,0.2), 0px 1px 2px 0px rgba(0,0,0,0.14), 0px 1px 1px -2px rgba(0,0,0,0.12)'
      }
    }
  }
} as MuiThemeOptions) as MuiTheme;
