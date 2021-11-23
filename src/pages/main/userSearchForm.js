import React, { useState } from "react";
import { useDispatch, useSelector } from '../../redux/store';
import { searchUsers } from '../../redux/slices/userList';
import InputField from '../../components/inputField';
import Button from '../../components/button';

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
				<InputField
					className="border-solid border-2 border-black mr-3"
					placeholder="Search Users..."
					onChange={handleChange}
					onKeyDown={handleKeyDown}
				/>
				<Button
					className="border-gray-400 p-1"
					onClick={handleSubmit}
				>
					Search
				</Button>
			</div>
			{/* {error && <div className="text-red-400">
				<p>Search Error</p>
			</div>} */}
		</div>
	)
};

export default UserSearchForm;
