'use client';

import { Alert, Snackbar } from '@mui/material';
import React from 'react';

type Props = {
    open: boolean;
    onClose: () => void;
    severity: 'success' | 'error' | 'warning' | 'info';
    children: React.ReactNode;
};

export function AlertSnackbar({ open, onClose, severity, children }: Props) {
    return (
        <Snackbar open={open} onClose={onClose}>
            <Alert onClose={onClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
                {children}
            </Alert>
        </Snackbar>
    );
}
