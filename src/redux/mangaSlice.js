import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCurrentFollowedMangas } from '../api/mangadex';
import { apiMangaListParser } from '../parser/ApiMangaListParser';

const initialState = {
  isFetching: false,
  mangaList: null,
  errorMessage: null,
  selectedManga: null,
};

export const getFollowedMangas = createAsyncThunk(
  'manga/getFollowedMangas',
  async (_, { rejectedWithValue }) => {
    try {
      const response = await getCurrentFollowedMangas();
      console.log('in async thunk');
      return apiMangaListParser(response.data.results);
    } catch (e) {
      if (e.response) {
        const { status, statusText, data } = e.response;
        console.log('action get manga', e.response);
        return rejectedWithValue(status + ' ' + statusText);
      } else if (e.request) {
        console.log('action get manga ', e.request);
        return rejectedWithValue("error in get user's manga");
      } else {
        console.log('action get manga', e.message);
        return rejectedWithValue(e.message);
      }
    }
  },
);

export const selectMangaLists = (state) => state.manga.mangaList;
export const selectIsFetchingManga = (state) => state.manga.isFetching;
export const selectErrorMessage = (state) => state.manga.errorMessage;
export const selectSelectedManga = (state) => state.manga.selectedManga;
export const selectIsMangas = (state) => !!state.manga.mangaList;

const mangaSlice = createSlice({
  name: 'manga',
  initialState: initialState,
  reducers: {
    setSelectedManga(state, action) {
      const { mangaId } = action.payload;
      state.selectedManga = state.mangaList.find(
        (manga) => manga.mangaId === mangaId,
      );
    },
  },
  extraReducers: {
    [getFollowedMangas.pending]: (state, _) => {
      state.isFetching = true;
    },
    [getFollowedMangas.fulfilled]: (state, { payload }) => {
      state.mangaList = payload;
      state.isFetching = false;
    },
    [getFollowedMangas.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.errorMessage = payload;
    },
  },
});

export const { setSelectedManga } = mangaSlice.actions;

export default mangaSlice.reducer;
