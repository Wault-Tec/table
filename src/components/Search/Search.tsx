import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

 const Search: React.FC = () => {
    const [text, setText] = useState('');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };
    
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="outlined-name"
                label="Search"
                value={text}
                onChange={handleChange}
            />
        </Box>
    );
}

export default Search