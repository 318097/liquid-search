import Feed from "../components/Feed";
import { getKeybindings, getLiquid, getPosts } from "../lib/db";
import { wrapper } from "../store";
import { updateFeedData } from "../store/app";
import { setLiquidData } from "../store/liquid";

const Home = () => {
  return (
    <section id="home">
      <Feed />
      {/* <iframe
        src="https://v2-embednotion.com/a17529e0c28249e0b78e96be5dd82d6e"
        style={{ width: "100%", height: "800px", border: 0, padding: 0 }}
      ></iframe> */}
    </section>
  );
};

export default Home;

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const { posts } = await getPosts();
  const keybindings = await getKeybindings();
  const liquid = await getLiquid();

  store.dispatch(
    updateFeedData({
      posts,
      keybindings,
      ...liquid,
    })
  );
  store.dispatch(setLiquidData(liquid));
});
