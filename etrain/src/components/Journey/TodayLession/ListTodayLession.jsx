import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import { GiSecretBook, GiCardPick } from "react-icons/gi";

export class ListTodayLession extends Component {
  constructor(props) {
    super(props);
    this.ToggleGram = this.ToggleGram.bind(this);
    this.ToggleVocab = this.ToggleVocab.bind(this);
    this.state = { showMoreGram: false, showMoreVocab: false };
  }

  ToggleGram() {
    this.setState({ showMoreGram: !this.state.showMoreGram });
  }

  ToggleVocab() {
    this.setState({ showMoreVocab: !this.state.showMoreVocab });
  }

  render() {
    return (
      <section className="blog_area section_padding">
        <div className="container">
          <div className="bt_bb_cell">
            <div className="bt_bb_cell_inner">
              <div className="bt_bb_row_wrapper">
                <div className="bt_bb_row" data-structure="6-6">
                  <div
                    className="bt_bb_column col-xl-6 bt_bb_align_left bt_bb_vertical_align_top bt_bb_animation_fade_in animate bt_bb_padding_text_indent animated"
                    data-width={6}
                    data-bt-override-class="{}"
                  >
                    <div className="bt_bb_column_content">
                      <div className="bt_bb_column_content_inner">
                        <header
                          className="bt_bb_headline bt_bb_color_scheme_5 bt_bb_dash_none bt_bb_size_large bt_bb_superheadline bt_bb_subheadline bt_bb_align_inherit"
                          data-bt-override-class="{}"
                        >
                          <h3 className="bt_bb_headline_tag">
                            <span className="bt_bb_headline_superheadline">
                              INTERMEDIATE LEVEL
                            </span>
                            <span className="bt_bb_headline_content">
                              <span>Lessons for Today</span>
                            </span>
                          </h3>
                          <div className="bt_bb_headline_subheadline">
                            In this level, you should spend at least 80 hours to
                            be able to understand all basic lessons.
                          </div>
                        </header>
                        <div className="bt_bb_separator bt_bb_bottom_spacing_50 bt_bb_border_style_none" />
                        <div
                          className="bt_bb_accordion bt_bb_color_scheme_3 bt_bb_style_simple bt_bb_shape_square"
                          data-closed="closed"
                        >
                          <div className="bt_bb_accordion_item btWithIcon">
                            <div className="bt_bb_accordion_item_title_content">
                              <div className="bt_bb_accordion_item_title">
                                <GiSecretBook
                                  size={40}
                                  color="darkslategrey"
                                  style={{ marginRight: "10px" }}
                                />
                                GRAMMAR
                                <AiFillPlusCircle
                                  size={20}
                                  style={{ float: "right", margin: "10px" }}
                                  onClick={this.ToggleGram}
                                />
                                <p
                                  className={
                                    this.state.showMoreGram ? "" : "hidden"
                                  }
                                >
                                  Inspired by the book “The Crayon Box That
                                  Talked“, this lesson will show children that
                                  when we all work together, the results are
                                  much more. Viverra nibh cras pulvinar mattis
                                  nunc sed blandit libero. Nibh tellus molestie
                                  nunc non blandit massa enim nec.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="bt_bb_accordion_item btWithIcon">
                            <div className="bt_bb_accordion_item_title_content">
                              <span
                                data-ico-artistic=""
                                className="bt_bb_icon_holder"
                              />
                              <div className="bt_bb_accordion_item_title">
                                <GiCardPick
                                  size={40}
                                  color="darkolivegreen"
                                  style={{ marginRight: "10px" }}
                                />
                                VOCABULARY
                                <AiFillPlusCircle
                                  size={20}
                                  style={{ float: "right", margin: "10px" }}
                                  onClick={this.ToggleVocab}
                                />
                                <p
                                  className={
                                    this.state.showMoreVocab ? "" : "hidden"
                                  }
                                >
                                  Dui id ornare arcu odio ut sem nulla pharetra
                                  diam. Enim ut tellus elementum sagittis vitae.
                                  Dapibus ultrices in iaculis nunc sed augue
                                  lacus viverra vitae. Viverra nibh cras
                                  pulvinar mattis nunc sed blandit libero. Nibh
                                  tellus molestie nunc non blandit massa enim
                                  nec.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bt_bb_separator bt_bb_bottom_spacing_50 bt_bb_border_style_none" />
                        <Link to={`/grammar`} className="btn_1">
                          Testing
                        </Link>
                        <div className="bt_bb_separator bt_bb_bottom_spacing_medium bt_bb_border_style_none" />
                      </div>
                    </div>
                  </div>
                  <div
                    className="bt_bb_column col-xl-6 bt_bb_align_left bt_bb_vertical_align_top bt_bb_animation_fade_in animate bt_bb_padding_normal animated"
                    data-width={6}
                    data-bt-override-class="{}"
                  >
                    <div className="bt_bb_column_content">
                      <div className="bt_bb_column_content_inner">
                        <div className="bt_bb_image bt_bb_shape_square bt_bb_align_inherit bt_bb_hover_style_simple bt_bb_content_display_always bt_bb_content_align_middle bt_bb_content_exists">
                          <span>
                            <img
                              src="http://tabula.bold-themes.com/wavy/wp-content/uploads/sites/3/2019/04/hero_books.png"
                              data-image_src="http://tabula.bold-themes.com/sunny/wp-content/uploads/sites/2/2019/03/Psittaciformes_kids.png"
                              title="Psittaciformes_kids"
                              alt="http://tabula.bold-themes.com/sunny/wp-content/uploads/sites/2/2019/03/Psittaciformes_kids.png"
                              className="btLazyLoadImage btLazyLoaded"
                            />
                          </span>
                        </div>
                        <div className="bt_bb_separator bt_bb_bottom_spacing_medium bt_bb_border_style_none" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      </section>
    );
  }
}

export default ListTodayLession;
