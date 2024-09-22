import { Box } from '@mui/material';

type Props = {
    Heading: React.ReactNode;
    Actions?: React.ReactNode;
};

export function PageHeader({ Heading, Actions }: Props) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            {Heading}
            {Actions && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {Actions}
                </Box>
            )}
        </Box>
    );
}
