import React, { useEffect } from "react";

// backend
import CartSection from "../../components/Store/Cart/CartSection";
import RelatedSection from "../../components/Store/Cart/RelatedSection";

function CartView() {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <>
      <CartSection />
      <RelatedSection productCode="" />
    </>
  );
}

export default CartView;
