'use client';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, ButtonGroup, FormControl, FormHelperText, Typography } from '@mui/material';
import { ChangeEvent, useId, useRef, useState } from 'react';
import { VisuallyHiddenInput } from './visually-hidden-input';

type Props = {
    name: string;
    label: string;
    clearButtonLabel?: string;
    error?: boolean;
    required?: boolean;
    helperText?: string;
    onChange?: (value: FileList | null) => void;
};

export function ImageInput({
    name,
    label,
    clearButtonLabel,
    error,
    required,
    helperText,
    onChange,
}: Props) {
    const [isImgAdded, setIsImgAdded] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const helperTextId = useId();

    const fileName = inputRef.current?.files?.[0]?.name;
    const handleClearButtonClick = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
        }

        setIsImgAdded(false);
        onChange?.(null);
    };
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIsImgAdded(!!event.target.files?.[0]);
        onChange?.(event.target.files);
    };

    return (
        <FormControl
            error={error}
            sx={{
                mt: 0.25,
                mb: 1,
                maxWidth: '100%',
            }}>
            <ButtonGroup variant="outlined">
                <Button
                    component="label"
                    role={undefined}
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    disabled={isImgAdded}>
                    <Typography
                        sx={{
                            textWrap: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}>
                        {fileName ?? label}
                    </Typography>
                    <VisuallyHiddenInput
                        name={name}
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        ref={inputRef}
                        required={required}
                        aria-invalid={error}
                        aria-label={label}
                        aria-describedby={helperText ? helperTextId : undefined}
                    />
                </Button>
                {isImgAdded && (
                    <Button
                        size="small"
                        color="error"
                        aria-label={clearButtonLabel}
                        onClick={handleClearButtonClick}>
                        <DeleteIcon />
                    </Button>
                )}
            </ButtonGroup>
            {helperText && <FormHelperText id={helperTextId}>{helperText}</FormHelperText>}
        </FormControl>
    );
}
