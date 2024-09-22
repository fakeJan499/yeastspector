'use client';

import { createProject } from '@/libs/actions';
import { FormActionResult } from '@/libs/actions/types';
import { getFormActionMergedMessages } from '@/libs/utils/form';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { ProjectCreateFormControls } from './project-create-form-controls';

type Props = {
    ActionButtons: React.ReactNode;
};

export function ProjectCreateForm({ ActionButtons }: Props) {
    const [state, formAction] = useFormState<FormActionResult<null>>(createProject, {
        ok: true,
        data: null,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        setErrors(getFormActionMergedMessages(state));
    }, [state]);

    const handleValueChange = (field: string) => {
        const updatedErrors = { ...errors, [field]: '' };
        setErrors(updatedErrors);
    };

    return (
        <Box component="form" action={formAction}>
            <ProjectCreateFormControls errors={errors} handleValueChange={handleValueChange} />
            {ActionButtons}
        </Box>
    );
}
