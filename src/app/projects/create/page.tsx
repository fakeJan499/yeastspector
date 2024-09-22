import { withPageAuthRequired } from '@/libs/auth';
import { useI18n } from '@/libs/i18n';
import { PageHeader, PageMainHeading, ProjectCreateForm } from '@/libs/ui';
import { Box, Button, Link } from '@mui/material';

export default withPageAuthRequired(
    async function Page() {
        const { t } = await useI18n({ nameSpace: 'project-create' });

        return (
            <>
                <PageHeader Heading={<PageMainHeading>{t('header')}</PageMainHeading>} />
                <ProjectCreateForm
                    ActionButtons={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button href="/projects" LinkComponent={Link}>
                                {t('form.actions.cancel')}
                            </Button>
                            <Button variant="contained" type="submit">
                                {t('form.actions.submit')}
                            </Button>
                        </Box>
                    }></ProjectCreateForm>
            </>
        );
    },
    { returnTo: () => '/projects/create' },
);
