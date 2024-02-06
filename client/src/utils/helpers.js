export const parseErrors = function (errors) {
  if (typeof errors !== "string") return null;
  const errorsArray = errors.split("\n");

  let parsedErrors = {};
  errorsArray.forEach((error) => {
    let newError = error.split("::");
    if (newError[0].startsWith(",")) {
      newError[0] = newError[0].slice(1);
    }
    if (parsedErrors[newError[0]] === newError[0]) {
      parsedErrors[newError[0]].push(newError[0]);
    } else {
      parsedErrors[newError[0]] = [newError[1]];
    }
  });

  return parsedErrors;
};
