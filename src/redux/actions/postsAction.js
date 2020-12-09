import { ADD_NEW_POST } from '../constants/actionsTypes';

export const addNewPost = (post) => {
	return {
		type: ADD_NEW_POST,
		payload: post
	}
}