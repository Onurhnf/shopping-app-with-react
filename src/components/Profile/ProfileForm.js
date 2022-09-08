import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Store/UserSlice";
import { useNavigate } from "react-router-dom";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const email = useSelector((state) => state.user.user.user.email);
  const logoutHandler = () => {
    navigate("/auth");
    dispatch(logout());
  };

  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="email">Email:</label>
        <span> {email}</span>
      </div>

      <div className={classes.action}>
        {isLoggedIn && ( //logout button
          <button type="button" onClick={logoutHandler}>
            Logout
          </button>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
