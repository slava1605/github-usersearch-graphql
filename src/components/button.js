import React from "react";

const Button = ({ className, children, ...props }) => {
	return (
		<button
			className={`border shadow-md rounded-md flex items-center justify-center ${className}`}
			{...props}
		>
			{children}
		</button>
	)
};

export default Button;
