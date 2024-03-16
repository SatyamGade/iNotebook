import { createContext, useContext, useEffect, useState } from "react";

const URL = "https://i-notebook-backend-weld.vercel.app/api/auth/user";

export const JWTContext = createContext();

export const JWTProvider = ({children}) =>{

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userAuth, setUserAuth] = useState("");

  const setJwtTokenToLS = (serverToken)=>{
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  }

  const logoutUser = ()=>{
    setToken("");
    setUserAuth("");
    localStorage.removeItem("token");
  }

  let isLoggedIn = token!="" ? true : false;

  const authToken = `Bearer ${token}`;
  const getJwtToken = async ()=>{
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers:{
          Authorization: authToken
        }
      })

      if(response.ok){
        const resData = await response.json();
        setUserAuth(resData.userData);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(()=>{
    getJwtToken();
  }, [])

  return (
    <JWTContext.Provider value={{setJwtTokenToLS, userAuth, logoutUser, authToken, isLoggedIn}}>
      {children}
    </JWTContext.Provider>
  )
}

export const useJWT = ()=>{
  const context = useContext(JWTContext);
  if(!context){
    throw new Error("Context is used outside the provider");
  }
  return context;
}
