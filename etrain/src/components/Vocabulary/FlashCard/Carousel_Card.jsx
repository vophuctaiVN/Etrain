import React from "react";
import Carousel from "react-elastic-carousel";
import FlashCard from "./FlashCard";
import { getCookiesValue } from "../../../utils/helpers";

class Carousel_Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    if (this.props.match.params.idtopic === "mine")
      window
        .MyVocabularyQuery({
          accountID: getCookiesValue("userID"),
          showDetail: true,
        })
        .then((rememberwords) =>
          this.setState({
            items: rememberwords.json.result.items,
          })
        )
        .catch((error) => console.log(error));
    else
      window
        .VocabularyByTopicAPIsService_Query({
          fatherID: this.props.match.params.idtopic,
        })
        .then((wordsList) =>
          this.setState({
            items: wordsList.json.result.items,
          })
        )
        .catch((error) => console.log(error));
  }

  render() {
    let items = this.state.items;
    let listvocab;
    if (items) {
      listvocab = items.map((item, index) => (
        <FlashCard item={item} key={index}></FlashCard>
      ));
    } else {
      listvocab = this.state.items.map((item) => (
        <FlashCard item={item}></FlashCard>
      ));
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
