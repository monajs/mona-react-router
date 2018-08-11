import React, { Component } from 'react';
import { render } from 'react-dom';
import Router from 'router';

import RouterConf from './routeConf';

import 'app.less';

//*************项目路由**************
render(<Router config={RouterConf} />, document.getElementById('appWrapper'));
