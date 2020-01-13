import { Redirect} from 'react-router-dom';
export default ({ render, ...others }) => {
  return (
    localStorage.getItem('login') ? render(others) :<Redirect to={ {pathname:'/login',state:{from:others.location.pathname}} }/>
  )
};