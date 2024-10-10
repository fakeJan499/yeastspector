import { Project } from '@/libs/adapters';
import { useI18n } from '@/libs/i18n';
import { Card, CardContent, CardHeader, Grid2, ImageListItemBar, Typography } from '@mui/material';
import Image from 'next/image';
import { ProjectHeroImageIndicationButton } from './project-hero-image-indication-button';
import { ProjectImageAddButton } from './project-image-add-button';

type Props = {
    project: Project;
};

export async function ProjectImagesCard({ project }: Props) {
    const { t } = await useI18n({ nameSpace: 'project-details' });

    return (
        <Card>
            <CardHeader
                title={t('images.title')}
                action={<ProjectImageAddButton project={project} />}
            />
            <CardContent>
                {project.images.length === 0 ? (
                    <Typography>{t('images.empty')}</Typography>
                ) : (
                    <Grid2 container spacing={1} component="ul">
                        {project.images.map(image => (
                            <Grid2
                                key={image.uuid}
                                size={{ xs: 6, sm: 3, md: 2 }}
                                component="li"
                                sx={{ listStyle: 'none' }}>
                                <Card
                                    variant="outlined"
                                    sx={{
                                        position: 'relative',
                                        aspectRatio: '1 / 1',
                                    }}>
                                    <Image src={image.url} alt="" fill objectFit="contain" />
                                    <ImageListItemBar
                                        sx={{
                                            background:
                                                'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                                'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                        }}
                                        position="top"
                                        actionIcon={
                                            <ProjectHeroImageIndicationButton
                                                project={project}
                                                image={image}
                                            />
                                        }
                                        actionPosition="right"
                                    />
                                </Card>
                            </Grid2>
                        ))}
                    </Grid2>
                )}
            </CardContent>
        </Card>
    );
}
