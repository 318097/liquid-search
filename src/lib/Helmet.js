import Head from "next/head";

const DEFAULT_IMAGE =
  "https://raw.githubusercontent.com/318097/code404/master/public/thumbnail.png?token=GHSAT0AAAAAACKDW2S5WOW5QBUDSP42NOFMZLGEDYQ";
const TWITTER_HANDLE = "@coded404_co";
const TWITTER_CREATOR = '"@318097"';

const Helmet = (props) => {
  const {
    title = "",
    description = "",
    image = DEFAULT_IMAGE,
    pageTitleSuffix = " | LiquidSearch",
  } = props;

  // const currentURL = window.location.href;
  // const content = `${title}
  // ${description}
  // `;

  return (
    <Head>
      <meta charSet="utf-8" />
      <title>{`${title}${pageTitleSuffix ? pageTitleSuffix : ""}`}</title>
      <meta property="og:title" content={title} key="ogtitle" />

      <meta property="og:image" content={image} key="ogimage" />
      {!!description && (
        <>
          <meta name="description" content={description} key="desc" />
          <meta
            property="og:description"
            content={description}
            key="ogdescription"
          />
        </>
      )}
      {/* <meta property="og:type" content={"article"} key="ogtype" /> */}
      {/* <meta property="og:url" content={currentURL} key="ogurl" /> */}
      {/* <meta name="twitter:card" content={title} key="twcard" /> */}
      <meta name="twitter:title" content={title} key="twtitle" />
      <meta
        name="twitter:description"
        content={description}
        key="twdescription"
      />
      <meta name="twitter:image" content={image} key="twimage" />
      <meta name="twitter:site" content={TWITTER_HANDLE} key="twsite" />
      <meta name="twitter:creator" content={TWITTER_CREATOR} key="twcreator" />
    </Head>
  );
};

export default Helmet;
