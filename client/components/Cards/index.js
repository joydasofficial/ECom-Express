import axios from "axios";
import React, { useState } from "react";
import { Card, Icon, Rating, Image, Label, Modal } from "semantic-ui-react";
import CartModal from "../CartModal";
import styles from "./style.module.scss";

//redux
import { useSelector } from "react-redux";

const Cards = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const currUser = useSelector((state)=>state.user)

  const handleCartClick = (idata) => {
    setSelectedProduct(idata);
    setShowModal(true);
  };

  return (
    <>
      <Card className={styles.cardContainer} key={data.id}>
        <img src={data.image} className={styles.img}/>
        <Card.Content>
          <Label.Group tag>
            <Label as="a">₹{data.price}</Label>
          </Label.Group>
          <Card.Header>{data.title}</Card.Header>
          <Card.Meta>
            <span className="date">{data.category}</span>
          </Card.Meta>
          <Rating icon="star" defaultRating={data.rating.rate} maxRating={5} />
          <Card.Description>{data.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a onClick={() => handleCartClick(data)}>
            <Icon name="shop" />
            Add to cart
          </a>
        </Card.Content>
      </Card>
      {showModal && <CartModal sdata={selectedProduct} userid={currUser.id} />}
    </>
  );
};

export default Cards;
