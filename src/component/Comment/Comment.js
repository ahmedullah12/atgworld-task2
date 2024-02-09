
const Comment = ({ comment }) => {
    return (
      <div className="mb-2">
        <p className="text-gray-700 font-semibold">
          <span className="mr-2">{comment.userName}:</span>
          {comment.comment}
        </p>
      </div>
    );
  };

export default Comment;