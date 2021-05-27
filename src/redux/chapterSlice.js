import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getChaptersOfManga } from '../api/mangadex';
import { chapterListParser } from '../parser/ApiMangaDetailsParser';

const initialState = {
  isFetching: false,
  chapterList: [],
  errorMessage: null,
  totalChapter: 0,
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
      const { results, total } = responseChapters.data;
      const chapterList = chapterListParser(results);
      return { chapterList, total };
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
export const selectChapterListLength = (state) =>
  state.chapter.chapterList.length;
export const selectChapterListTotal = (state) => state.chapter.totalChapter;
export const selectErrorMessage = (state) => state.chapter.errorMessage;

const chapterSlice = createSlice({
  name: 'chapter',
  initialState: initialState,
  reducers: {
    clearChapterList(state, _) {
      state.chapterList.length = 0;
      state.totalChapter = 0;
    },
  },
  extraReducers: {
    [getChapterList.pending]: (state, _) => {
      state.isFetching = true;
    },
    [getChapterList.fulfilled]: (state, { payload }) => {
      const { chapterList, total } = payload;
      state.isFetching = false;
      state.chapterList = [...state.chapterList, ...chapterList];
      state.totalChapter = total;
    },
    [getChapterList.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.errorMessage = payload;
    },
  },
});

export const { clearChapterList } = chapterSlice.actions;

export default chapterSlice.reducer;
