import React from "react";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

import ReceiptIcon from "@material-ui/icons/Receipt";

const pages = [
  {
    title: "Products",
    href: "/admin/products",
    icon: <ShoppingBasketIcon />,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: <ReceiptIcon />,
  },
];

export default pages;
