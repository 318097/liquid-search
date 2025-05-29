// import { useSelector } from "react-redux";
import { Fragment } from "react";
import _ from "lodash";
import { parseTitle } from "../lib/utils";
import Helmet from "../lib/Helmet";
import Link from "next/link";
import { IconWrapper } from "../lib/UI";

const Tags = ({
  tags,
  onClick,
  align = "right",
  fontSize = ".6rem",
  color = "gray",
}) => {
  const tagList = [].concat(tags);
  // const tagKeys = useSelector((state) => state.posts.tagKeys);
  return (
    <div className="tag-list" style={{ textAlign: align, fontSize, color }}>
      {tagList.map((tag, idx) => (
        <Fragment key={tag}>
          <span
            className={onClick ? "link" : ""}
            // style={{ color: tagKeys[tag] }}
            onClick={() => onClick?.(tag)}
          >
            {parseTitle(tag)}
          </span>
          {tagList.length > 1 && idx < tags.length - 1 ? `,` : ""}
        </Fragment>
      ))}
    </div>
  );
};

const FeedTitle = ({ title, description, color, subText }) => {
  return (
    <Fragment>
      <Helmet title={title} />
      <div className="feed-item-header">
        <div>
          <Link href="/" passHref style={{ display: "inline-block" }}>
            <span className="icon no-padding">
              <IconWrapper variant="transparent" type="caret-left" size="xs" />
              <span>Back</span>
            </span>
          </Link>
          <h2 style={{ color, lineHeight: "normal" }}>{title}</h2>
          {!!description && (
            <h4 style={{ color, opacity: 0.8 }}>{description}</h4>
          )}
          {!!subText && <h5 style={{ color, opacity: 0.8 }}>{subText}</h5>}
        </div>
      </div>
      <br />
    </Fragment>
  );
};

export { Tags, FeedTitle };
