import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: null/* {
    "_id": {
      "$oid": "638928b8649056d4285135b3"
    },
    "username": "Mustafa",
    "email": "Mustafa@hotmail.com",
    "password": "$2b$10$pc2u9i/yL8Pt2oaE78B3guRKrdeX3uv.gaEKU4hbjVQxHgvydg41O",
    "profilePicture": "",
    "coverPicture": "", 
    "followers": [],
    "followings": [],
    } */,
  isFetching: false,
  error: false,
};


export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  
  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])
  
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};