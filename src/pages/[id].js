import _ from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import { getLiquid } from "../lib/db";
import { wrapper } from "../store";
import { updateFeedData } from "../store/app";
import { setCurrentL0, setLiquidData } from "../store/liquid";
import {
  COLORS,
  getFeedConfig,
  getRandomElementFromArray,
  parseTitle,
} from "../lib/utils";
import config from "../config";
import { FeedTitle } from "../components";
import { IconWrapper, getIcon } from "../lib/UI";

const getSortFn = () => {
  const subTypelength = [
    ([subType]) => {
      return subType.length;
    },
    "desc",
  ];

  const postslength = [
    ([, posts]) => {
      return posts.length;
    },
    "desc",
  ];

  const subTypeAlphabetical = [([subType]) => subType, "desc"];

  return getRandomElementFromArray(
    [subTypelength, postslength, subTypeAlphabetical],
    { usePredictiveIdx: true }
  );
};

const LiquidIcon = ({ data }) => {
  const { subType } = data;
  const colorObj = getRandomElementFromArray(COLORS);
  const style = {
    // background: `${colorObj["primary"]}`,
  };
  const icon = _.replace(_.toLower(subType), /[^a-zA-Z]/gi, "-");

  if (!getIcon(icon)) {
    console.log("icon::-", icon);
    return;
  }

  return (
    <span className="liquid-icon" title={subType} style={style}>
      {getIcon(icon) ? (
        <IconWrapper
          type={icon}
          variant="transparent"
          size="xl"
          style={{
            fontSize: "1.2rem",
            fontWeight: "normal",
            color: `${colorObj["primary"]}`,
          }}
        />
      ) : (
        subType[0]
      )}
    </span>
  );
};

const Apps = (props) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.liquid.data[props.type]);
  const filters = useSelector((state) => state.liquid.filters);
  const { tags } = filters;

  const filteredData = _.isEmpty(tags)
    ? data
    : data.filter(
        (dataItem) => dataItem.subType && _.includes(tags, dataItem.subType)
      );
  const grouppedData = _.orderBy(
    Object.entries(_.groupBy(filteredData, "subType")),
    ...getSortFn()
  );

  const filteredGrouppedData = _.filter(
    grouppedData,
    ([, groupData]) => !!groupData.length
  );

  useEffect(() => {
    dispatch(setCurrentL0(props.type));
  }, []);

  const config = getFeedConfig(props.type);
  return (
    <section>
      <FeedTitle
        {...config}
        subText={`Showing ${filteredData.length}/${data.length} in ${props.type}.`}
      />
      <div className="groupped-container">
        {_.map(filteredGrouppedData, ([groupName, groupData]) => {
          return (
            <div className="group">
              <div className="group-title">
                <LiquidIcon data={{ subType: groupName }} />
                {parseTitle(groupName)}
                <span className="medium">
                  {groupName ? ` (${groupData.length})` : ""}
                </span>
              </div>
              <div className="liquid-wrapper">
                {groupData.map((data) => {
                  const { _id } = data;
                  return (
                    <Card data={data} key={_id} type="LIQUID" config={config} />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Apps;

// export async function getStaticPaths() {
//   const paths = config.liquidRoutes.map((id) => {
//     return {
//       params: {
//         id,
//       },
//     };
//   });

//   return {
//     paths,
//     // Set fallback to blocking. Now any new post added post build will SSR
//     // to ensure SEO. It will then be static for all subsequent requests
//     fallback: "blocking",
//   };
// }

// export const getStaticProps = wrapper.getStaticProps(
//   (store) =>
//     async ({ params }) => {
//       const liquid = await getLiquid();

//       store.dispatch(
//         updateFeedData({
//           ...liquid,
//         })
//       );
//       store.dispatch(setLiquidData(liquid));

//       return {
//         props: {
//           type: params.id,
//         },
//       };
//     }
// );
