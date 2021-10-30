import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { showAlert, getCookiesValue } from "../../utils/helpers";
import { FaAngleDown } from "react-icons/fa";

function CheckoutView(props) {
  const [checkout, setCheckout] = useState({
    provinces: [],
    districts: [],
    communes: [],
    myInfo: {},
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    handleAddressSelect(null, "Tỉnh/Thành");

    const queryObj = {
      userid: getCookiesValue("userID"),
    };
    window
      .UserInfo_Query(queryObj)
      .then((result) => {
        //let tikets = parseInt(result.json.result.items[0].postLeft);
        setCheckout({ ...checkout, myInfo: result.json.result.items[0] });
      })
      .catch((error) => console.log(error));

    return () => window.location.reload(false);
  }, []);

  const handleAddressSelect = (fatherID, level) => {
    if (0 === fatherID) {
      if ("Tỉnh/Thành" === level) setCheckout({ ...checkout, provinces: [] });
      if ("Quận/Huyện" === level) setCheckout({ ...checkout, districts: [] });
      if ("Phường/Xã" === level) setCheckout({ ...checkout, communes: [] });
      return;
    }
    window
      .AdminDivAPIsService_Query({
        FatherID: fatherID,
        Level: level,
        Sorting: "Name ASC",
        PageSize: 50,
      })
      .then((result) => {
        if ("Tỉnh/Thành" === level)
          setCheckout({ ...checkout, provinces: result.json.result.items });
        if ("Quận/Huyện" === level)
          setCheckout({ ...checkout, districts: result.json.result.items });
        if ("Phường/Xã" === level)
          setCheckout({ ...checkout, communes: result.json.result.items });
      })
      .catch((error) => console.log(error));
  };

  const handlePlaceOrder = () => {
    const formData = getFormData();
    if (!checkFormData(formData)) {
      showAlert("Invalid Info", "Your input information is too long");
      return;
    }
    const requestBody = convertOrderCreateData(formData, props.cart);
    window
      .OrderAPIsService_Create(requestBody)
      .then((result) => {
        showAlert(result.json.error.message, result.json.error.detail);
        if (200 === result.statusCode)
          document.getElementById("order-id").value = result.json.result;
      })
      .catch((error) => console.log(error));
  };

  let firstName = "";
  let lastName = "";
  let discount = 0;

  if (checkout.myInfo.name) {
    var fullName = checkout.myInfo.name.split(" ");
    firstName = fullName[0];
    if (fullName.length !== 1) lastName = fullName[fullName.length - 1];
    discount = checkout.myInfo.postLeft;
  }

  return (
    <section className="ftco-section" style={{ "margin-top": "100px" }}>
      <div className="container">
        <div className="row">
          <div className="col-xl-8 mb-4">
            <form className="billing-form ftco-bg-dark p-3 p-md-5">
              <h3 className="mb-4 billing-heading">Billing Information</h3>
              <div className="row align-items-end">
                <div className="col-md-6">
                  <div className="form-group">
                    <label form="firstname">First Name</label>
                    <input
                      id="firstname"
                      type="text"
                      className="form-control"
                      defaultValue={firstName}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label form="lastname">Last Name</label>
                    <input
                      id="lastname"
                      type="text"
                      className="form-control"
                      defaultValue={lastName}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label form="country">Province</label>
                    <div className="select-wrap">
                      <div className="icon">
                        <FaAngleDown />
                        <i className="fas fa-chevron-down"></i>
                      </div>
                      <select
                        id="province"
                        name=""
                        className="form-control"
                        onChange={(e) =>
                          handleAddressSelect(e.target.value, "Quận/Huyện")
                        }
                      >
                        <option value={0}></option>
                        {checkout.provinces.map((value, key) => {
                          return (
                            <option key={key} value={value.id}>
                              {value.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label form="country">District</label>
                    <div className="select-wrap">
                      <div className="icon">
                        <FaAngleDown />
                        <i className="fas fa-chevron-down"></i>
                      </div>
                      <select
                        id="district"
                        name=""
                        className="form-control"
                        onChange={(e) =>
                          handleAddressSelect(e.target.value, "Phường/Xã")
                        }
                      >
                        <option value={0}></option>
                        {checkout.districts.map((value, key) => {
                          return (
                            <option key={key} value={value.id}>
                              {value.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label form="country">Commune</label>
                    <div className="select-wrap">
                      <div className="icon">
                        <FaAngleDown />
                        <i className="fas fa-chevron-down"></i>
                      </div>
                      <select id="commune" name="" className="form-control">
                        <option value={0}></option>
                        {checkout.communes.map((value, key) => {
                          return (
                            <option key={key} value={value.id}>
                              {value.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label form="streetaddress">Street Address</label>
                    <input
                      id="address"
                      type="text"
                      className="form-control"
                      placeholder="House number and street name"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      id="address-note"
                      type="text"
                      className="form-control"
                      placeholder="Appartment, suite, unit etc: (optional)"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <p className="text-primary" style={{ "margin-top": "20px" }}>
                    *Vui lòng ghi nhớ thông tin dưới đây để xác nhận đơn hàng
                  </p>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label form="phone">Phone</label>
                    <input
                      id="phone"
                      type="tel"
                      className="form-control"
                      defaultValue={checkout.myInfo.phone}
                      onKeyPress={(e) => {
                        if (!/[0-9 ]/.test(e.key)) e.preventDefault();
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label form="order-id">Order ID</label>
                    <input
                      id="order-id"
                      type="text"
                      className="form-control"
                      placeholder=""
                      disabled
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-xl-4">
            <div className="row mx-0">
              <div className="cart-detail cart-total ftco-bg-dark p-3 p-md-4 col-xl-12 col-md-6">
                <h3 className="billing-heading mb-4">Cart Total</h3>
                <p className="d-flex">
                  <span>Subtotal</span>
                  <span>{props.cart.subtotal} Đ</span>
                </p>
                <p className="d-flex">
                  <span>Delivery</span>
                  <span>{props.cart.delivery} Đ</span>
                </p>
                <p className="d-flex">
                  <span>Discount</span>
                  <span>{discount} Đ</span>
                </p>
                <hr />
                <p className="d-flex total-price">
                  <span>Total</span>
                  <span>{props.cart.total} Đ</span>
                </p>
              </div>
              <div className="cart-detail ftco-bg-dark p-3 p-md-4 col-xl-12 col-md-6">
                <h3 className="billing-heading mb-4">Payment Method</h3>
                <div className="form-group">
                  <div className="col-md-12">
                    <div className="radio">
                      <label>
                        <input
                          type="radio"
                          name="optradio"
                          className="mr-2"
                          checked
                          onChange={() => {}}
                        />
                        Thanh toán khi giao hàng
                      </label>
                    </div>
                  </div>
                </div>
                <p>
                  <Link
                    to="/checkout"
                    className="btn btn-primary py-3 px-4"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePlaceOrder();
                    }}
                  >
                    Place an order
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, null)(CheckoutView);

function convertOrderCreateData(formdata, cart) {
  const cartDetails = cart.cartDetails.map((item) => ({
    productID: item.product.id,
    price: item.product.price,
    quantity: item.quantity,
    total: item.total,
  }));
  const requestBody = {
    ...formdata,
    cart: {
      ...cart,
      cartDetails: cartDetails,
    },
  };
  return requestBody;
}

function getFormData() {
  const formdata = {
    firstname: document.getElementById("firstname").value,
    lastname: document.getElementById("lastname").value,
    phone: document.getElementById("phone").value,
    provinceID: parseInt(document.getElementById("province").value, 10),
    districtID: parseInt(document.getElementById("district").value, 10),
    communeID: parseInt(document.getElementById("commune").value, 10),
    address: document.getElementById("address").value,
    note: document.getElementById("address-note").value,
  };

  return formdata;
}

function checkFormData(formdata) {
  if (
    formdata.firstname.length > 32 ||
    formdata.lastname.length > 32 ||
    formdata.address.length > 256 ||
    formdata.note.length > 256 ||
    formdata.phone.length > 16
  )
    return false;
  return true;
}
