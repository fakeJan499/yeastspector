import adapters from '@/libs/adapters';
import { getUser, withPageAuthRequired } from '@/libs/auth';
import { useI18n } from '@/libs/i18n';
import { PageHeader, ProjectList } from '@/libs/ui';
import { PageMainHeading } from '@/libs/ui/page-main-heading';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import Link from 'next/link';

const getData = async () => {
    const user = await getUser();

    if (!user) {
        throw new Error('Session not found');
    }

    const projects = await adapters.projects.findMany({ userId: user.sub });

    return { projects };
};

export default withPageAuthRequired(
    async function Page() {
        const { projects } = await getData();
        const { t } = await useI18n({ nameSpace: 'projects' });

        return (
            <>
                <PageHeader
                    Heading={<PageMainHeading>{t('header')}</PageMainHeading>}
                    Actions={
                        <IconButton
                            href="/projects/create"
                            LinkComponent={Link}
                            sx={{
                                color: 'white',
                                backgroundColor: 'primary.main',
                                '&:hover': { backgroundColor: 'primary.dark' },
                            }}
                            aria-label={t('actions.add-project')}>
                            <AddIcon />
                        </IconButton>
                    }
                />
                <ProjectList projects={projects} />
            </>
        );
    },
    { returnTo: () => '/projects' },
);
