import { useContext } from "react";
import { findComment } from "./data";
import { CommentContext } from "./App";
import CommentOptions from "./CommentOptions";

function IconAvatar(props) {
    return (
        <svg fill="none" viewBox="0 0 15 15" height="1em" width="1em" {...props}>
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M.877 7.5a6.623 6.623 0 1113.246 0 6.623 6.623 0 01-13.246 0zM7.5 1.827a5.673 5.673 0 00-4.193 9.494A4.971 4.971 0 017.5 9.025c1.762 0 3.31.916 4.193 2.296A5.673 5.673 0 007.5 1.827zm3.482 10.152A4.023 4.023 0 007.5 9.975a4.023 4.023 0 00-3.482 2.004A5.648 5.648 0 007.5 13.173c1.312 0 2.52-.446 3.482-1.194zM5.15 6.505a2.35 2.35 0 114.7 0 2.35 2.35 0 01-4.7 0zm2.35-1.4a1.4 1.4 0 100 2.8 1.4 1.4 0 000-2.8z"
                clipRule="evenodd"
            />
        </svg>
    );
}

export default function Comment({ config }) {
    const commentsConfig = useContext(CommentContext);

    return <div className="comment-container">
        <div className="comment" onClick={() => {
            console.log(findComment(config.id, commentsConfig.comments));
        }}>
            <div className="avatar">
                <IconAvatar />
            </div>
            <div className="content">
                <div className="content-label">{config.comment}</div>
                <div className="content-options">
                    <CommentOptions commentId={config.id} parentId={config.parentId} />
                </div>
            </div>
        </div>
        {config.thread_comments.length > 0 && <div className="other-comments">
            {config.thread_comments.map(comment => <Comment key={comment.id} config={comment} />)}
        </div>}
    </div>
}