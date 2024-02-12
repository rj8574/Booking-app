import { Routes ,Route} from "react-router-dom";
import "./App.css";
import IndexPage from "./pages/indexPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Layout from "./Layout.jsx";
import RegisterPage  from "./pages/RegisterPage.jsx";
import axios from "axios";
import UserContextProvider  from "./UserContext.jsx";
import AccountPage from "./pages/accountPage.jsx";

 axios.defaults.baseURL='http://localhost:3000'
 axios.defaults.withCredentials= true;
function App() {
  return (
    <UserContextProvider>
        <Routes>
      <Route path="/" element={<Layout/>}>
      <Route index element={<IndexPage/>} />
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/account/:subpage?" element={<AccountPage/>}/>
      <Route path="/account/:subpage/:action" element={<AccountPage/>}/>
      
       </Route>
      
    </Routes>
      
    </UserContextProvider>
  
    
  );
}

export default App;
