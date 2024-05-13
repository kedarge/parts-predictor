

export const to = (promise) =>
  promise.then((data) => [null, data]).catch((err) => [err]);

export const throwError = (errMessage, log) => {
  if (log === true) console.log(errMessage);
  return errMessage;
};

export const getAPIQuery = (query) => {
  let params = "/";
  if (query) {
    for (let key in query) {
      params += `${query[key]}/`;
    }
  }

  return params.substring(0, params.length - 1);
};

export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const renderHtmlContent = (htmlString) => {
  return { __html: htmlString };
};

