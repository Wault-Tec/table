import React, { useEffect } from 'react';
import { useAppDispatch } from 'src/hooks'
import 'src/style.scss';
import {Search} from 'src/components/Search/Search';
import {EnhancedTable} from 'src/components/Table/Table';
import {fetchData} from 'src/store/slices/dataSlice';

export const App: React.FC = () => {
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
