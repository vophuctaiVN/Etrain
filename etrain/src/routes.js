import Homepage from "./views/HomepageView";
import Grammar from "./views/Grammar";
import Vocabulary from "./views/Vocabulary";
import GramPost from "./components/Grammar/GramPost";
import WordList from "./components/Vocabulary/WordList.jsx";
import Carousel_Card from "./components/Vocabulary/FlashCard/Carousel_Card.jsx";
import QuizPage from "./views/Quiz.jsx";

import MyWords from "./components/Vocabulary/MyWords.jsx";

import Login from "./views/Log/Login.jsx";
import Register from "./views/Log/Register.jsx";

import QuizPost from "./components/Quiz/QuizPost.jsx";
import Forum from "./views/Forum.jsx";
import AnswerPage from "./components/ForumQ/AnswerPage.jsx";

import MatchingWord from "./components/Games/MatchingWord/maincomponent";
import OrderWords from "./components/Games/OrderWords/OrderWords.jsx";
import Dictation from "./components/Games/Dictation/Dictation.jsx";
import Home from "./components/Games/Tortoise/game.jsx";

import Profile from "./views/Log/UserProfile.jsx";
import Today from "./views/Today.jsx";
import FirstTest from "./components/Quiz/FirstTest.jsx";

import Menu from "./views/Store/MenuView";
import Cart from "./views/Store/CartView";
import Checkout from "./views/Store/CheckoutView";
import Product from "./views/Store/ProductView";

import DictionaryPage from "./views/DictionaryPage";

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
    path: "/flashcard-:idtopic",
    layout: "",
    component: Carousel_Card,
  },
  {
    path: "/mywords",
    layout: "",
    component: MyWords,
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
    component: DictionaryPage,
  },
  {
    path: "/dictionary-:word",
    layout: "",
    component: DictionaryPage,
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
    path: "/matchingword-:vocabID",
    layout: "",
    component: MatchingWord,
  },
  {
    path: "/orderwords-:lessonid",
    layout: "",
    component: OrderWords,
  },
  {
    path: "/dictation-:lessonid",
    layout: "",
    component: Dictation,
  },
  {
    path: "/tortoise-:vocabID",
    layout: "",
    component: Home,
  },
  {
    path: "/profile",
    layout: "",
    component: Profile,
  },
  //store
  {
    path: "/menu",
    layout: "",
    component: Menu,
  },
  {
    path: "/cart",
    layout: "",
    component: Cart,
  },
  {
    path: "/checkout",
    layout: "",
    component: Checkout,
  },
  {
    path: "/product-:productCode",
    layout: "",
    component: Product,
  },
]; // khi muốn thêm chỗ Switch khác thì thêm biến route khác và getroute khác để tránh làm ảnh hưởng tới nhau.... <Route component> là để chọn chỗ render và list các component có thể render

export default routes;
