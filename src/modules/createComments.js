/*  eslint-disable no-unused-vars */
const createComments = (commentContainer, commentStore) => {
  commentStore.forEach((comment, id) => {
    const listElement = document.createElement('li');
    const commentCount = document.getElementById('comment-count');
    commentCount.textContent = `${commentStore.length}`;
    listElement.textContent = `${comment.creation_date} || "${comment.comment}" By ${comment.username} `;
    commentContainer.appendChild(listElement);
  });
};

export default createComments;