import React, { useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import RelatedWords from "../components/Dictionary/RelatedWords";
import GoogleDictionary from "../components/Dictionary/GoogleDictionary";
import SentenceDictionary from "../components/Dictionary/SentenceDictionary";

const DictionaryPage = (props) => {
  const [activeTab, setActiveTab] = useState("1");

  const [inputWord, setinputWord] = useState(props.match.params.word || "");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  function handleSearch(e) {
    e.preventDefault();
    setinputWord(document.getElementById("SearchInput").value);
  }

  function handleChange(e) {
    e.preventDefault();
    let wordInput = document.getElementById("SearchInput").value;
    if (wordInput === "") {
      setinputWord(wordInput);
    }
  }

  return (
    <section className="blog_area section_padding">
      <div className="container">
        <div>
          <div className="row justify-content-center">
            <div className="col-xl-5">
              <div className="section_tittle text-center">
                <div className="blog_right_sidebar">
                  <aside className="single_sidebar_widget search_widget">
                    <form action="#">
                      <div className="form-group">
                        <div className="input-group mb-3">
                          <input
                            id="SearchInput"
                            type="text"
                            className="form-control"
                            placeholder="Search Keyword"
                            defaultValue={props.match.params.word}
                            onChange={handleChange}
                          />
                          <div className="input-group-append">
                            <button className="btn" type="button">
                              <i className="ti-search" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        className="button rounded-0 primary-bg text-white w-100 btn_1"
                        type="submit"
                        onClick={handleSearch}
                      >
                        Search
                      </button>
                    </form>
                  </aside>{" "}
                </div>
                <h2> </h2>
              </div>
            </div>
          </div>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "1" })}
                onClick={() => {
                  toggle("1");
                }}
              >
                Words
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "2" })}
                onClick={() => {
                  toggle("2");
                }}
              >
                Sentences
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "3" })}
                onClick={() => {
                  toggle("3");
                }}
              >
                Related Words
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <GoogleDictionary key={inputWord} word={inputWord} />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <SentenceDictionary key={inputWord} word={inputWord} />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="3">
              <Row>
                <Col sm="12">
                  <RelatedWords key={inputWord} word={inputWord} />
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </div>
    </section>
  );
};

export default DictionaryPage;
