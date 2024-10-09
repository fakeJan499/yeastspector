import { Project } from '@/libs/adapters';
import { useI18n } from '@/libs/i18n';
import { formatDate } from '@/libs/utils/date';
import { Card, CardContent, Typography } from '@mui/material';

type Props = {
    project: Project;
};

export async function ProjectDetailsCard({ project }: Props) {
    const { t, lang } = await useI18n({ nameSpace: 'project-details' });

    const getDetailsListItemText = (label: string, value: string) => (
        <>
            <Typography component="span" variant="body2" sx={{ fontWeight: 600 }}>
                {label}:{' '}
            </Typography>
            <Typography component="span" variant="body2">
                {value}
            </Typography>
        </>
    );

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {t('details.title')}
                </Typography>
                {getDetailsListItemText(
                    t('details.created-at'),
                    formatDate(project.createdAt, lang),
                )}
            </CardContent>
        </Card>
    );
}
