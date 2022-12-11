import React, { useEffect } from 'react';
import { useAppDispatch } from './hooks'

import './App.css';
import Search from './components/Search/Search';
import EnhancedTable from './components/Table/Table';
import {fetchData} from './store/slices/dataSlice';

const App: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchData())
    },[])


    return (
        <div className='wrapper'>
            <Search />
            <EnhancedTable />
        </div>
    );
}

export default App;
