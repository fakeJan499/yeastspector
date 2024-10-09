import adapters from '@/libs/adapters';
import { getUser, withPageAuthRequired } from '@/libs/auth';
import { useI18n } from '@/libs/i18n';
import {
    PageHeader,
    ProjectDescriptionCard,
    ProjectDetailsCard,
    ProjectHeroImageCard,
    ProjectImagesCard,
    ProjectTimelineCard,
} from '@/libs/ui';
import { PageMainHeading } from '@/libs/ui/page-main-heading';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Grid2, IconButton } from '@mui/material';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Params = {
    projectUuid: string;
};

const getData = async (params: Params) => {
    const user = await getUser();

    if (!user) {
        throw new Error('Session not found');
    }

    const project = await adapters.projects.find({ userId: user.sub, uuid: params.projectUuid });

    if (!project) {
        notFound();
    }

    return { project };
};

export default withPageAuthRequired<Params>(
    async function Page({ params }) {
        const { project } = await getData(params);
        const { t } = await useI18n({ nameSpace: 'project-details' });

        return (
            <>
                <PageHeader
                    Heading={
                        <PageMainHeading>
                            {t('header', { projectName: project.name })}
                        </PageMainHeading>
                    }
                    PreHeadingActions={
                        <Link href="/projects">
                            <IconButton aria-label={t('heading-actions.navigate-back')}>
                                <NavigateBeforeIcon />
                            </IconButton>
                        </Link>
                    }
                />
                <Grid2 container spacing={1}>
                    <Grid2 size={{ xs: 12, sm: 4 }}>
                        <ProjectHeroImageCard project={project} />
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 8 }}>
                        <ProjectDetailsCard project={project} />
                    </Grid2>
                    <Grid2 size={{ xs: 12 }}>
                        <ProjectDescriptionCard project={project} />
                    </Grid2>
                    <Grid2 size={{ xs: 12 }}>
                        <ProjectImagesCard project={project} />
                    </Grid2>
                    <Grid2 size={{ xs: 12 }}>
                        <ProjectTimelineCard project={project} />
                    </Grid2>
                </Grid2>
            </>
        );
    },
    { returnTo: ({ params }) => `/projects/${params.projectUuid}` },
);
