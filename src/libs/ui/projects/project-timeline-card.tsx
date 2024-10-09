import { Project, ProjectEventItem } from '@/libs/adapters';
import { useI18n } from '@/libs/i18n';
import { formatDate } from '@/libs/utils/date';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import StartIcon from '@mui/icons-material/Start';
import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineSeparator,
} from '@mui/lab';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';

type Props = {
    project: Project;
};

export async function ProjectTimelineCard({ project }: Props) {
    const { t, lang } = await useI18n({ nameSpace: 'project-details' });

    const getEventTypeTitle = (event: ProjectEventItem): string => {
        switch (event.type) {
            case 'ProjectCreated':
                return t('timeline.types.project-created');
            case 'ProjectImageUploaded':
                return t('timeline.types.project-image-uploaded');
        }
    };

    const getEventTypeColor = (event: ProjectEventItem) => {
        switch (event.type) {
            case 'ProjectCreated':
                return 'success';
            case 'ProjectImageUploaded':
                return 'secondary';
            default:
                return undefined;
        }
    };

    const getEventTypeIcon = (event: ProjectEventItem): React.ReactNode => {
        switch (event.type) {
            case 'ProjectCreated':
                return <StartIcon />;
            case 'ProjectImageUploaded':
                return <AddPhotoAlternateIcon />;
        }
    };

    return (
        <Card>
            <CardHeader title={t('timeline.title')} />
            <CardContent>
                <Timeline position="alternate">
                    {[...project.events].reverse().map((event, index) => (
                        <TimelineItem key={event.uuid}>
                            <TimelineSeparator>
                                <TimelineDot color={getEventTypeColor(event)}>
                                    {getEventTypeIcon(event)}
                                </TimelineDot>
                                {index < project.events.length - 1 && <TimelineConnector />}
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography variant="body1">{getEventTypeTitle(event)}</Typography>
                                <Typography variant="body2">
                                    {formatDate(event.date, lang)}
                                </Typography>
                            </TimelineContent>
                        </TimelineItem>
                    ))}
                </Timeline>
            </CardContent>
        </Card>
    );
}
