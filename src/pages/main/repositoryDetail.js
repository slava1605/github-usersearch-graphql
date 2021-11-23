import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from '../../redux/store';
import { getIssueList, createNewIssue } from '../../redux/slices/userList';
import { ReactComponent as LeftIcon } from '../../icons/left.svg';
import CreateNewIssueDialog from "./createNewIssueDialog";
import Button from "../../components/button";

const RepositoryDetail = ({ goback }) => {
	const { currentRepository, currentUser, issueList } = useSelector(state => state.userList);
	const dispatch = useDispatch();
	const [isCreateNewModal, setIsCreateNewModal] = useState(false);

	const handleCreateNew = async (id, title, description) => {
		await dispatch(createNewIssue(id, title, description));
		await dispatch(getIssueList(currentUser?.node?.login, currentRepository.name));
		setIsCreateNewModal(false);
	};

  return (
		<div className="w-2/3 pt-5 mb-5 border rounded p-3 m-3 mt-10">
			<CreateNewIssueDialog
				isOpen={isCreateNewModal}
				onOk={handleCreateNew}
				onCancel={() => setIsCreateNewModal(false)}
			/>
			<div className="flex flex-col">
				<label className="">{issueList?.length} Open Iusses</label>
				<div className="flex justify-between">
					<Button
						className="w-20 h-10 p-2 pr-4"
						onClick={goback}
					>
						<LeftIcon className="h-10"/> Back
					</Button>
					<Button
						className="p-2"
						onClick={() => setIsCreateNewModal(true)}
					>
						New Issue
					</Button>
				</div>
			</div>
			{issueList && <ul className="border shadow-sm rounded mt-4 min-h-300 overflow-x-hidden max-h-500 overflow-y-scroll">
				{issueList.map((issue, idx) => (
					<li
						className="hover:bg-blue-400 p-2"
						key={`issue_${idx}`}
					>
						<div className="flex">
							<label className="font-bold mr-3">{issue.title}</label>
							<label>{issue.body}</label>
						</div>
					</li>
				))}
			</ul>}
		</div>
	)
};

export default RepositoryDetail;
