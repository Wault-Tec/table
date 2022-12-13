import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {headCells} from '../Table/Table';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSearchData } from '../../store/slices/searchDataSlice'

 const Search: React.FC = () => {
    const [column, setColumn] = useState('');
    const [text, setText] = useState('');

    const handleSelectChange = (event: SelectChangeEvent) => {
        setText('');
        setColumn(event.target.value as string);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setSearchData({
            column,
            text
        }))
    },[column, text])

    return (
        <Box sx={{ width: 400, ml: 'auto'}}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select column</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={column}
                label="Select column"
                onChange={handleSelectChange}
                >
                    {headCells.map((column) => (
                        <MenuItem key={column.id} value={column.id}>{column.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Box
                component="form"
                sx={{
                    '& > :not(style)': { my: 1, width: 400 },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    disabled={column === ''}
                    id="outlined-name"
                    label="Search"
                    value={text}
                    onChange={handleInputChange}
                />
            </Box>
        </Box>
    );
}

export default Search