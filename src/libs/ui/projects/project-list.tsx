'use client';

import type { Project } from '@/libs/adapters';
import { useClientI18n } from '@/libs/i18n/client';
import { formatDate } from '@/libs/utils/date';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { isBefore } from 'date-fns';
import { ProjectImageCell } from './project-image-cell';

interface Props {
    projects: Project[];
}

export function ProjectList({ projects }: Props) {
    const { t, lang } = useClientI18n({ nameSpace: 'projects' });

    const rows: GridRowsProp<Project> = projects.map(x => ({ ...x, margin: 2 }));

    const columns: GridColDef<Project>[] = [
        {
            field: 'image',
            headerName: t('list.columns.image.header'),
            sortable: false,
            width: 72,
            resizable: false,
            renderCell: ({ row }) => <ProjectImageCell project={row} />,
        },
        { field: 'name', headerName: t('list.columns.name.header'), flex: 1 },
        {
            field: 'description',
            headerName: t('list.columns.description.header'),
            flex: 1,
            sortable: false,
        },
        {
            field: 'createdAt',
            headerName: t('list.columns.creation-date.header'),
            valueGetter: row => formatDate(row, lang),
            sortComparator: (v1, v2) => (isBefore(v1, v2) ? -1 : 1),
        },
    ];

    return (
        <DataGrid
            isRowSelectable={() => false}
            initialState={{
                sorting: {
                    sortModel: [{ field: 'name', sort: 'asc' }],
                },
            }}
            rows={rows}
            getRowId={row => row.uuid}
            columns={columns}
            disableColumnMenu
            localeText={{
                columnHeaderSortIconLabel: t('list.sort'),
                noRowsLabel: t('list.empty'),
                MuiTablePagination: {
                    slotProps: {
                        actions: {
                            nextButton: {
                                title: t('list.pagination.next'),
                            },
                            previousButton: {
                                title: t('list.pagination.previous'),
                            },
                        },
                    },
                    labelRowsPerPage: t('list.pagination.rows-per-page'),
                    labelDisplayedRows: ({ from, to, count }) =>
                        t('list.pagination.displayed-rows', {
                            from,
                            to,
                            count: count === -1 ? `${to}+` : count,
                        }),
                },
            }}
        />
    );
}
