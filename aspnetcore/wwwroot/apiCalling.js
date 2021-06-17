const DOMAIN = "http://etrain.ddns.net:5000";

function serializeQueryString(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      if (null != obj[p])
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

async function AccountAPIsService_Query(queryObject) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const queryString = serializeQueryString(queryObject);
  const apiEndpoint = `${DOMAIN}/Accounts/Query`;

  try {
    const response = await fetch(
      `${apiEndpoint}?${queryString}`,
      requestOptions
    );
    switch (response.status) {
      case 200:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function AdminDivAPIsService_Query(queryObject) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const queryString = serializeQueryString(queryObject);
  const apiEndpoint = `${DOMAIN}/AdminDivs/Query`;

  try {
    const response = await fetch(
      `${apiEndpoint}?${queryString}`,
      requestOptions
    );
    switch (response.status) {
      case 200:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function CartAPIsService_Query(queryObject) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const queryString = serializeQueryString(queryObject);
  const apiEndpoint = `${DOMAIN}/Carts/Query`;

  try {
    const response = await fetch(
      `${apiEndpoint}?${queryString}`,
      requestOptions
    );
    switch (response.status) {
      case 200:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function CategoryAPIsService_Query(queryObject) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const queryString = serializeQueryString(queryObject);
  const apiEndpoint = `${DOMAIN}/Categories/Query`;

  try {
    const response = await fetch(
      `${apiEndpoint}?${queryString}`,
      requestOptions
    );
    switch (response.status) {
      case 200:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function OrderAPIsService_Query(queryObject) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const queryString = serializeQueryString(queryObject);
  const apiEndpoint = `${DOMAIN}/Orders/Query`;

  try {
    const response = await fetch(
      `${apiEndpoint}?${queryString}`,
      requestOptions
    );
    switch (response.status) {
      case 200:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function OrderStatusAPIsService_Query(queryObject) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const queryString = serializeQueryString(queryObject);
  const apiEndpoint = `${DOMAIN}/OrderStatuses/Query`;

  try {
    const response = await fetch(
      `${apiEndpoint}?${queryString}`,
      requestOptions
    );
    switch (response.status) {
      case 200:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function ProductAPIsService_Query(queryObject) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const queryString = serializeQueryString(queryObject);
  const apiEndpoint = `${DOMAIN}/Products/Query`;

  try {
    const response = await fetch(
      `${apiEndpoint}?${queryString}`,
      requestOptions
    );
    switch (response.status) {
      case 200:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function ProductAPIsService_Search(queryObject) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const queryString = serializeQueryString(queryObject);
  const apiEndpoint = `${DOMAIN}/Products/Search`;

  try {
    const response = await fetch(
      `${apiEndpoint}?${queryString}`,
      requestOptions
    );
    switch (response.status) {
      case 200:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function OrderAPIsService_Create(requestBody) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(requestBody);
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const apiEndpoint = `${DOMAIN}/Orders/Create`;

  try {
    const response = await fetch(apiEndpoint, requestOptions);
    switch (response.status) {
      case 200:
      case 400:
      case 404:
      case 500:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function AccountAPIsService_Authenticate(requestBody) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(requestBody);
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const apiEndpoint = `${DOMAIN}/Accounts/Authenticate`;

  try {
    const response = await fetch(apiEndpoint, requestOptions);
    switch (response.status) {
      case 200:
      case 401:
      case 404:
      case 500:
        const json = await response.json();
        return { statusCode: response.status, json };

      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function AccountAPIsService_CheckAuth(token) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const apiEndpoint = `${DOMAIN}/Accounts/CheckAuth`;

  try {
    const response = await fetch(apiEndpoint, requestOptions);
    switch (response.status) {
      case 200:
        return response;

      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function OrderAPIsService_Search(queryObject) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const queryString = serializeQueryString(queryObject);
  const apiEndpoint = `${DOMAIN}/Orders/Search`;

  try {
    const response = await fetch(
      `${apiEndpoint}?${queryString}`,
      requestOptions
    );
    switch (response.status) {
      case 200:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function ProductAPIsService_Create(formData, token) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  var formdata = new FormData();
  formdata.append("Code", formData.Code);
  formdata.append("Title", formData.Title);
  formdata.append("Description", formData.Description);
  formdata.append("CategoryID", formData.CategoryID);
  formdata.append("Price", formData.Price);
  formdata.append("Image", formData.Image);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  const apiEndpoint = `${DOMAIN}/Products/Create`;

  try {
    const response = await fetch(apiEndpoint, requestOptions);
    switch (response.status) {
      case 200:
      case 400:
      case 404:
      case 500:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function ProductAPIsService_Delete(id, token) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  const apiEndpoint = `${DOMAIN}/Products/Delete?id=${id}`;

  try {
    const response = await fetch(apiEndpoint, requestOptions);
    switch (response.status) {
      case 200:
      case 404:
      case 500:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function ProductAPIsService_Update(formData, token) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  var formdata = new FormData();
  formdata.append("ID", formData.ID);
  formdata.append("Code", formData.Code);
  formdata.append("Title", formData.Title);
  formdata.append("Description", formData.Description);
  formdata.append("CategoryID", formData.CategoryID);
  formdata.append("Price", formData.Price);
  formdata.append("Image", formData.Image);

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  const apiEndpoint = `${DOMAIN}/Products/Update`;

  try {
    const response = await fetch(apiEndpoint, requestOptions);
    switch (response.status) {
      case 200:
      case 400:
      case 404:
      case 500:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function OrderAPIsService_UpdateStatus(queryObject, token) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    redirect: "follow",
  };

  const queryString = serializeQueryString(queryObject);
  const apiEndpoint = `${DOMAIN}/Orders/UpdateStatus`;

  try {
    const response = await fetch(
      `${apiEndpoint}?${queryString}`,
      requestOptions
    );
    switch (response.status) {
      case 200:
      case 404:
      case 500:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

//etrain
async function GrammarAPIsService_Query(queryObject) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const queryString = serializeQueryString(queryObject);
  const apiEndpoint = `${DOMAIN}/Grammar/Query`;

  try {
    const response = await fetch(
      `${apiEndpoint}?${queryString}`,
      requestOptions
    );
    switch (response.status) {
      case 200:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function VocabularyAPIsService_Query(queryObject) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const queryString = serializeQueryString(queryObject);
  const apiEndpoint = `${DOMAIN}/Vocabulary/Query`;

  try {
    const response = await fetch(
      `${apiEndpoint}?${queryString}`,
      requestOptions
    );
    switch (response.status) {
      case 200:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function LessonAPIsService_Query(queryObject) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const queryString = serializeQueryString(queryObject);
  const apiEndpoint = `${DOMAIN}/Grammar/SectionQuery`;

  try {
    const response = await fetch(
      `${apiEndpoint}?${queryString}`,
      requestOptions
    );
    switch (response.status) {
      case 200:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function VocabularyByTopicAPIsService_Query(queryObject) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const queryString = serializeQueryString(queryObject);
  const apiEndpoint = `${DOMAIN}/Vocabulary/VocabByTopicQuery`;

  try {
    const response = await fetch(
      `${apiEndpoint}?${queryString}`,
      requestOptions
    );
    switch (response.status) {
      case 200:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function QuizAPIsService_Query(queryObject) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const queryString = serializeQueryString(queryObject);
  const apiEndpoint = `${DOMAIN}/Quiz/Query`;

  try {
    const response = await fetch(
      `${apiEndpoint}?${queryString}`,
      requestOptions
    );
    switch (response.status) {
      case 200:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function AccountAPIsService_Create(formData) {
  var myHeaders = new Headers();

  var formdata = new FormData();
  formdata.append("Username", formData.Username);
  formdata.append("Password", formData.Password);
  formdata.append("Email", formData.Email);
  formdata.append("Name", formData.Name);
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  const apiEndpoint = `${DOMAIN}/Accounts/Create`;

  try {
    const response = await fetch(apiEndpoint, requestOptions);
    switch (response.status) {
      case 200:
      case 400:
      case 404:
      case 500:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function Quiz_byID_Query(queryObject) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const queryString = serializeQueryString(queryObject);
  const apiEndpoint = `${DOMAIN}/Quiz/Quiz_byID_Query`;

  try {
    const response = await fetch(
      `${apiEndpoint}?${queryString}`,
      requestOptions
    );
    switch (response.status) {
      case 200:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function UserInfo_Query(queryObject) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const queryString = serializeQueryString(queryObject);
  const apiEndpoint = `${DOMAIN}/Accounts/UserInfo_Query`;

  try {
    const response = await fetch(
      `${apiEndpoint}?${queryString}`,
      requestOptions
    );
    switch (response.status) {
      case 200:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function Rank_Query(queryObject) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const queryString = serializeQueryString(queryObject);
  const apiEndpoint = `${DOMAIN}/Accounts/Rank_Query`;

  try {
    const response = await fetch(
      `${apiEndpoint}?${queryString}`,
      requestOptions
    );
    switch (response.status) {
      case 200:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function UserInfoAPIsService_Update(formData /* , token */) {
  var myHeaders = new Headers();
  //myHeaders.append("Authorization", `Bearer ${token}`);

  var formdata = new FormData();
  formdata.append("IDaccount", formData.IDaccount);
  formdata.append("Name", formData.Name);
  formdata.append("Email", formData.Email);
  formdata.append("Address", formData.Address);
  formdata.append("Phone", formData.Phone);
  formdata.append("About", formData.About);
  formdata.append("Image", formData.Image);

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  const apiEndpoint = `${DOMAIN}/Accounts/Update_Info`;

  try {
    const response = await fetch(apiEndpoint, requestOptions);
    switch (response.status) {
      case 200:
      case 400:
      case 404:
      case 500:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function Question_Create_APIsService_Update(formData) {
  var myHeaders = new Headers();
  var formdata = new FormData();
  formdata.append("Question", formData.Question);
  formdata.append("Topic", formData.Topic);
  formdata.append("Detail", formData.Detail);
  formdata.append("IDaccount", formData.IDaccount);
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  const apiEndpoint = `${DOMAIN}/Forum/Question_Create`;

  try {
    const response = await fetch(apiEndpoint, requestOptions);
    switch (response.status) {
      case 200:
      case 400:
      case 404:
      case 500:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function ForumQuestionList_Query(queryObject) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const queryString = serializeQueryString(queryObject);
  const apiEndpoint = `${DOMAIN}/Forum/ListQuestionQuery`;

  try {
    const response = await fetch(
      `${apiEndpoint}?${queryString}`,
      requestOptions
    );
    switch (response.status) {
      case 200:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function Answer_Create_APIsService_Update(formData) {
  var myHeaders = new Headers();
  var formdata = new FormData();
  formdata.append("Detail", formData.Detail);
  formdata.append("IDaccount", formData.IDaccount);
  formdata.append("IDquestion", formData.IDquestion);
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  const apiEndpoint = `${DOMAIN}/Forum/Answer_Create`;

  try {
    const response = await fetch(apiEndpoint, requestOptions);
    switch (response.status) {
      case 200:
      case 400:
      case 404:
      case 500:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function ForumAnswerList_Query(queryObject) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const queryString = serializeQueryString(queryObject);
  const apiEndpoint = `${DOMAIN}/Forum/ListAnswerQuery`;

  try {
    const response = await fetch(
      `${apiEndpoint}?${queryString}`,
      requestOptions
    );
    switch (response.status) {
      case 200:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function ScoreInfo_UpdateAPI(formData) {
  var myHeaders = new Headers();
  var formdata = new FormData();
  formdata.append("IDaccount", formData.IDaccount);
  formdata.append("Score", formData.Score);
  formdata.append("PostLeft", formData.PostLeft);
  formdata.append("Level", formData.Level);
  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  const apiEndpoint = `${DOMAIN}/Accounts/Update_ScoreInfo`;

  try {
    const response = await fetch(apiEndpoint, requestOptions);
    switch (response.status) {
      case 200:
      case 400:
      case 404:
      case 500:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function SaveLevelAPI(formData) {
  ScoreInfo_UpdateAPI(formData);

  var myHeaders = new Headers();
  const queryObject = {
    IDaccount: formData.IDaccount,
    Level: formData.Level,
  };
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  const apiEndpoint = `${DOMAIN}/LessonJourney/FirstLesson_Create`;
  const queryString = serializeQueryString(queryObject);

  try {
    const response = await fetch(
      `${apiEndpoint}?${queryString}`,
      requestOptions
    );
    switch (response.status) {
      case 200:
      case 400:
      case 404:
      case 500:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function TodayLesson_Query(queryObject) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const queryString = serializeQueryString(queryObject);
  const apiEndpoint = `${DOMAIN}/LessonJourney/StudyQuery`;

  try {
    const response = await fetch(
      `${apiEndpoint}?${queryString}`,
      requestOptions
    );
    switch (response.status) {
      case 200:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function ReviewLesson_Query(queryObject) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const queryString = serializeQueryString(queryObject);
  const apiEndpoint = `${DOMAIN}/LessonJourney/ReviewQuery`;

  try {
    const response = await fetch(
      `${apiEndpoint}?${queryString}`,
      requestOptions
    );
    switch (response.status) {
      case 200:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function StudyOrReviewDoneAPI(formData) {
  var myHeaders = new Headers();
  const queryObject = {
    IDrow: formData.IDrow,
    typeDone: formData.typeDone,
  };
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  const apiEndpoint = `${DOMAIN}/LessonJourney/StudyOrReviewDone`;
  const queryString = serializeQueryString(queryObject);

  try {
    const response = await fetch(
      `${apiEndpoint}?${queryString}`,
      requestOptions
    );
    switch (response.status) {
      case 200:
      case 400:
      case 404:
      case 500:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function MyVocabularyQuery(queryObject) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const queryString = serializeQueryString(queryObject);
  const apiEndpoint = `${DOMAIN}/Vocabulary/MyVocabularyQuery`;

  try {
    const response = await fetch(
      `${apiEndpoint}?${queryString}`,
      requestOptions
    );
    switch (response.status) {
      case 200:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function RememberForgetWordAPI(formData) {
  var myHeaders = new Headers();
  const queryObject = {
    accountID: formData.accountID,
    wordID: formData.wordID,
  };
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  const apiEndpoint = `${DOMAIN}/Vocabulary/RememberForgetWord`;
  const queryString = serializeQueryString(queryObject);

  try {
    const response = await fetch(
      `${apiEndpoint}?${queryString}`,
      requestOptions
    );
    switch (response.status) {
      case 200:
      case 400:
      case 404:
      case 500:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function RelatedWordsQuery(queryObject) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const queryString = serializeQueryString(queryObject);
  const apiEndpoint = `${DOMAIN}/Vocabulary/RelatedWordsQuery`;

  try {
    const response = await fetch(
      `${apiEndpoint}?${queryString}`,
      requestOptions
    );
    switch (response.status) {
      case 200:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function GoogleWordsQuery(queryObject) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const queryString = serializeQueryString(queryObject);
  const apiEndpoint = `${DOMAIN}/Vocabulary/GoogleWordsQuery`;

  try {
    const response = await fetch(
      `${apiEndpoint}?${queryString}`,
      requestOptions
    );
    switch (response.status) {
      case 200:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function AddDicWordAPI(queryObject, formData) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    en: formData.En,
    ipa: formData.IPA,
    type: formData.Type,
    vn: formData.Vn,
    example1: formData.Example1,
    example2: formData.Example2,
    imageURL: formData.ImageURL,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const apiEndpoint = `${DOMAIN}/Vocabulary/AddDicWord`;
  const queryString = serializeQueryString(queryObject);

  try {
    const response = await fetch(
      `${apiEndpoint}?${queryString}`,
      requestOptions
    );
    switch (response.status) {
      case 200:
      case 400:
      case 404:
      case 500:
        const json = await response.json();
        return { statusCode: response.status, json };
      default:
        throw response;
    }
  } catch (error) {
    throw error;
  }
}

async function TraCauQuery(queryObject) {
  let dataget = { sentences: null, youtubeinfo: null };

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const queryString = serializeQueryString(queryObject);

  const apiEndpoint = `${DOMAIN}/Vocabulary/TraCauWordQuery`;
  try {
    const response = await fetch(
      `${apiEndpoint}?${queryString}`,
      requestOptions
    );
    switch (response.status) {
      case 200:
        const responseData = await response.json();
        dataget.sentences = responseData.sentences;
    }
  } catch (error) {
    throw error;
  }

  const apiEndpoint2 = `${DOMAIN}/Vocabulary/TraCauYoutubeQuery`;
  try {
    const response = await fetch(
      `${apiEndpoint2}?${queryString}`,
      requestOptions
    );
    switch (response.status) {
      case 200:
        const responseData = await response.json();
        dataget.youtubeinfo = responseData.transcripts[0].fields;
    }
  } catch (error) {
    throw error;
  }

  return dataget;
}
