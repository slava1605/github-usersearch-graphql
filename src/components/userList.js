import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from '../redux/store';
import { ReactComponent as LeftIcon } from '../icons/left.svg';
import { ReactComponent as RightIcon } from '../icons/right.svg';
import { getRepositories, setCurrentUser, setCurrentRepository, getIssueList } from '../redux/slices/userList';
import RepositoryDetail from "./repositoryDetail";

const UserList = () => {
	const { userList, repositories, currentUser, currentRepository, isLoading, error } = useSelector(state => state.userList);
	const [currentPage, setCurrentPage] = useState(0);
	const [paginated, setPaginated] = useState([]);
	const [isDetailShow, setIsDetailShow] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		const count = userList.length % 5 === 0 ? userList.length / 5 : Math.floor(userList.length / 5) + 1;
		setPaginated(Array.apply(1, new Array(count)));
		setCurrentPage(0);
		dispatch(setCurrentUser(userList[0]));
	}, [userList]);

	useEffect(() => {
		dispatch(setCurrentUser(userList[currentPage * 5]));
	}, [currentPage]);

	useEffect(() => {
		dispatch(getRepositories(currentUser?.node?.login));
	}, [currentUser]);

	const handlePrePage = () => {
		const changed = currentPage === 0 ? 9 : currentPage - 1;
		setCurrentPage(changed);
	};

	const handleNextPage = () => {
		const changed = currentPage === 9 ? 0 : currentPage + 1;
		setCurrentPage(changed);
	};

	const handlePageSelect = (id) => {
		setCurrentPage(id);
	};

	const handleUserSelect = (user) => {
		dispatch(setCurrentUser(user));
	};

	const handleCurrentRepository = async (repo) => {
		await dispatch(setCurrentRepository(repo));
		console.log(repo);
		await dispatch(getIssueList(currentUser?.node?.login, repo?.name));
		setIsDetailShow(true);
	};

	return (
		<div className="flex flex-col items-center w-3/4">
			<div className="flex items-center pt-8 w-100 mt-10">
				{userList && userList.slice(currentPage, currentPage + 5).map(user => (
					<div
						key={user.cursor}
						className={`${currentUser && currentUser?.node?.login === user?.node?.login ? "border-blue-300 border-2" : ''}`}
					>
						<img
							className="w-32 h-32 m-2 border rounded-md shadow-md cursor-pointer"
							onClick={() => handleUserSelect(user)}
							src={user.node.avatarUrl} alt={user.node.email}
						/>
					</div>
				))}
			</div>

			{!isDetailShow && <ul className="w-full h-60 max-h-60 overflow-y-scroll p-5 m-10 border rounded">
				{repositories && repositories.map((repository, idx) => (
					<li
						key={`repository_${idx}`}
						className={`hover:bg-green-300 flex justify-between p-2 ${currentRepository?.name === repository.name?"bg-blue-300":""}`}
						onClick={() => handleCurrentRepository(repository)}
					>
						<label>{repository.name}</label>
						<div>
							<label>{repository.stargazers.totalCount} stars / </label>
							<label>{repository.watchers.totalCount} watchers</label>
						</div>
					</li>
				))}
			</ul>}
			{isDetailShow && <RepositoryDetail goback={() => setIsDetailShow(false)} />}
			
			<div className="flex items-center">
				<button
					className="w-8 h-8 border rounded-md p-1"
					onClick={handlePrePage}
				>
					<LeftIcon />
				</button>
				{paginated && paginated.map((_, idx) => (
					<button
						key={idx}
						onClick={() => handlePageSelect(idx)}
						className={`w-8 h-8 text-center border rounded-md ${currentPage === idx ? "bg-blue-400" : ''}`}
					>
						{idx + 1}
					</button>
				))}
				<button
					className="w-8 h-8 border rounded-md p-1"
					onClick={handleNextPage}
				>
					<RightIcon />
				</button>
			</div>
		</div>
	)
};

export default UserList;
