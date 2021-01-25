import React from "react";
import Carousel from "react-elastic-carousel";
import FlashCard from "./FlashCard";

class Carousel_Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    if (this.props.location.query && this.props.location.query.items) {
      localStorage.setItem(
        "tempitems",
        JSON.stringify(this.props.location.query.items)
      );
      this.setState({
        items: this.props.location.query.items,
      });
    }
  }

  componentWillUnmount() {
    localStorage.removeItem("tempitems");
  }

  render() {
    let items = JSON.parse(localStorage.getItem("tempitems")); //state để trick cho reRender vì tempitems lần getItem lần đầu là null

    let listvocab;
    if (items) {
      listvocab = items.map((item) => <FlashCard item = {item}></FlashCard>);
    } else {
      listvocab = this.state.items.map((item) => <FlashCard item = {item}></FlashCard>);
    }

    return (
      <section className="blog_area section_padding">
        <div className="container">
          <section className="special_cource padding_top">
            <div className="container">
              <div className="row justify-content-center">
                <Carousel>{listvocab}</Carousel>
              </div>
            </div>
          </section>
        </div>
      </section>
    );
  }
}
export default Carousel_Card;
