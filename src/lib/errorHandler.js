import * as lib from "@codedrops/lib";
// import notify from "./notify";
// import * as Sentry from "@sentry/react";
// import _ from "lodash";

const handleError = (error) => {
  lib.handleError(error);
  // const errorMessage = _.get(error, "response.data", error.message);
  console.log("error::-", error);

  // notify(errorMessage, "error");
  // Sentry.captureException(error);
};

export default handleError;
