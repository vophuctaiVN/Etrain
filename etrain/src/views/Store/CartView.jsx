import React, { Component } from "react";

// backend
import CartSection from "../../components/Store/Cart/CartSection";
import RelatedSection from "../../components/Store/Cart/RelatedSection";

class CartView extends Component {
  render() {
    return (
      <>
        <CartSection />
        <RelatedSection productCode="" />
      </>
    );
  }
}

export default CartView;
