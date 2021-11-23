import React from "react";
import Button from "../../components/button";
import { ReactComponent as LeftIcon } from '../../icons/left.svg';
import { ReactComponent as RightIcon } from '../../icons/right.svg';

const UserPaginate = ({
	handlePrePage,
	handlePageSelect,
	handleNextPage,
	paginated,
	currentPage,
	endPage,
	isEndPage,
	isFirstPage,
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
			{isEndPage && (
				<Button
					key={endPage - 1}
					onClick={() => handlePageSelect(endPage - 1)}
					className={`w-8 h-8 text-center w-auto ${currentPage === endPage - 1 ? "bg-blue-400" : ''}`}
				>
					{endPage}
				</Button>
			)}
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
