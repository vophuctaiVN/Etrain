import Homepage from "./views/HomepageView";
import Grammar from "./views/Grammar";
import Vocabulary from "./views/Vocabulary";
import Dictionary from "./views/Dictionary";
import GramPost from "./components/Grammar/GramPost";
import WordList from "./components/Vocabulary/WordList.jsx";
import Carousel_Card from "./components/Vocabulary/FlashCard/Carousel_Card.jsx";
import QuizPage from "./views/Quiz.jsx";
import Login from "./views/Log/Login.jsx";
import Register from "./views/Log/Register.jsx";
import QuizPost from "./components/Quiz/QuizPost.jsx";
import Forum from "./views/Forum.jsx";
import AnswerPage from "./components/ForumQ/AnswerPage.jsx";
import MatchingWord from "./components/Games/MatchingWord/maincomponent";
import Profile from "./views/Log/UserProfile.jsx";
import Today from "./views/Today.jsx";
import FirstTest from "./components/Quiz/FirstTest.jsx";

const routes = [
  {
    path: "/homepage",
    layout: "",
    component: Homepage,
  },
  {
    path: "/journey",
    layout: "",
    component: Today,
  },
  {
    path: "/grammar",
    layout: "",
    component: Grammar,
  },
  {
    path: "/grammar-:lessonid",
    layout: "",
    component: GramPost,
  },
  {
    path: "/vocabulary",
    layout: "",
    component: Vocabulary,
  },
  {
    path: "/vocabulary-:lessonid",
    layout: "",
    component: WordList,
  },
  {
    path: "/flashcard",
    layout: "",
    component: Carousel_Card,
  },
  {
    path: "/quizs",
    layout: "",
    component: QuizPage,
  },
  {
    path: "/quizs-:lessonid",
    layout: "",
    component: QuizPost,
  },
  {
    path: "/first-test",
    layout: "",
    component: FirstTest,
  },
  {
    path: "/dictionary",
    layout: "",
    component: Dictionary,
  },
  {
    path: "/login",
    layout: "",
    component: Login,
  },
  {
    path: "/register",
    layout: "",
    component: Register,
  },
  {
    path: "/forum",
    layout: "",
    component: Forum,
  },
  {
    path: "/forum-:lessonid",
    layout: "",
    component: AnswerPage,
  },
  {
    path: "/matchingword",
    layout: "",
    component: MatchingWord,
  },
  {
    path: "/profile",
    layout: "",
    component: Profile,
  },
]; // khi muốn thêm chỗ Switch khác thì thêm biến route khác và getroute khác để tránh làm ảnh hưởng tới nhau.... <Route component> là để chọn chỗ render và list các component có thể render

export default routes;
