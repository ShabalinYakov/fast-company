const BookMark = ({ status, ...rest }) => {
  return (
    <button
      className={`bi ${status ? 'bi-bookmark-heart-fill' : 'bi-bookmark'}`}
      onClick={() => rest.onToggleBookMark(rest.id)}
    ></button>
  );
};

export default BookMark;
