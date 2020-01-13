import React from 'react'
import {Route,Redirect} from 'dva/router';
//import dynamic from 'dva/dynamic';

function dynamic({app,models,component}){
  class Dynamic extends React.Component{
    state={Component: null}
     componentDidMount() {
        Promise.all(
          [
            Promise.all(models()),
            component()
          ]
        ).then(([models,Component])=>{
          models.map(item=>item.default).forEach(model=>app.model(model));
          this.setState({Component});
        });
    }
    render(){
      let Component = this.state.Component;
      return Component&&<Component {...this.props}/>
    }
  }
  return Dynamic;
}

export function renderRoutes(routesConfig,app){
    return routesConfig.map(({path,exact=false,component,routes=[],models=[]},index)=>(
        //<Route path={path} exact={exact} key={index} render={props=><Component {...props} routes={routes}/>}/>
        <Route
         path={path} exact={exact} key={index}
         component={dynamic({
           app,
           models:()=>models,
           component:()=>{
              return component().then(result=>{
                   let Component = result.default || result;
                   return props=><Component {...props} routes={routes} app={app}/>;
             })
           }
         })}
        />
    ))
}

export function renderRedirect(from,exact,routesConfig){
    let {path} = routesConfig.find(route=>route.redirect)||routesConfig[0];
    return <Redirect exact={exact} from={from} to={path}/>
}