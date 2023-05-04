import { configureStore } from '@reduxjs/toolkit'
import { themeAction, themeSlice } from './themeSlice'
import { wordSlice } from './wordSlice'

export const store = configureStore({
  reducer: { theme: themeSlice.reducer, word: wordSlice.reducer },
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
