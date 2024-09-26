import adapters from '@/libs/adapters';
import {
    HttpForbiddenError,
    HttpNotFoundError,
    route,
    withAuthentication,
    withParams,
} from '@/libs/routes';
import { getFileStream } from '@/libs/storage';
import Z from 'zod';

export const GET = route(
    async ({ params, user }) => {
        const project = await adapters.projects.find({ uuid: params.projectUuid });

        if (!project) {
            throw new HttpNotFoundError({
                errors: [{ message: `Project with uuid ${params.projectUuid} doesn't exist.` }],
            });
        }

        if (project.userId !== user.sub) {
            throw new HttpForbiddenError();
        }

        if (!project.images.some(image => image.uuid === params.imageUuid)) {
            throw new HttpNotFoundError({
                errors: [{ message: `Image with uuid ${params.imageUuid} doesn't exist.` }],
            });
        }

        const stream = await getFileStream(
            `projects/${params.projectUuid}/images/${params.imageUuid}`,
        );

        return new Response(stream, {
            headers: { 'Cache-Control': 'max-age=31536000, immutable' },
        });
    },
    ...[
        withAuthentication(),
        withParams(Z.object({ imageUuid: Z.string().uuid(), projectUuid: Z.string().uuid() })),
    ],
);
