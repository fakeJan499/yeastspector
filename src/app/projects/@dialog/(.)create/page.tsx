import { withPageAuthRequired } from '@/libs/auth';
import { useI18n } from '@/libs/i18n';
import { ProjectCreateFormDialog } from '@/libs/ui';
import { Button, DialogActions, DialogTitle } from '@mui/material';
import Link from 'next/link';

export default withPageAuthRequired(
    async function Page() {
        const { t } = await useI18n({ nameSpace: 'project-create' });

        return (
            <ProjectCreateFormDialog
                Title={<DialogTitle>{t('header')}</DialogTitle>}
                ActionButtons={
                    <DialogActions>
                        <Button href="/projects" LinkComponent={Link}>
                            {t('form.actions.cancel')}
                        </Button>
                        <Button variant="contained" type="submit">
                            {t('form.actions.submit')}
                        </Button>
                    </DialogActions>
                }
            />
        );
    },
    { returnTo: () => '/projects/create' },
);
