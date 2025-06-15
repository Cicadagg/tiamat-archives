export const FETCH_TAGS: string = 'FETCH_TAGS';
export const ADD_TAG: string = 'ADD_TAG';
export const REMOVE_TAG: string = 'REMOVE_TAG';
export const CLEAR_TAGS: string = 'CLEAR_TAGS';

export type GuideTagInterface = {
    Id: string,
    nameRu: string,
    nameEn: string
}

export const fetchTags = (tags: GuideTagInterface[]) => ({
    type: FETCH_TAGS,
    payload: tags
});

export const addTag = (tagId: string) => ({
    type: ADD_TAG,
    payload: tagId,
});

export const removeTag = (tagId: string) => ({
    type: REMOVE_TAG,
    payload: tagId,
});

export const clearTags = () => ({
    type: CLEAR_TAGS,
});

const initialState = {
    allTags: [],
    selectedTags: [],
};

export type TagsState = {
    allTags: GuideTagInterface[],
    selectedTags: string[]
}

const tagsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case FETCH_TAGS:
            return {
                ...state,
                allTags: [...state.allTags, ...action.payload],
            };

        case ADD_TAG:
            return {
                ...state,
                selectedTags: [...state.selectedTags, action.payload],
            };
        case REMOVE_TAG:
            return {
                ...state,
                selectedTags: state.selectedTags.filter(tag => tag !== action.payload),
            };
        case CLEAR_TAGS:
            return {
                ...state,
                selectedTags: [],
            };
        default:
            return state;
    }
};

export default tagsReducer;
