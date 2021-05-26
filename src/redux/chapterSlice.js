import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getChaptersOfManga } from '../api/mangadex';
import { chapterListParser } from '../parser/ApiMangaDetailsParser';

const initialState = {
  isFetching: false,
  chapterList: null,
  errorMessage: null,
};

export const getChapterList = createAsyncThunk(
  'chapter/getChapterList',
  async (
    { mangaId, limit, translatedLanguage, offset },
    { rejectedWithValue },
  ) => {
    try {
      const responseChapters = await getChaptersOfManga(mangaId, {
        limit,
        translatedLanguage,
        offset,
      });
      return chapterListParser(responseChapters.data.results);
    } catch (e) {
      console.log('in get chapters');
      if (e.response) {
        console.log(e.response);
        return rejectedWithValue(
          e.response.status + ' ' + e.response.statusText,
        );
      } else if (e.request) {
        return rejectedWithValue('error in request');
      } else {
        console.log('chpater slice ', e);
        return rejectedWithValue('internal error');
      }
    }
  },
);

export const selectIsFetchingChapters = (state) => state.chapter.isFetching;
export const selectChapterList = (state) => state.chapter.chapterList;
export const selectErrorMessage = (state) => state.chapter.errorMessage;

const chapterSlice = createSlice({
  name: 'chapter',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getChapterList.pending]: (state, _) => {
      state.isFetching = true;
    },
    [getChapterList.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.chapterList = payload;
    },
    [getChapterList.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.errorMessage = payload;
    },
  },
});

export default chapterSlice.reducer;
