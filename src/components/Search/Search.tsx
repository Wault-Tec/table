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
    const dispatch = useAppDispatch();
    const [column, setColumn] = useState('');
    const [text, setText] = useState<string | null>('');
    const data = useAppSelector((state) => state.table.data)

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
    if (column) {
        rows.forEach((item) => {
            const option = item[column as keyof Data].toString()
            if(!columnOptions.includes(option)) {
                columnOptions.push(option)
            }
        })
    }
    console.log('columnOptions', columnOptions)






    const handleSelectChange = (event: SelectChangeEvent) => {
        setText('');
        setColumn(event.target.value as string);
    };

    const handleInputChange = (event: any) => {
        console.log('event.target.value', event.target.value)
        setText(event.target.value);
    };

    useEffect(() => {
        if(column) {
            dispatch(setSearchData({
                column,
                text
            }))
        }
    },[column, text])
    console.log('text', text)
   
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
                    '& > :not(style)': { my: 1, width: 400 },
                }}
                noValidate
                autoComplete="off"
            >
                {/* <TextField
                    disabled={column === ''}
                    id="outlined-name"
                    label="Search"
                    value={text}
                    onChange={handleInputChange}
                /> */}
                    <Autocomplete
                        disablePortal
                        disabled={column === ''}
                        id="combo-box-demo"
                        options={columnOptions}
                        value={text}
                        onChange={(event: any, text: string | null) => {
                            setText(text);
                          }}
                        renderInput={(params) => <TextField {...params} label="Search" />}
                    />
            </Box>
        </Box>
    );
}