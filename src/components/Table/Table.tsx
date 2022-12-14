import React, { useEffect, useState, useMemo } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
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
import { visuallyHidden } from '@mui/utils';
import { useAppSelector } from 'src/hooks';
import { Data, HeadCell, Order, EnhancedTableProps, EnhancedTableToolbarProps } from 'src/type';
import {AlertDialog} from '../AlertDialog/AlertDialog';

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

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected, clearSelected } = props;

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
                    Table Name
                </Typography>
            )} 
            {numSelected > 0 && (
                    <Button 
                        variant="outlined"
                        onClick={() => {
                            clearSelected()
                          }}
                    >
                        Clear selected
                    </Button>
            )}
        </Toolbar>
    );
}

export const EnhancedTable: React.FC = () => {
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Data>('delivery_date');
    const [selected, setSelected] = useState<string[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortRows, setSortRows] = useState<Data[]>([]);
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

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'desc';
        setOrder(isAsc ? 'asc' : 'desc');
        setOrderBy(property);
    };

    const clearSelected = () => {
        setSelected([])
    }

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = sortRows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }

        clearSelected()
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
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

    const isSelected = (id: string) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    let sortRowsWithTable: Data[];

    useEffect(() => {
        sortRowsWithTable = rows.sort(getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        setSortRows(sortRowsWithTable)
        
        const column = searchData.column as keyof Data
        if (column && searchData.text) {
            setSortRows(sortRowsWithTable.filter((item) => item[column].toString().toLowerCase().includes(searchData.text.toLowerCase())))
        }
    }, [searchData, rows, page, order, orderBy])

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} clearSelected={clearSelected}/>
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
                            rowCount={sortRows.length}
                        />
                        <TableBody>
                            {sortRows.map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
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
                                    <TableCell colSpan={9} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow key="footer">
                                <TableCell colSpan={headCells.length - 1} />
                                <TableCell align="left" padding="none" sx={{ fontSize: 'default', py: 2 }}>
                                    Total qty: {sortRows.reduce((acc, el) => acc + el.qty, 0)}
                                </TableCell>
                                <TableCell align="left" padding="none" sx={{ fontSize: 'default', py: 2 }}>
                                    Total volume: {sortRows.reduce((acc, el) => acc + el.volume, 0)}
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
                {rows.length > 0 && sortRows.length === 0 && !!searchData.column && !!searchData.text && (
                    <Box sx={{color: 'red', ml: 2, mt: 1}}>
                        Data not found!
                    </Box>
                )}
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
            <AlertDialog selected={selected} rows={rows}/>
        </Box>
    );
}