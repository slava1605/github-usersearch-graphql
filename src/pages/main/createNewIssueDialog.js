import React, { useState } from "react";
import {  useSelector } from '../../redux/store';
import InputField from "../../components/inputField";
import TextArea from "../../components/textArea";
import Modal from "../../components/modal.js";
import Button from "../../components/button";

const CreateNewIssueDialog = ({ isOpen, onOk, onCancel }) => {
	const { currentRepository } = useSelector(state => state.userList);
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
			<Modal isOpen={isOpen} onOk={onOk} onCancel={onCancel} title={"New Issue"}>
				{error && <div className="bg-red-400">{error}</div>}
				<div className="flex flex-col">
					<InputField
						value={title}
						onChange={handleTitle}
						placeholder="Title..."
					/>
					<TextArea
						value={description}
						onChange={handleDescription}
						placeholder="Description..."
					/>
				</div>
				<div className="pl-4 pr-4 flex justify-between">
					<Button className="mb-3 w-20" onClick={handleOk}>OK</Button>
					<Button className="mb-3 w-20" onClick={onCancel}>Cancel</Button>
				</div>
			</Modal>
		</>
	)
};

export default CreateNewIssueDialog;
