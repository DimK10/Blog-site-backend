import axios from 'axios';
import {
    GET_POSTS,
    POST_ERROR,
    GET_POST,
    GET_POST_IMAGE,
    CREATE_POST,
    UPDATE_POST,
} from './types';
import { setAlert } from './alert';
import { body } from 'express-validator/check';

// Get posts
export const getPosts = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/posts/all');

        dispatch({
            type: GET_POSTS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// Get post
export const getPost = (postId) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/post/${postId}`);

        dispatch({
            type: GET_POST,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// Get post's image
export const getPostImage = (postId) => async (dispatch) => {
    try {
        const config = {
            responseType: 'arraybuffer',
        };
        let res = await axios.get(`/api/post/image/${postId}`, config);

        let base64Url = new Buffer(res.data, 'binary').toString('base64');

        dispatch({
            type: GET_POST_IMAGE,
            payload: base64Url,
        });
    } catch (err) {
        console.error(err);
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// Create a new post
export const createNewPost = (userId, formData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        let res = await axios.post(
            `/api/post/create/${userId}`,
            formData,
            config
        );

        dispatch({
            type: CREATE_POST,
            payload: res.data,
        });

        dispatch(setAlert('Your post was created successfully!', 'success'));
    } catch (err) {
        console.error(err);
        dispatch({
            type: POST_ERROR,
            msg: err.response.statusText,
            status: err.response.status,
        });
    }
};

export const updatePost = (postId, userId, formData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        await axios.put(
            `/api/update-post/${postId}/${userId}`,
            formData,
            config
        );

        dispatch({
            type: UPDATE_POST,
        });

        dispatch(setAlert('Your post was updated successfully!', 'success'));
    } catch (err) {
        console.error(err);
        dispatch({
            type: POST_ERROR,
            msg: err.response.statusText,
            status: err.response.status,
        });
    }
};
