import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from '../redux/store';
import { getIssueList, createNewIssue } from '../redux/slices/userList';
import { ReactComponent as LeftIcon } from '../icons/left.svg';

const CreateNewIssueDialog = ({ isOpen, onOk, onCancel }) => {
	const { currentRepository, issueList } = useSelector(state => state.userList);
	const dispatch = useDispatch();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [error, setError] = useState('');

	const handleTitle = (e) => {
		setTitle(e.target.value);
		setError('');
	};

	const handleDescription = (e) => {
		setDescription(e.target.value);
		setError('');
	};

	const handleOk = () => {
		if (title === '') {
			setError ('Title is required');
			return;
		}

		if (description === '') {
			setError ('Description is required');
			return;
		}
		onOk(currentRepository?.id, title, description);
	}

	return (
		<>
			{isOpen && 
				<div className="flex items-center justify-center rounded-md">
					<div className="fixed w-full h-full opacity-40 bg-gray-400 top-0 left-0 z-2"></div>
					<div className="w-2/3 opacity-100 bg-white z-50 shadow-md rounded-md">
						<div className="border-b pl-2">
							New Issue
						</div>
						{error && <div className="bg-red-400">{error}</div>}
						<div className="flex flex-col">
							<input
								className="border rounded-sm m-4"
								value={title}
								onChange={handleTitle}
								placeholder="Title..."
							/>
							<textarea
								className="border rounded-sm m-4"
								value={description}
								onChange={handleDescription}
								placeholder="Description..."
							></textarea>
						</div>
						<div className="pl-4 pr-4 flex justify-between">
							<button className="mb-3 border w-20 shadow-md rounded-md" onClick={handleOk}>OK</button>
							<button className="mb-3 border w-20 shadow-md rounded-md" onClick={onCancel}>Cancel</button>
						</div>
					</div>
				</div>
			}
		</>
	)
};

export default CreateNewIssueDialog;
