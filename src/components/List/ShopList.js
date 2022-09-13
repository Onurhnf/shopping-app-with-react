import ListItems from "./ListItems";
import CalcItems from "./CalcItems";
import classes from "./ShopList.module.css";
import Container from "../UI/Container";

const ShopList = () => {
  //----firebase fetching skipped.
  const DUMMY_DATA = [
    {
      id: "1",
      title: "Villa Item",
      description: "Amazing description",
      stars: 4,
      price: 1_000,
      km: "2.1 km",
    },
    {
      id: "2",
      title: "Villa Item2",
      description: "Amazing description2",
      stars: 2,
      price: 2_000,
      km: "3.7 km",
    },
  ];

  return (
    <Container>
      <h2>List</h2>
      <div className={classes.lists}>
        {DUMMY_DATA.map((item) => (
          <ListItems key={item.id} item={item} />
        ))}
      </div>
      <CalcItems />
    </Container>
  );
};

export default ShopList;
