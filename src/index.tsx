import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import { ConfigProvider } from 'antd';
import koKR from 'antd/lib/locale/ko_KR';

import "antd/dist/antd.min.css";
import "styles/index.scss";

import i18n from "helper/i18n";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <ConfigProvider locale={koKR}>
      <App />
    </ConfigProvider>
  </I18nextProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
