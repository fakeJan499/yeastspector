'use client';

import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import type {} from '@mui/x-date-pickers/themeAugmentation';

const theme = createTheme({
    components: {
        MuiButton: {
            defaultProps: {
                size: 'small',
            },
        },
        MuiFilledInput: {
            defaultProps: {
                margin: 'dense',
            },
        },
        MuiFormControl: {
            defaultProps: {
                margin: 'dense',
            },
        },
        MuiFormHelperText: {
            defaultProps: {
                margin: 'dense',
            },
        },
        MuiIconButton: {
            defaultProps: {
                size: 'small',
            },
        },
        MuiInputBase: {
            defaultProps: {
                margin: 'dense',
            },
        },
        MuiInputLabel: {
            defaultProps: {
                margin: 'dense',
            },
        },
        MuiListItem: {
            defaultProps: {
                dense: true,
            },
        },
        MuiOutlinedInput: {
            defaultProps: {
                margin: 'dense',
            },
        },
        MuiFab: {
            defaultProps: {
                size: 'small',
            },
        },
        MuiTable: {
            defaultProps: {
                size: 'small',
            },
        },
        MuiTextField: {
            defaultProps: {
                margin: 'dense',
                variant: 'outlined',
                fullWidth: true,
                slotProps: {
                    inputLabel: {
                        shrink: true,
                    },
                },
                sx: {
                    '&': {
                        mb: 1,
                    },
                },
            },
        },
        MuiDatePicker: {
            defaultProps: {
                sx: {
                    '&': {
                        mb: 1,
                    },
                },
            },
        },
        MuiToolbar: {
            defaultProps: {
                variant: 'dense',
            },
        },
        MuiIcon: {
            defaultProps: {
                fontSize: 'small',
            },
        },
        MuiDialogActions: {
            defaultProps: {
                sx: {
                    justifyContent: 'space-between',
                },
            },
        },
    },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
