import { Link } from "react-router-dom";
import styled from "styled-components";

const ProductContainer = styled.div`
  width: 100%;
  min-height: 6em;
  display: flex;
  border-bottom: 2px solid #d8d8d852;
  padding: 6px 8px;
  align-items: center;

  &:hover {
    background-color: rgb(225, 226, 234);
  }
`;

const Thumbnail = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  flex: 0.4;
  img {
    width: auto;
    height: 70px;
  }
`;

const Name = styled.h3`
  font-size: 0.8rem;
  text-align: left;
  color: #000;
  margin-left: 10px;
  flex: 2;
  display: flex;
`;

const Description = styled.span`
  font-size: 0.7rem;
  text-align: left;
  color: #000;
  margin-left: 10px;
  flex: 3;
  display: flex;
`;

const Categories = styled.span`
  font-size: 0.7rem;
  text-align: left;
  font-weight: 600;
  color: #000;
  margin-left: 10px;
  flex: 2;
  display: flex;
`;

const Price = styled.span`
  color: #000;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  flex: 0.2;
`;

const ProductItem = ({ name, content, image, price, categories }) => {
  return (
    <ProductContainer>
      <Thumbnail>
        <img src={image} />
      </Thumbnail>
      <Name>{name.slice(0, 30)}</Name>
      <Categories>{categories.slice(0, 5)}</Categories>
      <Description>{content.slice(0, 30)}</Description>
      <Price>{parseFloat(price)}&euro;</Price>
    </ProductContainer>
  );
};

export default ProductItem;
