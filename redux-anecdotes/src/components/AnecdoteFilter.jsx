import { useDispatch } from "react-redux";
import { changeFilter } from "../reducers/filterReducer";

const AnecdoteFilter = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter: <input type="text" onChange={handleChange} />
    </div>
  );
};

export default AnecdoteFilter;
