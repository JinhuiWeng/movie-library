function init() {}

function log(error) {
  console.error(error);
}

export default {
  init,
  log,
};

// import Raven from "raven-js";

// function init() {
//   Raven.config(
//     "https://82b273c1a00e47c7a87f17fcf54589ae@o4504185672302592.ingest.sentry.io/4504185744523264",
//     {
//       release: "1-0-0",
//       environment: "development-test",
//     }
//   ).install();
// }

// function log(error) {
//   Raven.captureException(error);
// }

// export default {
//   init,
//   log,
// };
