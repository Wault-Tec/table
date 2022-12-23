import React, { 
    useState, 
    useEffect,
    useMemo 
} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';

import {headCells} from 'src/components/Table/Table';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { setSearchData } from 'src/store/slices/searchDataSlice';
import { Data } from 'src/type';
import { createData } from 'src/components/Table/Table';

 export const Search: React.FC = () => {
    const [column, setColumn] = useState<string>('')
    const [text, setText] = useState<string | null>(null)
    const data = useAppSelector((state) => state.table.data)
    const dispatch = useAppDispatch()

    //TODO: DRY
    const rows = useMemo(() => {
        const rows: Data[] = []
        for (let key in data) {
            data[key].map((item) => {
                rows.push(createData(item))
            })
        }
        return rows
    }, [data])
 
    const columnOptions: string[] = []
    if (column && rows) {
        if(column !== 'all') {
            rows.forEach((item) => {
                const option = item[column as keyof Data].toString()
                if(!columnOptions.includes(option)) {
                    columnOptions.push(option)
                }
            })
        } else {
            rows.forEach((item) => {
                Object.entries(item).forEach((optionArr) => {
                    const option: string = optionArr[1].toString();
                    if ( 
                            optionArr[0] !== 'id' && 
                            !columnOptions.includes(option)
                        ) 
                    {
                        columnOptions.push(option)
                    }
                })
            })
        }
    }
   
    const handleSelectChange = (event: SelectChangeEvent) => {
        setText(null);
        setColumn(event.target.value as string);
    };

    useEffect(() => {
        if(column) {
            dispatch(setSearchData({
                column,
                text
            }))
        }
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
                    <MenuItem key={'all'} value={'all'}>All</MenuItem>
                    {headCells.map((column) => (
                        <MenuItem key={column.id} value={column.id}>{column.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Box
                component="form"
                sx={{
                    '& > :not(style)': { py: 1, width: 400 },
                }}
                noValidate
                autoComplete="off"
            >
                <Autocomplete
                    disablePortal
                    clearOnBlur
                    clearOnEscape
                    disabled={column === ''}
                    id="search-box"
                    options={columnOptions}
                    value={text}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault()
                        }
                    }}
                    onChange={(e: any, newText: string | null) => {
                        setText(newText);
                    }}
                    renderInput={(params) => <TextField {...params} label="Search" />}
                />
            </Box>
        </Box>
    );
}