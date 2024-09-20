import * as projects from './projects';
import type { Project } from './projects';

const adapters = { projects } as const;

export default adapters;

export type { Project };
