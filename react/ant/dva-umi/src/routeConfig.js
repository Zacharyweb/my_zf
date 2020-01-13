// import IndexPage from './routes/IndexPage';
// import Home from './routes/Home';
// import User from './routes/User';
// import Profile from './routes/Profile';
// import Register from './routes/Register';
// import Login from './routes/Login';
// export default [
//   {
//     path:'/',
//     component:IndexPage,
//     routes:[
//       {
//         path:'/home',
//         redirect:true,
//         component:Home
//       },
//       {
//         path:'/user',
//         component:User
//       },
//       {
//         path:'/profile',
//         component:Profile
//       },
//       {
//         path:'/login',
//         component:Login
//       }, {
//         path:'/register',
//         component:Register
//       }
//     ]
//   }
// ];

// 异步加载
export default  [
    {
      path:'/',
      component:()=>import('./routes/IndexPage'),
      routes:[
        {
          path:'/home',
          models:[import('./models/home')],
          component:()=>import('./routes/Home')
        },
        {
          path:'/user',
          component:()=>import('./routes/User')
        },
        {
          path:'/profile',
          component:()=>import('./routes/Profile'),
          authority:true
        },
        {
          path:'/login',
          component:()=>import('./routes/Login')
        }, {
          path:'/register',
          component:()=>import('./routes/Register')
        }
      ]
    }
  ]