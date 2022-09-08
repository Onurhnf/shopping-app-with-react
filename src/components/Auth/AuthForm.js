import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
//redux imports
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Store/UserSlice";
//css
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  //hooks
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const isUserLoggedin = useSelector((state) => state.isLoggedIn);
  // refs
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  // state hooks
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  //--- Switch between Sign in and Sign Up
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  //--- Submitting the form
  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    //--->Email and password Validation skipped

    setIsLoading(true); //loading spinner/text starts here
    let url;
    if (isLogin) {
      // sign in
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyArus-E1uOFfSmjwW2r4xj1hnbAZtOyq1o";
    } else {
      //sign up
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyArus-E1uOFfSmjwW2r4xj1hnbAZtOyq1o";
    }
    try {
      const response = await fetch(url, {
        //fetching data from firebase for sign in/up
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsLoading(false); //loading spinner/text ends here

      const data = await response.json();
      if (!response.ok) {
        // if response is not ok
        //error
        throw new Error(data.error.message);
      } else {
        //success response,
        if (!isUserLoggedin && isLogin) {
          // if entered data for sign in
          dispatch(
            login({
              user: data,
              isLoggedIn: true,
            })
          );
          navigate("/profile");
        } else {
          //if entered data for sign up
          //history push to home (useHistory hook is no longer supported with react-router-dom v6)
          navigate("/");
          return;
        }
      }
    } catch (error) {
      //error handling
      alert(error.message);
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Sign in" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.userinput}>
          <br />
          <input
            type="email"
            id="email"
            className={classes.inputtext}
            required
            ref={emailInputRef}
          />
          <span className={classes.floatinglabel}>Email</span>
        </div>

        <div className={classes.userinput}>
          <br />
          <input
            type="password"
            id="password"
            className={classes.inputtext}
            required
            ref={passwordInputRef}
          />
          <span className={classes.floatinglabel}>Password</span>
        </div>

        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? "Sign In" : "Sign Up"}</button>}
          {isLoading && <p>Sending request...</p>}

          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            <u>
              {isLogin ? "Create new account" : "Sign in with existing account"}
            </u>
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
