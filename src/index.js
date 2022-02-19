import React from "react";
import ReactDOM from "react-dom";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import languageDetector from "i18next-browser-languagedetector";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HttpApi from "i18next-http-backend";
import Header from "./components/Header";
import Details from "./components/Details";
import ImagePreview from "./components/ImagePreview";
import App from "./App";
import ScrollToTop from "./components/ScrollToTop";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "flag-icon-css/css/flag-icons.min.css";
import "./index.css";

i18n
  .use(initReactI18next)
  .use(languageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ["pl", "en", "de", "ru"],
    fallbackLng: "en",
    detection: {
      order: ["cookie", "htmlTag", "localStorage", "path", "subdomain"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/Sentech-1.0.3/assets/locales/{{lng}}/translation.json",
    },
    react: {
      useSuspense: false,
    },
  });

ReactDOM.render(
  <React.StrictMode>
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <ScrollToTop>
        <Switch>
          <Route path='/' exact component={App} />
          <Route path='/details/:type/:id/:choicedMake/:choicedModel/:choicedEngine' component={Details} />
          <Route path='/photo/:id/' component={ImagePreview} />
        </Switch>
      </ScrollToTop>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
