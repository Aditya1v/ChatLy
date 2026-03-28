import Answers from "./Answers";
const QuerryAnswer =({item,index}) => {
  return(
    <>
    <div
                    key={index}
                    className={item.type == "q" ? "flex justify-end" : ""}
                  >
                    {item.type == "q" ? (
                      <li
                        key={index}
                        className="text-right  p-1 border-8 dark:border-zinc-700 border-red-100 dark:bg-zinc-700 bg-red-100 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl w-fit"
                      >
                        <Answers
                          ans={item.text}
                          key={index}
                          totalResult={1}
                          type={item.type}
                        />
                      </li>
                    ) : (
                      item.text.map((ansItem, ansIndex) => (
                        <li key={ansIndex} className="text-left p-1">
                          <Answers
                            ans={ansItem}
                            key={ansIndex}
                            totalResult={item.length}
                            type={item.type}
                          />
                        </li>
                      ))
                    )}
                  </div>
    </>
  )
}

export default QuerryAnswer;