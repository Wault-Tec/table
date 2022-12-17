import { 
    createSlice, 
    createAsyncThunk
} from '@reduxjs/toolkit';

import { getRequest } from 'src/api/firebaseApi';
import {Data, StoreData} from 'src/type';
import {
    endpoint_1, 
    endpoint_2, 
    } from 'src/api/firebaseApi';

export const fetchData = createAsyncThunk<StoreData>(
    'data/fetchData',
    async function() {
        const data_1 = await getRequest(endpoint_1)
        const data_2 = await getRequest(endpoint_2)
            return {
                'data_1': data_1,
                'data_2': data_2
            }
    }
)

type InitialState = {
    data: {
        [key: string]: Data[]
    }
}

const initialState: InitialState = {
    data: {
        'data_1': [],
        'data_2': []
    }
}

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})

export default dataSlice.reducer