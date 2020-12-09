import { ADD_NEW_POST } from '../constants/actionsTypes';

const initialState = {
	userPosts: []
};

function postsReducer (state = initialState, action) {
	switch (action.type) {
		case ADD_NEW_POST :
			const newPosts = [action.payload].concat(state.userPosts);
			return {
				...state,
				userPosts: newPosts
			}

		default:
			return state;
	}
}

export default postsReducer;