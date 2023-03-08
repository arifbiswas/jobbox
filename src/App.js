import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { getUser, setUser, toggleLoading } from "./features/auth/authSlice";
import auth from "./firebase/firebaseConfig";
import routes from "./routes/routes";
import { Toaster } from 'react-hot-toast';

function App() {
  const {user:{email}, isLoading} = useSelector((state) => state.auth)
  console.log(email);
  // console.log(isLoading);
  const dispatch = useDispatch();
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
     if(user?.email){
      dispatch(getUser(user?.email))
      }
      else{
        dispatch(toggleLoading())
      }
    })
  },[])
  return (
    <>
      <RouterProvider router={routes} />
      <Toaster />
    </>
  );
}

export default App;
