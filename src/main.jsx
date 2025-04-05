
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Authlayout,LoginPage,SignupPage,Allpost,Addpost,Editpost,Post,Home} from './components/index.js'
const  router=createBrowserRouter(createRoutesFromElements(
<Route path='/' element={<App/>}>
<Route path='/' element={<Home/>}/>
<Route path='/login' element={(
  <Authlayout Authentication={false}>
     <LoginPage/>
  </Authlayout>
)}/>
<Route path='/signup' element={(
  <Authlayout Authentication={false}>
     <SignupPage/>
  </Authlayout>
)}/>
<Route path='/all-posts' element={(

      <Allpost/>

)}/>
<Route path='/add-post' element={(
  <Authlayout Authentication={true}>
      <Addpost/>
  </Authlayout>
)}/>
<Route path='/edit-post/:slug' element={(
  <Authlayout Authentication={true}>
      <Editpost/>
  </Authlayout>
)}/>
<Route path='/post/:slug' element={(
<Post/>
)}/>  




</Route>



))

createRoot(document.getElementById('root')).render(
  <StrictMode>
   < Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
