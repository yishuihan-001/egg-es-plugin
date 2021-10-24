'use strict';

const assert = require('assert');
const elasticsearch = require('elasticsearch');

module.exports = app => {
  app.addSingleton('esPlugin', createES);
};

function createES(config, app) {
  assert(config.host && config.apiVersion, `[egg-es-plugin] 'host: ${config.host}', 'apiVersion: ${config.apiVersion}', Are required on config`);

  app.coreLogger.info('[egg-es-plugin] connecting elasticsearch server...');

  // 创建实例
  const client = new elasticsearch.Client({
    host: config.host,
    // log: 'trace',
    apiVersion: config.apiVersion,
  });

  // 做启动应用前的检查
  app.beforeStart(() => {
    client.ping({
      requestTimeout: 2000,
    }, function(error) {
      if (error) {
        app.coreLogger.error('[egg-es-plugin] elasticsearch cluster is down with error: ' + error);
      } else {
        app.coreLogger.info('[egg-es-plugin] elasticsearch connects successfully');
      }
    });
  });

  return client;
}

