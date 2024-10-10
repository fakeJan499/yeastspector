'use client';

import { uploadImage } from '@/libs/actions';
import { FormActionResult } from '@/libs/actions/types';
import { Project } from '@/libs/adapters';
import { useClientI18n } from '@/libs/i18n/client';
import { AlertSnackbar, VisuallyHiddenInput } from '@/libs/ui';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';

type Props = {
    project: Project;
};

export function ProjectImageAddButton({ project }: Props) {
    const { t } = useClientI18n({ nameSpace: 'project-details' });
    const [open, setOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [state, formAction] = useFormState<FormActionResult<string | null>>(uploadImage, {
        ok: true,
        data: null,
    });

    useEffect(() => {
        inputRef.current?.form?.reset();

        const isError = state && !state.ok;
        const isSuccess = state && state.ok && state.data;
        if (isError || isSuccess) {
            setOpen(true);
        }
    }, [state]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.files?.length) {
            event.currentTarget.form?.requestSubmit();
        }
    };

    const getAlertMessage = (): string => {
        if (state && !state.ok) {
            return state.errors.map(error => error.message).join(' ');
        }

        if (!state || state.ok) {
            return t('images.actions.add.success');
        }

        return '';
    };

    return (
        <>
            <form action={formAction}>
                <IconButton
                    aria-label={t('images.actions.add.title')}
                    component="label"
                    role={undefined}
                    tabIndex={-1}>
                    <AddIcon />
                    <VisuallyHiddenInput
                        name="image"
                        type="file"
                        accept="image/*"
                        ref={inputRef}
                        onChange={handleChange}
                    />
                </IconButton>
                <VisuallyHiddenInput name="projectUuid" value={project.uuid} type="hidden" />
            </form>
            <AlertSnackbar
                open={open}
                onClose={() => setOpen(false)}
                severity={state?.ok ? 'success' : 'error'}>
                {getAlertMessage()}
            </AlertSnackbar>
        </>
    );
}
