'use client';

import { setHeroImage } from '@/libs/actions';
import { FormActionResult } from '@/libs/actions/types';
import { Project } from '@/libs/adapters';
import { ProjectImage } from '@/libs/adapters/projects/models';
import { useClientI18n } from '@/libs/i18n/client';
import { AlertSnackbar, VisuallyHiddenInput } from '@/libs/ui';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { IconButton, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

type Props = {
    project: Project;
    image: ProjectImage;
};

export function ProjectHeroImageIndicationButton({ project, image }: Props) {
    const { t } = useClientI18n({ nameSpace: 'project-details' });
    const [open, setOpen] = useState(false);
    const [state, formAction] = useFormState<FormActionResult<string | null>>(setHeroImage, {
        ok: true,
        data: null,
    });
    const isHeroImage = project.heroImage.uuid === image.uuid;

    useEffect(() => {
        const isError = state && !state.ok;
        const isSuccess = state && state.ok && state.data;
        if (isError || isSuccess) {
            setOpen(true);
        }
    }, [state]);

    const getAlertMessage = (): string => {
        if (state && !state.ok) {
            return state.errors.map(error => error.message).join(' ');
        }

        if (!state || state.ok) {
            return t('images.actions.set-hero-image.success');
        }

        return '';
    };

    return (
        <>
            {isHeroImage ? (
                <Tooltip title={t('images.actions.set-hero-image.already-set')}>
                    <span>
                        <IconButton
                            disabled
                            aria-label={t('images.actions.set-hero-image.already-set')}>
                            <StarIcon sx={{ color: 'white' }} />
                        </IconButton>
                    </span>
                </Tooltip>
            ) : (
                <form action={formAction}>
                    <Tooltip title={t('images.actions.set-hero-image.title')} arrow>
                        <IconButton sx={{ color: 'white' }} type="submit">
                            <StarBorderIcon />
                        </IconButton>
                    </Tooltip>
                    <VisuallyHiddenInput name="projectUuid" value={project.uuid} type="hidden" />
                    <VisuallyHiddenInput name="imageUuid" value={image.uuid} type="hidden" />
                </form>
            )}
            <AlertSnackbar
                open={open}
                onClose={() => setOpen(false)}
                severity={state?.ok ? 'success' : 'error'}>
                {getAlertMessage()}
            </AlertSnackbar>
        </>
    );
}
