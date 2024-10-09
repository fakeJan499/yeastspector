import { Project } from '@/libs/adapters';
import { Card, CardContent } from '@mui/material';
import Image from 'next/image';

type Props = {
    project: Project;
};

export function ProjectHeroImageCard({ project }: Props) {
    return (
        <Card>
            <CardContent sx={{ aspectRatio: '1 / 1', position: 'relative' }}>
                <Image
                    src={project.heroImage.url}
                    alt={project.name}
                    fill
                    objectFit="contain"
                    priority
                />
            </CardContent>
        </Card>
    );
}
