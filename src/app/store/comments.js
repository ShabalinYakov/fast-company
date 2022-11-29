import commentService from "../services/comment.service";
import { createAction, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { getCurrentUserId } from "./users";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        },
        commentCreated: (state, action) => {
            state.entities.push(action.payload);
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceived,
    commentsRequestFailed,
    commentRemoved,
    commentCreated
} = actions;

const commentRequestRemoved = createAction("comments/commentRemoveRequested");
const commentRequestCreated = createAction("comments/commentCreateRequested");

export const removeComment = (id) => async (dispatch) => {
    dispatch(commentRequestRemoved());
    try {
        const { content } = await commentService.removeComment(id);
        if (content === null) {
            dispatch(commentRemoved(id));
        }
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const createComment = (data) => async (dispatch, getState) => {
    dispatch(commentRequestCreated());
    try {
        const comment = {
            ...data,
            _id: nanoid(),
            created_at: Date.now(),
            userId: getCurrentUserId()(getState())
        };
        const { content } = await commentService.createComment(comment);
        dispatch(commentCreated(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getcCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;
export const getCommentsById = (id) => (state) => {
    if (state.comments.entities) {
        return state.comments.entities.find((p) => p._id === id);
    }
};

export default commentsReducer;
