'use client';

import { useClientI18n } from '@/libs/i18n/client';
import { ImageInput } from '@/libs/ui';
import { Box, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

type Props = {
    handleValueChange: (field: string) => void;
    errors: Record<string, string>;
};

export function ProjectCreateFormControls({ handleValueChange, errors }: Props) {
    const { t } = useClientI18n({ nameSpace: 'project-create' });

    const getError = (field: string) => errors[field] ?? '';

    return (
        <Box>
            <TextField
                label={t('form.fields.name.label')}
                placeholder={t('form.fields.name.placeholder')}
                name="name"
                required
                onChange={() => handleValueChange('name')}
                error={!!getError('name')}
                helperText={getError('name')}
            />
            <DatePicker
                name="date"
                label={t('form.fields.date.label')}
                maxDate={new Date()}
                defaultValue={new Date()}
                onChange={() => handleValueChange('date')}
                slotProps={{
                    textField: {
                        error: !!getError('date'),
                        helperText: getError('date'),
                    },
                }}
            />
            <ImageInput
                name="image"
                label={t('form.fields.image.label')}
                clearButtonLabel={t('form.fields.image.actions.clear')}
                error={!!getError('image')}
                helperText={getError('image')}
                onChange={() => handleValueChange('image')}
            />
            <TextField
                label={t('form.fields.description.label')}
                placeholder={t('form.fields.description.placeholder')}
                name="description"
                multiline
                onChange={() => handleValueChange('description')}
                error={!!getError('description')}
                helperText={getError('description')}
            />
        </Box>
    );
}
