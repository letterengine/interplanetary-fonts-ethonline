import React from "react";

export default function projectPreview() {
  return (
    <div className="max-w-md min-w-fit container flex  flex-col border-2 border-solid border-red rounded">
      <div className="h-8 bg-red "></div>
      <div className="h-96 border-2 border-solid border-red bg-darkblue"></div>
      <div className=" container flex flex-row items-center bg-white p-4  border-2 border-solid border-red">
        <div className="border-r-2 h-14 w-16 rounded-full mr mr-4 bg-slate-600"></div>
        <div className="container flex flex-col ">
          <p className="text-darkblue text-2xl text-left font-black">
            projectName
          </p>
          <p className="text-red text-left text-sm font-light">@Author</p>
        </div>
      </div>
    </div>
  );
}
