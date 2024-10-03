'use client';

import { Project } from '@/libs/adapters';
import { NoMaxWidthTooltip } from '@/libs/ui/no-max-width-tooltip';
import { Box, CircularProgress } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
    project: Project;
}

export function ProjectImageCell({ project }: Props) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imagePreviewSize, setImagePreviewSize] = useState({ width: 60, height: 60 });

    return (
        <NoMaxWidthTooltip
            disableInteractive={true}
            onClose={() => setImageLoaded(false)}
            arrow
            placement="right"
            title={
                <Box
                    sx={{
                        position: 'relative',
                        width: Math.min(imagePreviewSize.width, 200),
                        aspectRatio: `${imagePreviewSize.width} / ${imagePreviewSize.height}`,
                    }}>
                    {!imageLoaded && (
                        <Box
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <CircularProgress />
                        </Box>
                    )}
                    <Image
                        src={project.heroImage?.url}
                        alt={project.name}
                        fill
                        objectFit="contain"
                        onLoad={e => {
                            setImagePreviewSize({
                                width: (e.target as HTMLImageElement).naturalWidth,
                                height: (e.target as HTMLImageElement).naturalHeight,
                            });
                            setImageLoaded(true);
                        }}
                    />
                </Box>
            }>
            <Box
                sx={{
                    height: '100%',
                    aspectRatio: '1 / 1',
                    position: 'relative',
                    margin: '0 auto',
                }}>
                <Image src={project.heroImage?.url} alt={project.name} fill quality={1} priority />
            </Box>
        </NoMaxWidthTooltip>
    );
}
