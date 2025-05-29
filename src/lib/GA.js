import { Fragment } from "react";

const GA = ({ config }) => {
  return config.IS_PROD ? (
    <Fragment>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${config.GA_ID}`}
      />

      <script
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${config.GA_ID}', { page_path: window.location.pathname });
            `,
        }}
      />
    </Fragment>
  ) : null;
};

export default GA;
