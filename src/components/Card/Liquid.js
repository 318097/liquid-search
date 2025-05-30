import cn from "classnames";
import { getDataFromStorage, saveDataToStorage } from "../../lib/utils";
import { Tags } from "../../components";
import _ from "lodash";
import tracker from "../../lib/mixpanel";
import config from "../../config";
import { Fragment, useEffect, useState } from "react";
import { Tooltip } from "@mantine/core";
import { IconWrapper } from "../../lib/UI";

const parseURL = (url) => {
  const qs = `ref=liquidsearch.co`;
  return url.includes("?") ? `${url}&${qs}` : `${url}?${qs}`;
};

const markLinkAsVisited = (url) => {
  const data = getDataFromStorage(config.appId);
  data["visitedLinks"].push(url);
  data["visitedLinks"] = _.uniq(data["visitedLinks"]);
  saveDataToStorage(config.appId, data);
};

const getIsURLVisited = (url) => {
  const data = getDataFromStorage(config.appId);
  return data["visitedLinks"]?.includes(url);
};

const Liquid = ({ data, highlighted, config = {} }) => {
  const { title, url, tags, _id, type, description, priority } = data;
  const [visited, setVisited] = useState(false);

  const starred = priority === "High";

  useEffect(() => {
    setVisited(getIsURLVisited(url));
  }, []);

  const httpsRemovedUrl = url.replace("https://", "");
  const parsedURL = httpsRemovedUrl.endsWith("/")
    ? httpsRemovedUrl.slice(0, -1)
    : httpsRemovedUrl;
  const parsedTitle = _.startCase(title);
  const content = (
    <Fragment>
      {parsedTitle}
      {description ? ` - ${_.capitalize(description)}` : ""}
    </Fragment>
  );
  return (
    <a
      href={parseURL(url)}
      target="__blank"
      className={cn("liquid", { highlighted })}
      style={{ borderColor: starred ? config.color : "transparent" }}
      onClick={() => {
        tracker.track("VIEW_POST", {
          postType: "Liquid",
          title,
          url,
          _id,
          L0: type,
        });
        markLinkAsVisited(url);
        setVisited(true);
      }}
    >
      <div className="content-container">
        <Tooltip
          openDelay={1000}
          label={
            <Fragment>
              {content}
              <div style={{ wordBreak: "break-word" }}>{parsedURL}</div>
            </Fragment>
          }
          position="bottom"
          offset={8}
          withArrow
          w={220}
          multiline
        >
          <div style={{ width: "100%", overflow: "hidden" }}>
            <h4 className="title">{content}</h4>
            <div className="url">{parsedURL}</div>
            <Tags tags={tags} align="left" color="white" fontSize=".7rem" />
          </div>
        </Tooltip>
        {visited && (
          <span className="visited">
            <IconWrapper
              tooltip="Visited"
              variant="transparent"
              type="check"
              style={{
                color: config.color,
              }}
              color={config.color}
              size="xs"
            />
          </span>
        )}
      </div>
    </a>
  );
};

export default Liquid;
