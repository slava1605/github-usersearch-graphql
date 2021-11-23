import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from 'axios';
import { ajaxUrl } from '../../config';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  userList: [],
	repositories: [],
	currentUser: null,
	currentRepository: null,
	issueList: [],
	totalUser: 0,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET USERS
    getUserListSuccess(state, action) {
      state.isLoading = false;
      state.userList = action.payload.current;
			state.totalUser = action.payload.total;
    },

		getRepositoriesSuccess(state, action) {
			state.isLoading = false;
			state.repositories = action.payload;
		},

		getIssueListSuccess(state, action) {
			state.isLoading = false;
			state.issueList = action.payload;
		},

		createNewIssueSuccess(state, action) {
			state.isLoading = false;
		},

		setCurrentUser(state, action) {
			state.currentUser = action.payload;
		},

		setCurrentRepository(state, action) {
			state.currentRepository = action.payload;
		},
  }
});

// Reducer
export default slice.reducer;

export const { setCurrentUser, setCurrentRepository } = slice.actions;

// ----------------------------------------------------------------------

export function searchUsers(searchKey, after) {
	const AccessToken = process.env.REACT_APP_API_TOKEN;
	const afterQuery = after ? `, after: "${after}"`: '';

	const userSearchMutation = `
	{
		search(query: "${searchKey}", type: USER, first: 50 ${afterQuery}) {
			userCount
			edges {
				cursor
				node {
					... on User {
						login
						name
						avatarUrl
						location
						email
						company
					}
				}
			}
		}
	}`;

  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`${ajaxUrl}`,
				{
					query: userSearchMutation,
					variables: {
						searchKey: searchKey,
						name: 'slava1605'
					},
				},
				{
					headers: {
						Authorization: "bearer " + AccessToken,
						"Content-Type": "application/json",
					}
				},
			);
			console.log(response);
      dispatch(slice.actions.getUserListSuccess({
				current: response.data.data.search.edges,
				total: response.data.data.search.userCount
			}));
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  };
}

export function getRepositories(login) {
	const AccessToken = process.env.REACT_APP_API_TOKEN;

	const getRopositoriesMutation = `
	{
		user(login: "${login}") {
			repositories(last: 50) {
				repos: nodes {
					id
					name
					url
					stargazers {
						totalCount
					}
					watchers {
						totalCount
					}
				}
			}
		}
	}`;

  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`${ajaxUrl}`,
				{
					query: getRopositoriesMutation,
				},
				{
					headers: {
						Authorization: "bearer " + AccessToken,
						"Content-Type": "application/json",
					}
				},
			);
      dispatch(slice.actions.getRepositoriesSuccess(response.data.data.user.repositories.repos));
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  };
}

export function getIssueList(owner, name) {
	const AccessToken = process.env.REACT_APP_API_TOKEN;
	console.log(name)
	const getRopositoriesMutation = `
	{
		repository(owner: "${owner}", name: "${name}") {
			description
			url
			issues(states:[OPEN], first:100){
				nodes{
					title
					body
					state
					url
					comments(first:2){
						nodes{
							url
							body
							createdAt
						}
						pageInfo{
							hasNextPage
							endCursor
						}
					}
				}
				pageInfo{
					 endCursor
					 hasNextPage
				}
			}
			milestones(states: [OPEN],first:2) {
				nodes{
					title
					description
					url
					issues(states:[OPEN], first:2){
						nodes{
							title
							state
							url
							comments(first:2){
								nodes{
									url
									body
									createdAt
								}
								pageInfo{
									hasNextPage
									endCursor
								}
							}
						}
						pageInfo{
							 endCursor
							 hasNextPage
						}
					}
				}
				pageInfo{
					endCursor
					hasNextPage
				}
			}
		}
	}`;

  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`${ajaxUrl}`,
				{
					query: getRopositoriesMutation,
				},
				{
					headers: {
						Authorization: "bearer " + AccessToken,
						"Content-Type": "application/json",
					}
				},
			);
			console.log('issue list', response);
      dispatch(slice.actions.getIssueListSuccess(response.data.data.repository.issues.nodes));
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  };
}

export function createNewIssue(id, title, description) {
	const AccessToken = process.env.REACT_APP_API_TOKEN;

	console.log(id, title, description);

	const createNewIssueMutation = `
	mutation {
		createIssue(input: {repositoryId: "${id}", title: "${title}", body: "${description}"}) {
			issue{
				title,
				body,
			}
		}
	}`;

  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`${ajaxUrl}`,
				{
					query: createNewIssueMutation,
				},
				{
					headers: {
						Authorization: "bearer " + AccessToken,
						"Content-Type": "application/json",
					}
				},
			);
			console.log('create new', response);
      dispatch(slice.actions.createNewIssueSuccess(response.data.data.user.repositories.repos));
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  };
}
