// import React from 'react';
// import { connect } from 'dva';

// import {Layout} from 'antd';
// import NavBar from '../components/NavBar';
// import {Route,Switch,Redirect} from 'dva/router';
// import Home from './Home';
// import User from './User';
// import Profile from './Profile';
// import Register from './Register';
// import Login from './Login';
// const {Content} = Layout;
// function IndexPage(props) {
//   return (
//     <Layout>
//       <NavBar {...props}/>
//       <Content>
//         <Switch>
//           <Route path="/home" component={Home} />
//           <Route path="/user" component={User} />
//           <Route path="/profile" component={Profile} />
//           <Route path="/register" component={Register} />
//           <Route path="/login" component={Login} />
//           <Redirect  to="/home"/>
//         </Switch>
//       </Content>
//     </Layout>
//   );
// }
// export default connect()(IndexPage);

import React from 'react';
import { connect } from 'dva';
import {Layout} from 'antd';
import NavBar from '../components/NavBar';
import {Switch} from 'dva/router';
import NoMatch from '../components/NoMatch';
import {renderRoutes,renderRedirect} from '../utils/routes';
const {Content} = Layout;
function IndexPage(props) {
  return (
    <Layout>
      <NavBar {...props}/>
      <Content>
        <Switch>
          {renderRoutes(props.routes,props.app)}
          {renderRedirect('/',true,props.routes)}
          <NoMatch/>
        </Switch>
      </Content>
    </Layout>
  );
}

export default connect()(IndexPage);