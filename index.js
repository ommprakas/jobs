import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./utils/common/i18n";
import { App } from "./app";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store } from "./redux";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Helmet } from "react-helmet";
import "react-widgets/styles.css";
import i18next from "i18next";
import { Loading } from "./component";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{i18next.t("site.title")}</title>

        <link
          rel="icon"
          type="image/png"
          href="https://www.dojoko.com/wp-content/uploads/2022/07/cropped-Favicon_white-192x192.png"
          sizes="192x192"
        />
      </Helmet>
      <App />
      {/* <Loading /> */}
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
