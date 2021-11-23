import React from 'react';

const InputField = ({className, ...props}) => {
  return (
		<input
			className={`border rounded-sm m-4 ${className}`}
			{...props}
		/>
	)
};

export default InputField;
