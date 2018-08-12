# 轻量赋能版 react-router

摒弃同类产品的劣根，汲取优秀产品的精华，结合数据管理的优势，打造出轻量实用幸福的产品，为react-router更好的赋能😂😂😂！！
> 请容我小小的吹个牛逼~

## 大致介绍

这款轻量版 react-router是基于 history api 和 hash 实现的，用户可以根据业务场景和需求选择 router 类型。
> router 实现可以参考 [对前端路由选择的思考](https://github.com/func-star/blog/issues/22)

除此之外，mo-react-router 还融合了全局状态管理，用户可以将数据绑定在每一个页面实例上，用户可以自由方便的通过路由来获取其他页面的数据。

### 依赖

- [mona-events](https://github.com/func-star/mona-events)

### 安装

```
$ npm i --save mo-react-router
```

### 使用

```
import React, { Component } from 'react';
import { render } from 'react-dom';
import Router from 'router';

import DefaultLayout from 'views/layout/default'
import NoMatch from 'pages/noMatch'
import Home from 'pages/home'

const routerConf =  {
	index: 'home',
	emptyPage: 'test',
	type: 'history',
	routeList: [
		{
			layout: DefaultLayout,
			routes: {
				'home/:name/:count': Home
			}
		}, {
			routes: {
				'404': NoMatch
			}
		}
	]
}

render(<Router config={routerConf} />, document.getElementById('appWrapper'));

```


