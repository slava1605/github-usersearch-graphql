import React from "react";

const Modal = ({ isOpen, onCancel, title, children, ...props }) => {

	return (
		<>
			{isOpen && 
				<div className="flex items-center justify-center rounded-md">
					<div
						className="fixed w-full h-full opacity-40 bg-gray-400 top-0 left-0 z-2"
						onClick={onCancel}
					>	
					</div>
					<div className="w-2/3 opacity-100 bg-white z-50 shadow-md rounded-md">
						<div className="border-b pl-2">
							{title}
						</div>
						{children}
					</div>
				</div>
			}
		</>
	)
};

export default Modal;
