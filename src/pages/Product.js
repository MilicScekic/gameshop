import { useParams } from "react-router-dom";

function Product() {
  let { name } = useParams();
  return <div>{name}</div>;
}

export default Product;
