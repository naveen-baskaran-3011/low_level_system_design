import { useCallback, useContext, useRef, useState } from "react";
import { findComment } from "./data";
import { CommentContext } from "./App";

export default function CommentOptions({ commentId, parentId }) {
    const inputRef = useRef(null);
    const [isCommenting, setIsCommenting] = useState(false);
    const commentContext = useContext(CommentContext);

    const onSave = useCallback((inputValue, commentId) => {
        let foundParentComment = findComment(commentId, commentContext.comments);
        if (foundParentComment) {
            foundParentComment.thread_comments.push({
                id: String(Date.now()),
                comment: inputValue,
                thread_comments: [],
                parentId: commentId
            })
        }

        commentContext.setComments([...commentContext.comments]);
    }, [commentContext.comments]);

    const onDelete = useCallback(() => {
        let arrayToFind = commentContext.comments;
        if (parentId) {
            let parentConfig = findComment(parentId, commentContext.comments);
            if (parentConfig) {
                arrayToFind = parentConfig.thread_comments;
            }
        }

        let currentCommentIndex = arrayToFind.findIndex(comment => comment.id === commentId);
        currentCommentIndex > -1 && arrayToFind.splice(currentCommentIndex, 1);

        commentContext.setComments([...commentContext.comments]);
    }, [commentContext.comments, parentId, commentId]);

    const saveHandler = useCallback(() => {
        if (inputRef.current.value) {
            onSave(inputRef.current.value, commentId);
        }
        setIsCommenting(false);
    }, []);

    return <div className="options-container">
        {isCommenting &&
            <input
                type="text"
                name="reply"
                id="reply"
                ref={inputRef}
                autoFocus
                onBlur={saveHandler}
                onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                        saveHandler();
                    }
                }} />}
        <div className="reply/add btn" onClick={() => {
            if (isCommenting) {
                onSave(inputRef.current.value, commentId);
            }
            setIsCommenting(prev => !prev);
        }}>
            {isCommenting ? 'Add' : 'Reply'}
        </div>
        <div className="delete btn" onClick={onDelete}>Delete</div>
    </div>
}