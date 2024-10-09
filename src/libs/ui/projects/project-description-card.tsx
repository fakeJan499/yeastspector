import { Project } from '@/libs/adapters';
import { useI18n } from '@/libs/i18n';
import EditIcon from '@mui/icons-material/Edit';
import { Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';

type Props = {
    project: Project;
};

export async function ProjectDescriptionCard({ project }: Props) {
    const { t } = await useI18n({ nameSpace: 'project-details' });

    return (
        <Card>
            <CardHeader
                title={t('description.title')}
                action={
                    <IconButton aria-label={t('description.actions.edit')}>
                        <EditIcon />
                    </IconButton>
                }
            />
            <CardContent>
                {project.description ? (
                    <Typography component="pre" sx={{ whiteSpace: 'break-spaces' }}>
                        {project.description}
                    </Typography>
                ) : (
                    <Typography>{t('description.empty')}</Typography>
                )}
            </CardContent>
        </Card>
    );
}
