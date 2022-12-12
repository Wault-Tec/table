import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './slices/dataSlice';
import searchDataSlice from './slices/searchDataSlice'

const idProd = process.env.MODE !== 'development'

export const store = configureStore({
    reducer: {
        table: dataReducer,
        search: searchDataSlice,
    },
    devTools: true
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch