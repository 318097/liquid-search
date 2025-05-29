import React from "react";
import styled from "@emotion/styled";
import { md } from "../../lib";
import _ from "lodash";
import tracker from "../../lib/mixpanel";
import Link from "next/link";
import colors from "../../lib/magicdust";
import { Tags } from "../../components";

const CardWrapper = styled.div`
  height: 140px;
  display: flex;
  flex-direction: column;
  position: relative;
  background: ${colors.PRIME};
  flex: 1 1 auto;
  overflow: hidden;
  display: flex;
  border-radius: 4px;
  transition: 0.2s;
  border: 1px dashed transparent;
  a {
    overflow: hidden;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    width: 100%;
    padding: 20px 10px;
    .title {
      text-align: center;
      font-size: 1rem;
      line-height: normal;
    }
  }
  .info-list {
    padding: 2px 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .tag {
      font-size: 0.6rem;
    }
  }

  &:hover {
    opacity: 0.8;
  }
  /* &:hover {
    border: 1px dashed gray;
    .card .title {
      color: gray;
    }
  } */
`;

const Card = ({ post, customStyle }) => {
  const {
    title = "",
    type = "DROP",
    tags = [],
    slug,
    liveId,
    _id,
  } = post || {};

  const pathname = `/posts/${slug}`;

  return (
    <CardWrapper style={customStyle} className={_.toLower(type)}>
      <Link
        href={pathname}
        passHref
        onClick={() =>
          tracker.track("VIEW_POST", {
            postType: "CodeDrops",
            title,
            _id,
          })
        }
      >
        <h3
          className="title"
          dangerouslySetInnerHTML={{ __html: md.renderInline(title) }}
        />
      </Link>

      <div className="info-list">
        <div className="fcc">
          <span className="tag" color="green">{`#${liveId}`}</span>
        </div>
        <Tags tags={tags} color="white" />
      </div>
    </CardWrapper>
  );
};

export default Card;
