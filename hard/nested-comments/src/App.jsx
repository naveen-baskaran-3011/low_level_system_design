import { createContext, useState } from "react";
import { commentConfig, contructCommentConfig } from "./data";
import Comment from "./Comment";
import './App.css';

export const CommentContext = createContext({
    comments: [],
    setComments: () => {}
});

export default function App() {
    const [comments, setComments] = useState([...contructCommentConfig(commentConfig)]);
    return <CommentContext.Provider value={{
        comments,
        setComments
    }}>
        <div>
            {console.log(comments)}
            {comments.map(comment => <Comment key={comment.id} config={comment} />)}
        </div>
    </CommentContext.Provider>
}