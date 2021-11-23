import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from '../../redux/store';
import { getRepositories, setCurrentUser, setCurrentRepository, getIssueList } from '../../redux/slices/userList';
import RepositoryDetail from "./repositoryDetail";
import UserPaginate from "./userPaginate";
import Button from "../../components/button";
import LoadingScreen from "../../components/loadingScreen";

const UserList = () => {
	const { totalUser, userList, repositories, currentUser, currentRepository, isLoading, error }
		= useSelector(state => state.userList);
	const [currentPage, setCurrentPage] = useState(0);
	const [paginated, setPaginated] = useState([]);
	const [isDetailShow, setIsDetailShow] = useState(false);
	const dispatch = useDispatch();
	const endPage = totalUser % 5 === 0 ? totalUser / 5 : Math.floor(totalUser / 5) + 1;

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
		if (currentPage > 0) {
			setCurrentPage(currentPage - 1);
		}
		setIsDetailShow(false);
	};

	const handleNextPage = () => {
		const _endPage = endPage < 10 ? endPage : 9;
		if (currentPage < _endPage) {
			setCurrentPage(currentPage + 1);
		}
		setIsDetailShow(false);
	};

	const handlePageSelect = (id) => {
		setCurrentPage(id);
		setIsDetailShow(false);
	};

	const handleUserSelect = (user) => {
		dispatch(setCurrentUser(user));
		setIsDetailShow(false);
	};

	const handleCurrentRepository = async (repo) => {
		await dispatch(setCurrentRepository(repo));
		await dispatch(getIssueList(currentUser?.node?.login, repo?.name));
		setIsDetailShow(true);
	};

	return (
		<div className="flex flex-col items-center w-3/4 mt-10">
			<div className="flex justify-start items-start w-100">
				<label>
					{totalUser} Users
				</label>
			</div>
			<div className="flex items-center pt-2 w-100 relative">
				{userList && userList.slice(currentPage * 5, (currentPage + 1) * 5).map(user => (
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
				{isLoading && <LoadingScreen />}
			</div>

			{!isDetailShow && <div className="w-2/3 m-10 h-auto">
				<label>{repositories.length} Repositories</label>
				<ul className={`relative h-60 max-h-60 p-5 border mt-2 rounded ${!isLoading?"overflow-y-scroll":"overflow-hidden"}`}>
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
					{isLoading && <LoadingScreen />}
				</ul>
			</div>}
			{isDetailShow && <RepositoryDetail goback={() => setIsDetailShow(false)} />}
			<UserPaginate
				paginated={paginated}
				handlePrePage={handlePrePage}
				handleNextPage={handleNextPage}
				handlePageSelect={handlePageSelect}
				currentPage={currentPage}
				endPage={endPage > 9 ? 9 : endPage}
				isEndPage={/*endPage > 9*/ false}
				isFirstPage={currentPage > 9}
			/>
		</div>
	)
};

export default UserList;
