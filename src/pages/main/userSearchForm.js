import React, { useState } from "react";
import { useDispatch, useSelector } from '../../redux/store';
import { searchUsers } from '../../redux/slices/userList';

const UserSearchForm = ({}) => {
	const { userList, isLoading, error } = useSelector(state => state.userList);
	const dispatch = useDispatch();
	const [key, setKey] = useState('');

	const handleChange = (e) => {
		setKey(e.target.value);
	};

	const handleSubmit = async () => {
		await dispatch(searchUsers(key));
		// setKey('');
	};

	const handleKeyDown = (e) => {
		if (e.keyCode == 13) {
			handleSubmit();
		}
	};

  return (
		<div className="flex flex-col">
			<div className="flex justify-center">
				<input
					className="border-solid border-2 rounded-md border-black mr-3"
					placeholder="Search Users..."
					onChange={handleChange}
					onKeyDown={handleKeyDown}
				/>
				<button
					className="border-solid border rounded-md border-gray-400 shadow-md p-1"
					onClick={handleSubmit}
				>
					Search
				</button>
			</div>
			{/* {error && <div className="text-red-400">
				<p>Search Error</p>
			</div>} */}
		</div>
	)
};

export default UserSearchForm;
