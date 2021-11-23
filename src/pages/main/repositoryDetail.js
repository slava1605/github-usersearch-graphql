import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from '../../redux/store';
import { getIssueList, createNewIssue } from '../../redux/slices/userList';
import { ReactComponent as LeftIcon } from '../../icons/left.svg';
import CreateNewIssueDialog from "./createNewIssueDialog";
import Button from "../../components/button";

const calcDate = (t) => {
	const today = new Date();
	const createdAt = new Date(t);
	const passed = today - createdAt;
	if (passed < 3600000) {
		return `${Math.floor(passed / 60000)} minutes ago`;
	} else if (passed < 3600000 * 24) {
		return `${Math.floor(passed / 3600000)} hours ago`;
	} else if (passed < 3600000 * 24 * 30) {
		return `${Math.floor(passed / 3600000 / 24)} days ago`;
	} else if (passed < 3600000 * 24 * 365) {
		return `${Math.floor(passed / 3600000 / 24 / 30 )} months ago`;
	} else {
		return `${Math.floor(passed / 3600000 / 24 / 365 )} years ago`;
	}
};

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
			
			{issueList && <div className="border shadow-sm rounded mt-4 min-h-300 overflow-x-hidden max-h-500 overflow-y-scroll w-full">
				<table className="table-auto">
					<thead className="bg-gray-200 max-h-20">
						<tr>
							<td className="max-h-20 ">Issue</td>
							<td className="max-h-20">Description</td>
							<td className="max-h-20">CreateAt</td>
							{/* <td className="max-h-20">Author</td> */}
						</tr>
					</thead>
					<tbody>
						{issueList.map((issue, idx) => (
							<tr
								className="hover:bg-blue-400 p-2 w-full"
								key={`issue_${idx}`}
							>
								{/* <div className="flex"> */}
									<td className="font-bold mr-3 max-w-200">{issue.title}</td>
									<td className="overflow-clip">{issue.body}</td>
									<td className="">created {calcDate(issue.createdAt)} by {issue.author.login}</td>
									{/* <td className="">{}</td> */}
								{/* </div> */}
							</tr>
						))}
					</tbody>
				</table>
			</div>}
		</div>
	)
};

export default RepositoryDetail;
