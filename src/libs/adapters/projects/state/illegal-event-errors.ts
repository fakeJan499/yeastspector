export class IllegalEventError extends Error {
    constructor(message: string = 'Illegal event') {
        super(message);
    }
}
