import hljs from "highlight.js";
import markdown from "markdown-it";
import handleError from "./errorHandler";

export const md = markdown({
  highlight: function (code, language = "js") {
    if (language && hljs.getLanguage(language)) {
      try {
        return hljs.highlight(code, { language }).value;
      } catch (err) {
        handleError(err);
      }
    }

    return ""; // use external default escaping
  },
});
