import React, { useEffect, useMemo } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import { useAppSelector } from '../../hooks';
import { Data } from '../../type';


function createData(
    id: string,
    name: string,
    status: string, // {‘active’, ‘archive’}
    sum: number,
    qty: number,
    volume: number,
    delivery_date: string,
    currency: string
): Data {
    const total = sum + qty;
    return {
        id,
        name,
        status,
        sum,
        qty,
        volume,
        delivery_date,
        currency,
        total
    };
}

// const rows = [
//   createData('1234', 'Item 1', 'active', 10, 100, 20, '2019-01-25', 'USD'),
//   createData('2345', 'Item 2', 'archive', 20, 200, 30, '2022-01-21', 'RUB'),
//   createData('2345', 'Item 3', 'archive', 30, 300, 30, '2019-01-24', 'RUB'),
//   createData('2345', 'Item 4', 'archive', 40, 200, 30, '2019-01-22', 'RUB'),
//   createData('2345', 'Item 5', 'archive', 40, 200, 30, '2019-01-26', 'RUB'),
//   createData('2345', 'Item 6', 'archive', 40, 200, 30, '2023-02-28', 'RUB'),
// ];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    const dayjs = require('dayjs')
    let _a = a[orderBy]
    let _b = b[orderBy]
    if (orderBy === 'delivery_date') {
        _a = dayjs(a[orderBy]).valueOf();
        _b = dayjs(b[orderBy]).valueOf();
    }
    if (_b < _a) {
        return -1;
    }
    if (_b > _a) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
}

export const headCells: HeadCell[] = [
    {
        id: 'name',
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'status',
        disablePadding: false,
        label: 'Status',
    },
    {
        id: 'sum',
        disablePadding: false,
        label: 'Sum',
    },
    {
        id: 'qty',
        disablePadding: false,
        label: 'Qty',
    },
    {
        id: 'volume',
        disablePadding: false,
        label: 'Volume',
    },
    {
        id: 'delivery_date',
        disablePadding: false,
        label: 'Delivery date',
    },
    {
        id: 'currency',
        disablePadding: true,
        label: 'Currency',
    },
    {
        id: 'total',
        disablePadding: false,
        label: 'Total',
    },
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

interface EnhancedTableToolbarProps {
    numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Items Table
                </Typography>
            )}
            {numSelected > 0 && (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

export default function EnhancedTable() {
    const [order, setOrder] = React.useState<Order>('desc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('delivery_date');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const data = useAppSelector((state) => state.table.data)
    const searchData = useAppSelector((state) => state.search.searchData)

    const rows = useMemo(() => {
        const rows: Data[] = []
        data.map((item) => {
            const { id, name, status, sum, qty, volume, delivery_date, currency } = item
            rows.push(createData(id, name, status, sum, qty, volume, delivery_date, currency))
        })
        return rows
    }, [data])

    console.log('searchData', searchData)
    console.log('rows', rows)

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'desc';
        setOrder(isAsc ? 'asc' : 'desc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const sortRows = rows.sort(getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    let sortRowsWithSearch;

    useEffect(() => {
        if (searchData.column !== '' && searchData.text !== '') {
            // sortRowsWithSearch = sortRows.filter((item) => item[searchData.column] != searchData.text)
    }
    }, [])

    console.log('sortRows', sortRows)

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {sortRows.map((row, index) => {
                                const isItemSelected = isSelected(row.name);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.name)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.name}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                        >
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="left">{row.status}</TableCell>
                                        <TableCell align="left">{row.sum}</TableCell>
                                        <TableCell align="left">{row.qty}</TableCell>
                                        <TableCell align="left">{row.volume}</TableCell>
                                        <TableCell align="left">{row.delivery_date}</TableCell>
                                        <TableCell align="left">{row.currency}</TableCell>
                                        <TableCell align="left">{row.total} {row.currency}</TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow key="footer">
                                <TableCell colSpan={headCells.length - 1} />
                                <TableCell align="left" padding="none" sx={{ fontSize: 'default', py: 2 }}>
                                    Total qty: {rows.reduce((acc, el) => acc + el.qty, 0)}
                                </TableCell>
                                <TableCell align="left" padding="none" sx={{ fontSize: 'default', py: 2 }}>
                                    Total volume: {rows.reduce((acc, el) => acc + el.volume, 0)}
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}