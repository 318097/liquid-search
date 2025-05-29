import { useRouter } from "next/router";
import { MantineProvider } from "@mantine/core";
import { wrapper } from "../store";
import { Provider, useDispatch } from "react-redux";
import React, { Fragment, useState, useEffect } from "react";
import { DefaultSeo } from "next-seo";
import config from "../config";
import Head from "next/head";
import dynamic from "next/dynamic";
import GA from "../lib/GA";
import { hotjar } from "react-hotjar";
import tracker from "../lib/mixpanel";
import Header from "../components/Header";
import axios from "axios";
import "../styles/index.scss";
import { setAppRoute } from "../store/app/actions";
import { LoaderWrapper } from "../lib/UI";
import Footer from "../components/Footer";
import { initAnalytics } from "../firebase";
import { initialize } from "../lib/utils";
import { Analytics } from "@vercel/analytics/react";

axios.defaults.baseURL = config.SERVER_URL;
// axios.defaults.headers.common["authorization"] = getToken();
axios.defaults.headers.common["external-source"] = "CODE404";

const CrispWithNoSSR = dynamic(() => import("../lib/Crisp"), {
  ssr: false,
});

const { appName, tagline } = config;

const mantineTheme = {
  colorScheme: "dark",
  defaultRadius: "xs",
  primaryColor: "dark",
  fontFamily: "Roboto Mono",
  loader: "bars",
};

const App = ({ children }) => {
  const [initAppLoading, setInitAppLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    tracker.track("INIT");
    if (config.IS_PROD) {
      hotjar.initialize(config.HJ_ID, 6);
      initAnalytics();
    }
    dispatch(setAppRoute(router.asPath));
    initialize();

    setTimeout(() => {
      setInitAppLoading(false);
    }, 100);
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      dispatch(setAppRoute(url));
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  return initAppLoading ? (
    <LoaderWrapper fullScreen />
  ) : (
    <main>
      <div className="header-background">
        <Header />
      </div>
      <div className="content-background">{children}</div>
      <Footer />
    </main>
  );
};

function Layout({ Component, pageProps, ...rest }) {
  const { store, props } = wrapper.useWrappedStore({ ...rest, pageProps });
  return (
    <Fragment>
      <Head>
        <title>{appName}</title>
        <meta name="description" content={tagline} />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta
          name="google-adsense-account"
          content="ca-pub-1213904748793222"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap"
          rel="stylesheet"
        />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.5.0/styles/atom-one-dark-reasonable.min.css"
        />
        <GA config={config} />
      </Head>
      <DefaultSeo title={appName} description={tagline} />
      <Provider store={store}>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={mantineTheme}>
          <App>
            <Component {...props.pageProps} />
          </App>
        </MantineProvider>
      </Provider>
      {config.IS_PROD && <CrispWithNoSSR />}
      <Analytics />
    </Fragment>
  );
}

export default Layout;
