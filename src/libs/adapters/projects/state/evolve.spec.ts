import { mockAdapter } from '@/libs/test/mocks';
import { validate } from 'uuid';
import { describe, expect, test } from 'vitest';
import { evolve } from './evolve';
import { IllegalEventError } from './illegal-event-errors';

describe(`ProjectCreated`, () => {
    test('should throw an error if trying to apply to evolved project', () => {
        const project = mockAdapter.mockCreatedProject();
        const event = mockAdapter.mockProjectCreateEvent();

        expect(() => evolve(project, event)).toThrowError(IllegalEventError);
    });

    test('should evolve project', () => {
        const project = mockAdapter.mockBaseProject();
        const event = mockAdapter.mockProjectCreateEvent({
            data: {
                name: 'this is a name of this project',
                description: 'some random description \n it can be multiline',
                date: new Date('2021-01-01'),
            },
        });

        const evolvedProject = evolve(project, event);

        expect(evolvedProject.status).toBe('created');
        expect(evolvedProject.name).toBe(event.data.name);
        expect(evolvedProject.description).toBe(event.data.description);
        expect(evolvedProject.createdAt).toBe(event.data.date);
    });

    test('should set default hero image', () => {
        const project = mockAdapter.mockBaseProject();
        const event = mockAdapter.mockProjectCreateEvent();

        const evolvedProject = evolve(project, event);

        expect(evolvedProject.heroImage.url).toEqual('/images/project-default.png');
        expect(validate(evolvedProject.heroImage.uuid)).toBeTruthy();
    });
});

describe(`ProjectImageUploaded`, () => {
    test('should throw an error if trying to apply to not evolved project', () => {
        const project = mockAdapter.mockBaseProject();
        const event = mockAdapter.mockProjectImageUploadedEvent();

        expect(() => evolve(project, event)).toThrowError(IllegalEventError);
    });

    test('should throw an error if image already exists', () => {
        const image = mockAdapter.mockProjectImage();
        const event = mockAdapter.mockProjectImageUploadedEvent({
            data: { imageUuid: image.uuid },
        });
        const project = mockAdapter.mockCreatedProject({
            images: [image],
        });

        expect(() => evolve(project, event)).toThrowError(IllegalEventError);
    });

    test('should add new image', () => {
        const project = mockAdapter.mockCreatedProject();
        const event = mockAdapter.mockProjectImageUploadedEvent();

        const evolvedProject = evolve(project, event);

        expect(evolvedProject.images).toHaveLength(project.images.length + 1);
        expect(evolvedProject.images).toContainEqual({
            uuid: event.data.imageUuid,
            url: expect.any(String),
        });
    });

    test('should not set hero image if added image is not default', () => {
        const initialHeroImage = mockAdapter.mockProjectImage();
        const project = mockAdapter.mockCreatedProject({ heroImage: initialHeroImage });
        const event = mockAdapter.mockProjectImageUploadedEvent({ data: { isDefault: false } });

        const evolvedProject = evolve(project, event);

        expect(evolvedProject.heroImage).toEqual(initialHeroImage);
    });

    test('should set hero image if image is default', () => {
        const project = mockAdapter.mockCreatedProject();
        const event = mockAdapter.mockProjectImageUploadedEvent({ data: { isDefault: true } });

        const evolvedProject = evolve(project, event);

        expect(evolvedProject.heroImage).toEqual({
            uuid: event.data.imageUuid,
            url: expect.any(String),
        });
    });
});
