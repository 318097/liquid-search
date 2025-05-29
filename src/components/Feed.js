import Card from "./Card";
import Link from "next/link";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
// import colors from "@codedrops/react-ui";
import { useEffect } from "react";
import { getProducts } from "../lib/db";
import { updateFeedData } from "../store/app";
import config from "../config";
import { IconWrapper } from "../lib/UI";
import tracker from "../lib/mixpanel";
import { getTotalCount } from "../lib/utils";
import _ from "lodash";

const StyledFeed = styled.div`
  .feed-item-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
    display: flex;
    flex-direction: column;
    margin-bottom: 80px;
    .feed-item-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      h3 {
        font-weight: bold;
      }
      a {
        font-size: 0.8rem;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

const date = new Date().getDate();

const Feed = () => {
  const layout = useSelector((store) => store.app.layout);
  const feedData = useSelector((store) => store.app.feedData);
  const dispatch = useDispatch();
  const total = useSelector((store) => getTotalCount(store));

  const feed = layout
    .map((layoutConfig) => {
      const { title, sortIdx } = layoutConfig;
      const len = title.length;

      return {
        ...layoutConfig,
        data: feedData[layoutConfig.key]?.slice(0, config.FEED_SIZE_LIMIT),
        sortIdx: sortIdx || len % date,
      };
    })
    .filter(
      (layoutConfig) =>
        layoutConfig.visible &&
        (layoutConfig.data?.length || layoutConfig.comingSoon)
    );

  useEffect(() => {
    getProducts().then((products) => {
      dispatch(updateFeedData({ products }));
    });
  }, []);

  return (
    <StyledFeed>
      {_.orderBy(feed, "sortIdx").map((config, idx) => {
        const {
          key,
          type,
          title,
          description,
          href,
          data,
          contentContainerClass,
          color,
          comingSoon,
        } = config;
        return (
          <div className="feed-item-container" key={idx}>
            <div className="feed-item-header">
              <div className="">
                <h3 style={{ lineHeight: "normal", color }} id={title.slice(1)}>
                  {title}
                  {!!total[key] && (
                    <span className="medium">{` (${total[key]})`}</span>
                  )}
                </h3>
                {!!description && (
                  <h5 style={{ color, opacity: 0.8 }}>{description}</h5>
                )}
              </div>
              {!!href && !comingSoon && (
                <Link
                  passHref
                  href={href}
                  onClick={() =>
                    tracker.track("CLICKED_MORE", { postType: title })
                  }
                >
                  <span className="icon no-padding">
                    <span>more</span>
                    <IconWrapper variant="transparent" type="caret-right" />
                  </span>
                </Link>
              )}
            </div>
            {comingSoon ? (
              <div className="coming-soon">Coming soon</div>
            ) : (
              <div className={contentContainerClass}>
                {data.map((dataItem) => {
                  return (
                    <Card
                      data={dataItem}
                      key={dataItem._id || dataItem.id}
                      type={type}
                      color={color}
                      config={config}
                    />
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </StyledFeed>
  );
};

export default Feed;
