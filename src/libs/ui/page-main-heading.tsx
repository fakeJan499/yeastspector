import { Typography } from '@mui/material';

type Props = {
    children: React.ReactNode;
};

export function PageMainHeading({ children }: Props) {
    return (
        <Typography variant="h5" component="h1">
            {children}
        </Typography>
    );
}
