import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
//lazy loading image
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
//actions
import { addToCart, removeFromCart } from "../../Store/ListSlice";
//css
import classes from "./ListItems.module.css";
//components
let datas = [];

const ListItems = (props) => {
  const { title, description, stars, km, price } = props.item;
  //hooks
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);
  //--- email for protecting data from other users
  const email = useSelector((state) => state.user.user.user.email);

  // adding to cart

  const addCartHandler = () => {
    dispatch(addToCart(props.item));
    setIsAdded(true);
    datas.push(props.item);

    localStorage.setItem(`${email}`, JSON.stringify(datas));
  };

  // removing from cart
  const removeCartHandler = () => {
    removeLocalStorage();
    dispatch(removeFromCart(props.item));
    setIsAdded(false);
    datas = datas.filter((item) => item.id !== props.item.id);
  };

  //local storage for keep data after refresh
  const removeLocalStorage = () => {
    const local = JSON.parse(localStorage.getItem(`${email}`));
    if (local) {
      local.forEach((item) => {
        if (item.id === props.item.id) {
          local.splice(local.indexOf(item), 1);
          localStorage.setItem(`${email}`, JSON.stringify(local));
        }
      });
    }
  };

  //avoiding re-rendering
  useEffect(() => {
    //--- initialising local storage to datas -> (this  "??" checks for if initially null)
    datas = JSON.parse(localStorage.getItem(`${email}`)) ?? [];

    const getLocalStorage = () => {
      const local = JSON.parse(localStorage.getItem(`${email}`));
      if (local) {
        local.forEach((item) => {
          if (item.id === props.item.id) {
            setIsAdded(true);
          }
        });
      }
    };
    getLocalStorage();
  }, [email, props.item.id]);

  return (
    <div className={classes.list}>
      <div className={classes["list-content"]}>
        <div className={classes["list-image"]}>
          <LazyLoadImage
            effect="blur"
            src={require("./Bosphorus.jpg")}
            alt={title}
          />
        </div>

        <div className={classes["list-imageless"]}>
          <h3>{title}</h3>
          <span>{description}</span>
          <div>
            <span className={classes["list-stars"]}>{stars}</span>
            <span className={classes["list-km"]}>{km}</span>
          </div>
          <span className={classes["list-price"]}>{price}</span>
        </div>

        <button onClick={addCartHandler}>
          {!isAdded && <img src={require("./Button.png")} alt="Button" />}
        </button>
        <button onClick={removeCartHandler}>
          {isAdded && <img src={require("./Button2.png")} alt="Button" />}
        </button>
      </div>
    </div>
  );
};

export default ListItems;
