import axios from "axios";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import { BASE_URL } from "../utills/constants";


export function SetApiRequestHeader(customHeader = {}) {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...customHeader,
  };
}

const instance = axios.create({
  baseURL: BASE_URL || "/api/",
  timeout: 29000,
  headers: SetApiRequestHeader(),
});

instance.interceptors.request.use(
  config => {
    const session = JSON.parse(window.sessionStorage.getItem("session"));

    if (session?.sessionIndex) {
      config.headers.Authorization = session?.sessionIndex;
      return Promise.resolve(config);
    }

    // TODO: Tokenbase
    // setTimeout(() => {
    //   checkAuth();
    // }, 0);

    return config;
  }
)

instance.interceptors.response.use(undefined, async (err) => {
  const { config } = err;

  if (!config || !config.retry) return Promise.reject(err);

  config.__retryCount = config.__retryCount || 0;
  if (config.__retryCount >= config.retry) {
    return Promise.reject(err);
  }

  config.__retryCount += 1;
  const backoff = new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, config.retryDelay || 1);
  });

  return backoff.then(() => axios(config));
});

instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.message) {
      if (!_isEmpty(error, "response") && error.response.status >= 400) {
        const errorObj =
          typeof error === "string"
            ? error
            : _get(error, "response.data.message") ||
            _get(error, "response.data.error") ||
            "Something Went Wrong";
        const errMessage = decodeURI(errorObj.message || errorObj);
        /** Notification popup placeholder */
        return Promise.reject(errMessage);
      }
    }

    const err = error.message ? error.message : JSON.stringify(error);
    return Promise.reject(err);
  }
);

const _getApiVersion = (params = {}) => params.apiVersion || "";
const _retryParams = (params = {}) => ({
  ...params,
  validateStatus: (status) => status < 400,
  retry: 4,
  retryDelay: 2000,
});

export function get(url, params) {
  return instance.get(`${_getApiVersion(params)}/${url}`, _retryParams(params));
}

export function post(url, body, params) {
  return instance.post(
    `${_getApiVersion(params)}/${url}`,
    body,
    _retryParams(params)
  );
}

export function put(url, body, params) {
  return instance.put(
    `${_getApiVersion(params)}/${url}`,
    body,
    _retryParams(params)
  );
}

export function patch(url, body, params) {
  return instance.patch(
    `${_getApiVersion(params)}/${url}`,
    body || {},
    _retryParams(params)
  );
}

export function remove(url, body, params) {
  return instance.delete(
    `${_getApiVersion(params)}/${url}`,
    body || {},
    _retryParams(params)
  );
}
