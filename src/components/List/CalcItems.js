import { useSelector } from "react-redux";
import classes from "./CalcItems.module.css";

const CalcItems = () => {
  //-- just re renders this component, when data changes in the listItems component
  useSelector((state) => state);

  //--- email for protecting data from other users
  const email = useSelector((state) => state.user.user.user.email);

  //--Variables for calculation
  const kargo = 10;
  const kdv = 0.1;
  let total = 0,
    totalKdvKargo = 0,
    sumTotal = 0;

  //---Calculations
  const local = JSON.parse(localStorage.getItem(`${email}`));
  if (local) {
    local.forEach((item) => {
      total += item.price;
      totalKdvKargo = total * kdv + kargo; //1 kargo fiyatı tüm sepet için geçerli
      sumTotal = total + totalKdvKargo;
    });
  }

  return (
    <div className={classes["calc-container"]}>
      <div className={classes["calc"]}>
        <h2>Ürünlerin Toplamı:</h2>
        <div className={classes["calc-in"]}>
          <span>Toplam: {total} TL</span>
          <span>Vergiler + Kargo: {totalKdvKargo}</span>
          <span>Genel Toplam: {sumTotal} TL</span>
        </div>
      </div>
    </div>
  );
};
export default CalcItems;
