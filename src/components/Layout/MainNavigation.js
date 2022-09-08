import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import classes from "./MainNavigation.module.css";
const MainNavigation = () => {
  //hooks
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <div className={classes.head}>
      <div className={classes.context}>
        {!isLoggedIn && ( //if user is not logged in show this button
          <div>
            <Link to="/auth">Sign in/up</Link>
          </div>
        )}
        {isLoggedIn && ( //if user is logged in then show list button
          <div>
            <Link to="/list">
              <img src={require("./List.png")} alt="listImage" />
            </Link>
          </div>
        )}
        {isLoggedIn && ( //if user is logged in then show profile button
          <div>
            <Link to="/profile">
              <img src={require("./Account.png")} alt="accountImage" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainNavigation;
