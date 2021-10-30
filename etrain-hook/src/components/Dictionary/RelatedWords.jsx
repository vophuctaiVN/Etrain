import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function RelatedWords(props) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    window
      .RelatedWordsQuery({ word: props.word })
      .then((result) => {
        let arrayWord = result.json;
        let newArray = [];
        arrayWord.map((element) => newArray.push(element.word));
        setItems(newArray);
      })
      .catch((error) => console.log(error));
  }, []);

  let listvocab = items.map((item, index) => (
    <div className="col-sm-6 col-xl-3 listExample" key={index}>
      <Link to={`/dictionary-${item}`} key={index}>
        {item}
      </Link>
    </div>
  ));
  return (
    <div className="row listExample-boder" style={{ marginTop: "30px" }}>
      {listvocab}
    </div>
  );
}

export default RelatedWords;
