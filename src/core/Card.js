import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';

const Card = ({
   product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f,
  run = undefined
  // changeCartSize

}) => {

   const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-success mt-2 mb-2 card-btn-1">View Product</button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(true));
  };

   const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
 const showAddToCart = showAddToCartButton => {
    return (
      showAddToCartButton && (
         <button onClick={addToCart} className="btn btn-outline-secondary mt-2 mb-2">Add to cart</button>
      )
    );
  };

  

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock </span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock </span>
    );
  };

   const handleChange = productId => e => {
    setRun(!run); // run useEffect in parent Cart
    setCount(e.target.value < 1 ? 1 : e.target.value);
    if (e.target.value >= 1) {
      updateItem(productId, e.target.value);
    }
   }

const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
          </div>
        </div>
      )
    );
  };

  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };

  return ( 
    <div className="col-md-12 mb-3 text-center border-0">
      <div className="card">
        <div className="card-header">{product.name}</div>
        <div className="card-body">
        {shouldRedirect(redirect)}
          <ShowImage item={product} url='product' />
          <p className="card-p lead  mt-2">{product.description.substring(0, 100)} </p>
              {showStock(product.quantity)}
          <p className="card-p black-10 w-50 m-auto">$ {product.price}</p>
          <p className="black-9 w-50 m-auto">Category: {product.category && product.category.name}</p>
          <p className="black-8 w-50 m-auto">Added on {moment(product.createdAt).fromNow()}</p>
                       <br />

              {showViewButton(showViewProductButton)}
              {showAddToCart(showAddToCartButton)}
              {showRemoveButton(showRemoveProductButton)}
              {showCartUpdateOptions(cartUpdate)}


        </div>
      </div>
    </div>
  );
};

export default Card;