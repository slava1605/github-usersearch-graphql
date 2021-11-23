import React, { useState } from "react";

const LoadingScreen = () => {
    return (
        <>
            <div className="fixed w-full h-full top-0 left-0 bg-gray-400 opacity-40 z-10"></div>
            <div className="fixed w-full h-full top-0 left-0 bg-white opacity-100 z-50">
                ...loading
            </div>
        </>
    )
};

export default LoadingScreen;
