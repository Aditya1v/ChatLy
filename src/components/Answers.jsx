import ReactMarkdown from 'react-markdown';

const Answers = ({ ans}) => {
 
  return (
   <>
     <ReactMarkdown >{ans}</ReactMarkdown>
   </>
  );
};

export default Answers;