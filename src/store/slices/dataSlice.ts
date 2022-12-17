import { 
    createSlice, 
    createAsyncThunk
} from '@reduxjs/toolkit';
import { getRequest } from '../../api/firebaseApi';
import {Data, StoreData} from '../../type';

export const fetchData = createAsyncThunk<StoreData>(
    'data/fetchData',
    async function() {
        const data_1 = await getRequest('documents1')
        const data_2 = await getRequest('documents2')
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