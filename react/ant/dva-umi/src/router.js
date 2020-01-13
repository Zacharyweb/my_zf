// import React from 'react';
// import { Router, Route, Switch } from 'dva/router';
// import IndexPage from './routes/IndexPage';

// function RouterConfig({ history }) {
//   return (
//     <Router history={history}>
//       <Switch>
//         <Route path="/"  component={IndexPage} />
//       </Switch>
//     </Router>
//   );
// }

// 配置式路由
// import React from 'react';
// import { Router, Switch } from 'dva/router';
// import {renderRoutes} from './utils/routes';
// import routesConfig from './routeConfig';
// function RouterConfig({ history }) {
//   return (
//     <Router history={history}>
//       <Switch>
//         {renderRoutes(routesConfig)}
//       </Switch>
//     </Router>
//   );
// };
// export default RouterConfig;

import React from 'react';
import { Router, Switch } from 'dva/router';
import {renderRoutes} from './utils/routes';
import routesConfig from './routeConfig';
function RouterConfig({ history,app }) {
  return (
    <Router history={history}>
      <Switch>
        {renderRoutes(routesConfig,app)}
      </Switch>
    </Router>
  );
}
export default RouterConfig;
