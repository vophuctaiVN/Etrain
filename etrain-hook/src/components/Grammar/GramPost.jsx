import React, { useEffect, useRef, useState } from "react";
import GramLesson from "./GramLesson";
import MoreLesson from "./MoreLesson";
import GramQ from "./GramQ";
import { Link } from "react-router-dom";
import getWord from "../../utils/helpers";
import { isLogin } from "../../utils/helpers";

import Video from "../Dictionary/Video";

function GramPost(props) {
  const id = props.match.params.lessonid;
  const saveID = useRef(props.match.params.lessonid);

  const [postInfo, setPostInfo] = useState({
    items: [],
    totalitems: 0,
    youtubeinfo: null,
    loginStt: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    getLesson(props.match.params.lessonid);
  }, []);

  const getLesson = (fatherID) => {
    const queryObjContent = {
      fatherID,
    };
    const queryObjTopic = {
      ID: fatherID,
    };
    window
      .GrammarAPIsService_Query(queryObjTopic)
      .then(async (topic) => {
        var data = await getWord(topic.json.result.items[0].title);
        const x = await isLogin();
        window
          .LessonAPIsService_Query(queryObjContent)
          .then((result) =>
            setPostInfo({
              topics: topic.json.result.items[0],
              items: result.json.result.items,
              totalitems: result.json.result.totalRows,
              youtubeinfo: data.youtubeinfo,
              loginStt: x,
            })
          )
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));

    saveID.current = id;
  };

  if (saveID.current != id) getLesson(id);

  let listLessons = postInfo.items.map((lesson, index) => (
    <GramLesson
      key={index}
      content={lesson.sectionContent}
      examples={lesson.examples}
    />
  ));

  return (
    <section className="course_details_area section_padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 course_details_left">
            <div className="main_image">
              {postInfo.topics ? (
                <img
                  className="img-fluid"
                  src={postInfo.topics.imageURL}
                  alt=""
                />
              ) : null}
            </div>
            {listLessons}

            {postInfo.youtubeinfo !== null ? (
              <div className="single-post-area">
                <div className="blog-author">
                  <Video
                    key={postInfo.youtubeinfo.youtube_id}
                    second={postInfo.youtubeinfo.start}
                    videoid={postInfo.youtubeinfo.youtube_id}
                  />
                </div>
              </div>
            ) : null}
            {postInfo.loginStt ? (
              <>
                <Link
                  to={`/speaking-${props.match.params.lessonid}`}
                  className="genric-btn success-border circle"
                  style={{
                    float: "right",
                    marginTop: "20px",
                    marginLeft: "10px",
                  }}
                >
                  Speaking
                </Link>
                <Link
                  to={`/dictation-${props.match.params.lessonid}`}
                  className="genric-btn success-border circle"
                  style={{
                    float: "right",
                    marginTop: "20px",
                    marginLeft: "10px",
                  }}
                >
                  Dictation
                </Link>
                <Link
                  to={`/orderwords-${props.match.params.lessonid}`}
                  className="genric-btn success-border circle"
                  style={{ float: "right", marginTop: "20px" }}
                >
                  Order Sentense
                </Link>
              </>
            ) : null}
          </div>

          <div className="col-lg-4 right-contents">
            <MoreLesson />
            <GramQ key={props.match.params.lessonid} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default GramPost;
