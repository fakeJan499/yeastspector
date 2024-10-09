import { Box } from '@mui/material';

type Props = {
    Heading: React.ReactNode;
    Actions?: React.ReactNode;
    PreHeadingActions?: React.ReactNode;
};

export function PageHeader({ Heading, Actions, PreHeadingActions }: Props) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                {PreHeadingActions}
                {Heading}
            </Box>
            {Actions && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {Actions}
                </Box>
            )}
        </Box>
    );
}
