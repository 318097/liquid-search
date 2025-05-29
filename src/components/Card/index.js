import Post from "./Post";
import Keybinding from "./Keybinding";
import Products from "./Products";
import Liquid from "./Liquid";

const Card = (props) => {
  const { data, type, ...rest } = props;

  switch (type) {
    case "POST":
      return <Post {...rest} post={data} />;
    case "KEYBINDINGS":
      return <Keybinding {...rest} keybinding={data} />;
    case "PRODUCTS":
      return <Products {...rest} product={data} />;
    case "LIQUID":
      return <Liquid {...rest} data={data} />;
    default:
      return null;
  }
};

export default Card;
