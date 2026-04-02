import React from "react";
import Sidebar from "./components/Sidebar";
import ChatLayout from "./components/ChatLayout";

function App() {
  return (
<div className="bg-gray-100 text-black dark:bg-zinc-900 dark:text-white h-screen">
      <div className="grid grid-cols-1 md:grid-cols-5 h-full">
        <Sidebar />
        <ChatLayout />
      </div>
    </div>
  );
}

export default App;