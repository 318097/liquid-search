import React from "react";
import config from "../config";

class Crisp extends React.Component {
  componentDidMount() {
    // Include the Crisp code here, without the <script></script> tags
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = config.CRISP_WEBSITE_ID;

    (function () {
      let d = document;
      let s = d.createElement("script");

      s.src = "https://client.crisp.chat/l.js";
      s.async = 1;
      d.getElementsByTagName("head")[0].appendChild(s);
    })();
  }

  render() {
    return null;
  }
}
export default Crisp;
