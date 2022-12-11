import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { getRequest } from '../../api/firebaseApi';
import {Data} from '../../type';

export const fetchData = createAsyncThunk<Data[]>(
    'data/fetchData',
    async function() {
        const data = await getRequest()
        return data
    }
)

type InitialState = {
    data: Data[]
}

const initialState: InitialState = {
    data: []
}

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        // getData(state, action) {
        //     return state
        // },
        // removeData(state, action) {

        //     state.data.filter((item) => item.id !== action.payload)
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})

// export const {} = dataSlice.actions;

export default dataSlice.reducer