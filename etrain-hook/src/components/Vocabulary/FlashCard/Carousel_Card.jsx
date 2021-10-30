import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import FlashCard from "./FlashCard";
import { getCookiesValue } from "../../../utils/helpers";

function Carousel_Card(props) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (props.match.params.idtopic === "mine")
      window
        .MyVocabularyQuery({
          accountID: getCookiesValue("userID"),
          showDetail: true,
        })
        .then((rememberwords) => setItems(rememberwords.json.result.items))
        .catch((error) => console.log(error));
    else
      window
        .VocabularyByTopicAPIsService_Query({
          fatherID: props.match.params.idtopic,
        })
        .then((wordsList) => setItems(wordsList.json.result.items))
        .catch((error) => console.log(error));
  }, []);

  let listvocab = items.map((item, index) => (
    <FlashCard item={item} key={index}></FlashCard>
  ));

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
export default Carousel_Card;
