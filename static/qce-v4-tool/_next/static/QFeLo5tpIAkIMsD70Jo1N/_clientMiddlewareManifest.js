self.__MIDDLEWARE_MATCHERS = [
  {
    "regexp": "^\\/static\\/qce-v4-tool(?:\\/(_next\\/data\\/[^/]{1,}))?\\/auth(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$",
    "originalSource": "/auth"
  }
];self.__MIDDLEWARE_MATCHERS_CB && self.__MIDDLEWARE_MATCHERS_CB()