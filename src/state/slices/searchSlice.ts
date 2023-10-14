import { Dispatch, PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOne, search } from "../../api/api";
import { Book, BooksList, BooksListItem } from "../../types/types";
import { GetThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";

export enum FetchStatus {
    loading = 'loading',
    done = 'done'
}

type AsyncThunkConfig = {
    /** return type for `thunkApi.getState` */
    state?: unknown
    /** type for `thunkApi.dispatch` */
    dispatch?: Dispatch
    /** type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra` */
    extra?: unknown
    /** type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload` */
    rejectValue?: unknown
    /** return type of the `serializeError` option callback */
    serializedErrorType?: unknown
    /** type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta` */
    pendingMeta?: unknown
    /** type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta` */
    fulfilledMeta?: unknown
    /** type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta` */
    rejectedMeta?: unknown
  }

// --- Санки ----------------------------------------

async function request(
    searchObj: {
        searchStr: string,
        category: string | null,
        sort: string,
        pageNumber: number,
        paginationStep: number

    }, thunkAPI: GetThunkAPI<AsyncThunkConfig>) {
    try {
        let { searchStr, category, sort, pageNumber, paginationStep } = searchObj
        if (category === 'all') category = null
        let response = await search(searchStr, category, sort, pageNumber, paginationStep)
        return thunkAPI.fulfillWithValue(response as BooksList);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
}

export const searchBooks = createAsyncThunk('search/searchBooks', request)

export const loadMore = createAsyncThunk('search/loadMore', request)

export const getBookDetail = createAsyncThunk('search/getBookDetail', async (bookId: string, thunkAPI) => {
    try {

        let response = await getOne(bookId)
        return response as Book
    } catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
})


// --- Конец - Санки ----------------------------------------

interface searchState {
    status: FetchStatus,
    searchStr: string,
    catsArr: string[],
    sortArr: string[],
    cat: string,
    sort: string,
    count: number | null,
    paginationStep: number,
    pageNumber: number,
    noResults: boolean,
    bookDetail: Book | null,
    bookDetailStatus: FetchStatus,
    entities: BooksListItem[],
    listError: boolean,
    loadMoreError: boolean
    detailError: boolean
}

let initialState: searchState
    =
{
    status: FetchStatus.done,
    searchStr: '',
    catsArr: ['all', 'art', 'biography', 'computers', 'history', 'medical', 'poetry'],
    sortArr: ['relevance', 'newest'],
    cat: 'all',
    sort: 'relevance',
    count: null,
    paginationStep: 30,
    pageNumber: 0,
    noResults: false,
    bookDetail: null,
    bookDetailStatus: FetchStatus.done,
    entities: [],
    listError: false,
    loadMoreError: false,
    detailError: false
}

// --- Редьюсер ----------------------------------------
export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchStr: (state, action: PayloadAction<string>) => {
            state.searchStr = action.payload
        },
        setCat: (state, action: PayloadAction<string>) => {
            state.cat = action.payload
        },
        setSort: (state, action: PayloadAction<string>) => {
            state.sort = action.payload
        },
        claerBooksList: (state) => {
            state.entities = []
        },
        setPageNumber: (state, action: PayloadAction<number>) => {
            state.pageNumber = action.payload
        },
        clearBookDetail: (state) => {
            state.bookDetail = null
        },
        setNoResults: (state) => {
            state.noResults = !state.noResults
        }
    },
    extraReducers: builder => {
        builder
            // Загрузка из поиска
            .addCase(searchBooks.pending, (state) => {
                state.listError = false;
                state.status = FetchStatus.loading
            })
            .addCase(searchBooks.fulfilled, (state, action) => {

                if (action.payload.items) {
                    state.noResults = false
                    state.entities = action.payload.items
                    state.count = action.payload.totalItems
                    state.pageNumber = 1
                } else if (action.payload.totalItems === 0) {
                    state.noResults = true
                }

                state.status = FetchStatus.done
            })
            .addCase(searchBooks.rejected, (state, action) => {
                state.status = FetchStatus.done;
                state.listError = true;
            })

            // Загрузка из Load More

            .addCase(loadMore.pending, (state) => {
                state.loadMoreError = false;
                state.status = FetchStatus.loading
            })
            .addCase(loadMore.fulfilled, (state, action) => {

                if (action.payload.items) {
                    state.entities = [...state.entities, ...action.payload.items]
                    state.count = action.payload.totalItems
                    ++state.pageNumber
                }

                state.status = FetchStatus.done
            })
            .addCase(loadMore.rejected, (state, action) => {
                state.status = FetchStatus.done;
                state.loadMoreError = true;
            })

            // Загрузка из Детальной информации

            .addCase(getBookDetail.pending, (state) => {
                state.detailError = false;
                state.bookDetailStatus = FetchStatus.loading
            })
            .addCase(getBookDetail.fulfilled, (state, action) => {
                state.bookDetail = action.payload
                state.bookDetailStatus = FetchStatus.done
            })
            .addCase(getBookDetail.rejected, (state, action) => {
                state.bookDetailStatus = FetchStatus.done;
                state.detailError = true;
            })
    }
})

// --- Конец - Редьюсер ----------------------------------------

export const { claerBooksList, setSearchStr, setPageNumber, clearBookDetail, setCat, setSort, setNoResults } = searchSlice.actions

export default searchSlice.reducer