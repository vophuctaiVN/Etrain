import React, { Component } from "react";

// core components
import Product from "../../components/Store/Product";

const contents = {
  description:
    "We cannot show great content because of intellectual property rights infringement. Instead, you can refer to them through these books. This is the best way to contribute to our team and the author.",
};

class MenuView extends Component {
  state = { categories: [], products: [] };
  componentDidMount() {
    window.scrollTo(0, 0);
    this.getAllCategories();
    this.getAllProducts();
  }

  getAllProducts() {
    window
      .ProductAPIsService_Search({ PageSize: 50 })
      .then((result) =>
        this.setState({
          products: result.json.result.items,
        })
      )
      .catch((error) => console.log(error));
  }

  getAllCategories() {
    window
      .CategoryAPIsService_Query({ Sorting: "Title ASC", PageSize: 5 })
      .then((result) => this.setState({ categories: result.json.result.items }))
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <section className="ftco-menu mb-5 pb-5 blog_area section_padding">
        <div className="container">
          <div className="row justify-content-center my-5">
            <div className="col-md-7 heading-section text-center">
              <span className="subheading">Discover</span>
              <h2 className="mb-4">Our Books</h2>
              <p>{contents.description}</p>
            </div>
          </div>
          <div className="row d-md-flex">
            <div className="col-lg-12 p-md-5">
              <div className="row">
                <div className="col-md-12 nav-link-wrap mb-5">
                  <div
                    className="nav nav-pills justify-content-center"
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    {this.state.categories.map((value, key) => {
                      const pillId = `v-pills-${value.id}`;
                      return (
                        <a
                          key={key}
                          className={0 === key ? "nav-link active" : "nav-link"}
                          id={`${pillId}-tab`}
                          data-toggle="pill"
                          href={`#${pillId}`}
                          role="tab"
                          aria-controls={pillId}
                          aria-selected={0 === key ? "true" : "false"}
                        >
                          {value.title}
                        </a>
                      );
                    })}
                  </div>
                </div>
                <div className="col-md-12 d-flex align-items-center">
                  <div className="tab-content" id="v-pills-tabContent">
                    {this.state.categories.map((category, key) => {
                      const pillId = `v-pills-${category.id}`;
                      return (
                        <div
                          key={key}
                          className={
                            0 === key
                              ? "tab-pane fade show active"
                              : "tab-pane fade"
                          }
                          id={pillId}
                          role="tabpanel"
                          aria-labelledby={`${pillId}-tab`}
                        >
                          <div className="row">
                            {this.state.products.map((product, key) => {
                              if (category.id !== product.category.id)
                                return null;
                              return (
                                <div
                                  key={key}
                                  className="col-md-6 col-lg-3 mb-5 pb-3"
                                >
                                  <Product product={product} />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default MenuView;
