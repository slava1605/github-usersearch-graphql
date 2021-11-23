import React from 'react';

const TextArea = ({className, ...props}) => {
  return (
		<textarea
			className={`border rounded-sm m-4 ${className}`}
			{...props}
		></textarea>
	)
};

export default TextArea;
