export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';
let timer;
import AsyncStorage from "@react-native-async-storage/async-storage";



export const setDidTryAL = () => {
  return {type:SET_DID_TRY_AL};
}

export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch( { type: "AUTHENTICATE", userId: userId, token: token });
  };
};



export const signup = (email, password) => {

  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCo5t4u-sauxeMKnUV-FY3S1JhA0J0yLjE",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );
      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        let message = "Something went wrong!";
        if (errorId === "EMAIL_EXISTS") message = "This email exists already!";
        throw new Error(message);
      }
      const resData = await response.json();
  
      await dispatch(
        authenticate(
          resData.localId,
          resData.idToken,
          parseInt(resData.expiresIn) * 1000
        )
      );
      const expirationDate = new Date(
        new Date().getTime() + parseInt(resData.expiresIn) * 1000
      );
  
      saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    } catch (error) {
      throw new Error("Something went wrong!");
    }
    
  };
};

export const login = (email, password) => {

  return async (dispatch) => {
    console.log('this is login')
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCo5t4u-sauxeMKnUV-FY3S1JhA0J0yLjE",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );
      if (!response.ok) {
        const errorResData = await response.json();
  

        const errorId = errorResData.error.message;
        let message = "Something went wrong!";
        if (errorId === "EMAIL_NOT_FOUND")
          message = "This email could not be found!";
        else if (errorId === "INVALID_PASSWORD")
          message = "This password is not valid!";
        throw new Error(message);
      }
      const resData = await response.json();
      await dispatch(
        authenticate(
          resData.localId,
          resData.idToken,
          parseInt(resData.expiresIn) * 1000
        )
      );
  
      const expirationDate = new Date(
        new Date().getTime() + parseInt(resData.expiresIn) * 1000
      );
  
  
      saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    } catch (error) {
      throw new Error("Something went wrong!")
    }
    
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};
