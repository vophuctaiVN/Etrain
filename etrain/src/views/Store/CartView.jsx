import React, { Component } from "react";

// backend
import CartSection from "../../components/Store/Cart/CartSection";
import RelatedSection from "../../components/Store/Cart/RelatedSection";

class CartView extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

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
