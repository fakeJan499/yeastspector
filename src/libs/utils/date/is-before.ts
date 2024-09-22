import { isBefore as dateFnsIsBefore } from 'date-fns';

type DateType = Date | number | string;

export const isBefore = (date1: DateType, date2: DateType): boolean =>
    dateFnsIsBefore(date1, date2);
