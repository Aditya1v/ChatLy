import { Trash2 } from "lucide-react";

function RecentSearch({recentHistory , setRecentHistory,setSelectedHistory}) {

    // Functions
    const clearHistory = () => {
      localStorage.clear();
      setRecentHistory([]);
    };

  return (
    <>
      <div className="col-span-1 dark:bg-zinc-800  bg-red-100 border border-gray-500 overflow-scroll">
        {/* <div>
            Recent Search
          <Trash2 />
          </div> */}

        <h1 className="text-2xl text-white  flex justify-between gap-3 px-4 border-2 rounded dark:bg-zinc-600 dark:border-zinc-600 bg-red-100 border-red-100">
          Recent Search{" "}
          <span className="pt-1 cursor-pointer" onClick={clearHistory}>
            <Trash2 />
          </span>
        </h1>

        <ul className=" text-left overflow-auto ">
          {recentHistory &&
            recentHistory.map((item, index ) => (
              <li
                key={index}
                onClick={() => setSelectedHistory(item)}
                className="p-1 pl-4 text-zinc-400 cursor-pointer  hover:bg-zinc-700 hover:border-2 hover:rounded-xl hover:text-zinc-300 truncate "
              >
                {item}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default RecentSearch;