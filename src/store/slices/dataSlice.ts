import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { getRequest } from '../../api/firebaseApi';
import {Data} from '../../type';

export const fetchData = createAsyncThunk<[Data[], Data[]]>(
    'data/fetchData',
    async function() {
        const data_1 = await getRequest('documents1')
        const data_2 = await getRequest('documents2')
        return [data_1, data_2]
    }
)

type InitialState = {
    data: [Data[], Data[]]
}

const initialState: InitialState = {
    data: [[], []]
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