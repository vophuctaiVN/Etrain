import React, { Component } from "react";
import getWord from "../../utils/helpers";
import Video from "./Video";

class SentenceDictionary extends Component {
  state = { Sentences: [], wordtitle: false, youtubeinfo: null };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.word) this.DicSearchClick(this.props.word);
  }

  async DicSearchClick(keyword) {
    var data = await getWord(keyword);
    let sentences = data.sentences;
    if (data.sentences) {
      const listword = sentences.map((sentence, index) => (
        <div className="col-sm-6 col-xl-3" key={index}>
          <div className="single_feature">
            <div className="single_feature_part">
              <p
                style={{ color: "#0033cc", fontSize: "18px" }}
                dangerouslySetInnerHTML={{ __html: sentence.fields.en }}
              />
              <p
                style={{ color: "#99b3ff" }}
                dangerouslySetInnerHTML={{ __html: sentence.fields.vi }}
              />
              <hr />
            </div>
          </div>
        </div>
      ));
      this.setState({
        Sentences: listword,
        wordtitle: keyword,
        youtubeinfo: data.youtubeinfo,
      });
    }
  }

  render() {
    const array = this.state.Sentences;
    return (
      <>
        <section className="blog_area section_padding">
          <div className="container">
            {this.state.youtubeinfo ? (
              <>
                <div className="row justify-content-center">
                  <div className="col-xl-7">
                    <h1>{this.state.wordtitle}</h1>
                    <Video
                      key={this.state.youtubeinfo.youtube_id}
                      second={this.state.youtubeinfo.start}
                      videoid={this.state.youtubeinfo.youtube_id}
                    />
                    <br />
                    <br />
                    <br />
                  </div>
                </div>
                <div className="row">{array}</div>{" "}
              </>
            ) : this.state.wordtitle ? (
              <div className="container">
                <div className="row justify-content-center my-5">
                  <div className="col-md-7 heading-section text-center">
                    <span className="subheading">Sorry</span>
                    <h2 className="mb-4">Our Bad</h2>
                    <p>
                      Sorry that we don't have any result about this word. You
                      can check your spelling again!
                    </p>
                    <img src="img/icon/not_find.png" />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      </>
    );
  }
}

export default SentenceDictionary;
