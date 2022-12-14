import { createSlice} from '@reduxjs/toolkit';
import {SearchData} from 'src/type';

type InitialState = {
    searchData: SearchData
}

const initialState: InitialState = {
    searchData: {
        column: null,
        text: ''
    }
}

const dataSlice = createSlice({
    name: 'searchData',
    initialState,
    reducers: {
        setSearchData(state, action) {
            state.searchData= action.payload
        },
        // getSearchData(state) {
        //     return state  
        // },
    }
})

export const {setSearchData} = dataSlice.actions;

export default dataSlice.reducer