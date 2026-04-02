const Loader = () => {
  return (
    <div className="flex justify-start">
      <div className="bg-white  dark:bg-zinc-800  px-4 py-2 rounded-2xl flex gap-1">
        <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
        <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
      </div>
    </div>
  );
};

export default Loader;