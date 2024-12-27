export const commentConfig = [
    {
        id: '1',
        comment: 'Hello world! How are you?',
        thread_comments: [
            {
                id: '2',
                comment: 'Hey, I am fine, wau?',
                thread_comments: []
            }
        ]
    }
];

export function findComment(commentId, config) {
    for(let comment of config) {
        if(comment.id === commentId) {
            return comment;
        } else if(comment.thread_comments.length) {
            let foundComment = findComment(commentId, comment.thread_comments);
            if(foundComment) {
                return foundComment;
            }
        }
    }
}

export function contructCommentConfig(config, parentId = null) {
    config.forEach(comment => {
        comment.parentId = parentId;
        if(comment.thread_comments.length) {
            return contructCommentConfig(comment.thread_comments, comment.id);
        }
    });
    return config;
}