'use strict';

module.exports = {
  // ES search
  async esSearch(paramObj) {
    const { app } = this;

    const response = await app.esPlugin.search(paramObj);
    const returnValue = {
      total: response.hits.total.value,
      data: response.hits.hits.map(it => it._source),
    };

    return returnValue;
  },
};
