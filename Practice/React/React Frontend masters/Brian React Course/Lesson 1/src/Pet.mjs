import { Link } from "react-router-dom";
const Pet = (props) => {
  return (
    <Link to={`/details/${props.id}`}>
      <div >
        <h1>{props.name}</h1>
        <h2>{`${props.animal} - ${props.breed}`}</h2>
      </div>
    </Link>
  );
};

export default Pet;
