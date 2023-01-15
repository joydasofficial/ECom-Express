import axios from 'axios'
import React, { useState } from 'react'
import { Button, Header, Image, Modal, Label } from 'semantic-ui-react'


const CartModal = ({sdata, userid}) => {
  const [open, setOpen] = useState(true)
  const [loading, setLoading] = useState(false)
  const [checkoutStatus, setCheckoutStatus] = useState(false)

  const handleCheckout = async() => {
    setLoading(true)
    let check = await axios.post('https://fakestoreapi.com/carts', {
      userId:userid,
      date: Date.now(),
      products:[{productId:sdata.id,quantity:1}]
    })
    console.log(check);
    if(check){
      setLoading(false) 
      setCheckoutStatus(true)
    }
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>Cart</Modal.Header>
      <Modal.Content image>
        <Image size='medium' src={sdata.image} wrapped />
        <Modal.Description>
          <Header>{sdata.title}</Header>
          <p>
            {sdata.description}
          </p>
          <Label.Group tag>
          <Label as='a'>₹{sdata.price}</Label>
        </Label.Group>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='blue' onClick={() => setOpen(false)}>
          Add more
        </Button>
        <Button
          content={checkoutStatus ? 'Item added to cart' : 'Checkout'}
          labelPosition='right'
          icon='checkmark'
          onClick={handleCheckout}
          positive
          loading={loading}
          disabled={checkoutStatus ? true : false}
        />
      </Modal.Actions>
    </Modal>
  )
}

export default CartModal