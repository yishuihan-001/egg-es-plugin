# egg-es-plugin

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-es-plugin.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-es-plugin
[travis-image]: https://img.shields.io/travis/eggjs/egg-es-plugin.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-es-plugin
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-es-plugin.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-es-plugin?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-es-plugin.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-es-plugin
[snyk-image]: https://snyk.io/test/npm/egg-es-plugin/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-es-plugin
[download-image]: https://img.shields.io/npm/dm/egg-es-plugin.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-es-plugin

<!--
Description here.
-->

## 安装插件

```bash
$ npm i egg-es-plugin --save
```

## 插件开启与配置

### 开启插件
```js
// config/plugin.js
exports.esPlugin = {
  enable: true,
  package: 'egg-es-plugin',
};
```

### 插件配置

```js
// /config/config.default.js
exports.esPlugin = {
  client: {
    host: 'localhost:9200', // elasticsearch 访问地址
    apiVersion: '7.6', // elasticsearch 版本（一个小数点即可，即不要写精确版本，如 7.6.1 需写为 7.6）
  },
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## 使用案例

> 案例所示是在 egg service 中调用

```js
async findOneByES(userId) {
  const { ctx } = this;

  try {
    const esData = await ctx.esSearch({
      index: 'user',
      from: 0,
      size: 10,
      body: {
        query: {
          match: {
            id: userId
          },
        },
      },
    });

    return esData.data[0]
  } catch (error) {
    throw error;
  }
}
```

## 出入参说明

如上，我们可以通过 **ctx.esSearch** 方法来对 elasticsearch 中指定的索引检索数据，入参如下：

1. index：索引名称，必传
2. from：数据下标，类似数组索引，非必传
3. size：返回数据的条数，非必传
4. body：具体的 elasticsearch 查询规则，必传

经过 elasticsearch 查询，我们得到了返回的查询结果 esData，其中结构如下：

```js
{
  total: 3,
  data: [{}, {}, {}]
}
```

* total：表示满足查询条件的数据条数
* data：本次查询返回的数据，data 恒定为数组格式

## License

[MIT](LICENSE)
