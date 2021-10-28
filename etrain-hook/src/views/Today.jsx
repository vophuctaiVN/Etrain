import React, { Component, useEffect, useState } from "react";
import { ListTodayLession } from "../components/Journey/TodayLession/ListTodayLession";
import { ListReview } from "../components/Journey/Review/ListReview";

function Today() {
  const [reload, setreload] = useState(false);

  useEffect(() => window.scrollTo(0, 0), []);

  const trickReloadPage = () => {
    setreload(!reload);
  };

  return (
    <>
      <ListTodayLession
        trickReloadPage={/*this.trickReloadPage.bind(this)*/ trickReloadPage}
      />
      <div className="container">
        <ListReview key={reload} />
      </div>
    </>
  );
}

export default Today;
