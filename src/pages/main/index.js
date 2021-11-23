import React, { useState, useEffect } from "react";
import UserSearchForm from "./userSearchForm";
import UserList from "./userList";

const Main = ({}) => {
  return (
		<div className="flex flex-col items-center p-12">
			<UserSearchForm />
			<UserList />
		</div>
	)
};

export default Main;
