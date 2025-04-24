import {Routes, Route, BrowserRouter} from "react-router-dom";
import Layout from '../Layout';
import Stays from '../Stays';

/**
 * Router component that defines the application's routing structure using React Router.
 * 
 * This component sets up the routes for the application, including paths for the home page,
 *  individual venue page, user profile, login, and registration. It wraps the routes
 * within a `Layout` component to provide a consistent layout across all pages.
 * 
 * @component
 * @returns {JSX.Element} The Router component containing the application's route definitions.
 */

function Router(){
  return(
    <>
    <BrowserRouter>
    <Routes >
      <Route path="/" element={<Layout/>}>
       <Route index element={<Stays/>}/>
      {/* <Route path= "/Venue/:id" element ={<Venue/>}/>
      <Route path= "/MyProfile" element ={<MyProfile/>}/>
      <Route path= "/Login" element ={<Login/>}/>
      <Route path= "/Register" element = {<Register/>}/>   */}

      </Route>
    </Routes>
    </BrowserRouter>

    </>
  )
}

export default Router;