import React from "react";
import Button from "../../components/button";
import { ReactComponent as LeftIcon } from '../../icons/left.svg';
import { ReactComponent as RightIcon } from '../../icons/right.svg';

const UserPaginate = ({
	handlePrePage,
	handlePageSelect,
	handleNextPage,
	paginated,
	currentPage
}) => {
  return (
		<div className="flex items-center">
			<Button
				className="w-8 h-8 p-1"
				onClick={handlePrePage}
			>
				<LeftIcon />
			</Button>
			{paginated && paginated.map((_, idx) => (
				<Button
					key={idx}
					onClick={() => handlePageSelect(idx)}
					className={`w-8 h-8 text-center ${currentPage === idx ? "bg-blue-400" : ''}`}
				>
					{idx + 1}
				</Button>
			))}
			<Button
				className="w-8 h-8 p-1"
				onClick={handleNextPage}
			>
				<RightIcon />
			</Button>
		</div>
	)
};

export default UserPaginate;
