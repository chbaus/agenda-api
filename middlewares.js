const logger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Method:", request.path);
  console.log("Method:", request.body);
  console.log("---");
  next();
};
const logger2 = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Method:", request.path);
  console.log("Method:", request.body);
  console.log("---");
  next();
};

module.exports = { logger, logger2 };
