import { useEffect, useState, useRef } from "react";
import { SmilePlus, Sparkles, Send, Trash2, Menu, Key } from "lucide-react";
import { URL } from "./constants";

import RecentSearch from "./components/RecentSearch";
import QuerryAnswer from "./components/QuerryAnswer";

function App() {
  // Hooks
  const [querry, setQuerry] = useState("");
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState(
    JSON.parse(localStorage.getItem("history")),
  );
  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState("");
  const scrollToAns = useRef();

  // Logic for API
  const askQuerry = async () => {
    const payloadData = querry ? querry : selectedHistory;

    const payload = {
      contents: [
        { parts: [{ text: payloadData }] },
        // "Format your response in clean markdown. Use code blocks with language."
      ],
    };

    if (!querry && !selectedHistory) {
      return false;
    }

    if (querry) {
      if (localStorage.getItem("history")) {
        let history = JSON.parse(localStorage.getItem("history"));
        history = [querry, ...history];
        localStorage.setItem("history", JSON.stringify(history));
        setRecentHistory(history);
      } else {
        localStorage.setItem("history", JSON.stringify([querry]));
        setRecentHistory([querry]);
      }
    }

    setLoader(true);

    let response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    response = await response.json();

    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ");
    dataString = dataString.map((item) => item.trim());

    // console.log(dataString);

    setResult([
      ...result,
      { type: "q", text: querry ? querry : selectedHistory },
      { type: "a", text: dataString },
    ]);

    setQuerry("");

    setTimeout(() => {
      scrollToAns.current.scrollTop = scrollToAns.current.scrollHeight;
    }, 200);

    setLoader(false);
  };

  // console.log(recentHistory);

  useEffect(() => {
    console.log(selectedHistory);
    askQuerry();
  }, [selectedHistory]);

  //dark mode feature
  const [darkmode, setDarkmode] = useState("dark");
  useEffect(() => {
    console.log(darkmode);
    if (darkmode == "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkmode]);

  //

  // Main Product code
  return (
    <>
      <div className={darkmode == "dark" ? "dark" : "light"}>
        <div className="grid grid-cols-5 h-screen text-center border border-gray-500">
          {/* Search History */}
          <select
            onChange={(event) => setDarkmode(event.target.value)}
            className="fixed text-white bottom-0 p-5 border-none"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
          <RecentSearch
            recentHistory={recentHistory}
            setRecentHistory={setRecentHistory}
            setSelectedHistory={setSelectedHistory}
          />
          {/* Top Message */}
          <div className="col-span-4 flex flex-col h-screen">
            <h1 className="text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-800">
              Hello, User Ask me Anything
            </h1>
            {loader ? (
              <div role="status" className="p-4">
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8  text-blue-500 animate-spin "
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                    className="opacity-20"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                    className="opacity-80"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : null}

            <div ref={scrollToAns} className="container h-160 overflow-scroll">
              <div className="text-zinc-200 m-2 p-2">
                <ul className="p-3 m-2">
                  {result.map((item, index) => (
                    <QuerryAnswer key={index} item={item} index={index} />
                  ))}
                </ul>
              </div>
            </div>

            {/* SearchBar Start */}
            <div
              className={`flex items-center dark:bg-zinc-800 bg-red-100 w-1/2 dark:text-white m-auto text-zinc-800 rounded-full border p-1 transition-all duration-300
              ${isFocused ? "border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "border-gray-500"}`}
            >
              <button className="ml-3 relative w-6 h-6 flex items-center justify-center">
                <SmilePlus
                  className={`absolute transition-all duration-500
                ${isFocused || isTyping ? "opacity-0 scale-50" : "opacity-100 scale-100"} 
                text-gray-400`}
                />

                <Sparkles
                  className={`absolute transition-all duration-500
                  ${isFocused || isTyping ? "opacity-100 scale-100 animate-spin-slow" : "opacity-0 scale-50"} 
                  text-yellow-400`}
                />
              </button>

              <input
                type="text"
                placeholder="Ask me anything!"
                className="w-full h-full p-3 rounded-full outline-none transition-transform duration-300 focus:scale-[1.02]"
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                  setIsFocused(false);
                  setIsTyping(false);
                }}
                value={querry}
                onChange={(e) => setQuerry(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    askQuerry();
                  }
                }}
              />

              <button
                className="mr-4 relative w-6 h-6 flex items-center justify-center"
                onClick={askQuerry}
              >
                <Send
                  className={`absolute transition-all duration-300
                  ${isFocused || isTyping ? "text-blue-400 scale-110 animate-send" : "text-blue-200 scale-100"} 
                  cursor-pointer hover:scale-110 hover:text-blue-300 transition-all duration-200`}
                />
              </button>
            </div>
            {/* SearchBar End */}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
