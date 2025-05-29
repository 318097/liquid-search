import _ from "lodash";
import { useSelector } from "react-redux";
import Card from "../../components/Card";
import { wrapper } from "../../store";
import { getKeybindings } from "../../lib/db";
import { setKeybindings } from "../../store/keybindings";
import { getFeedConfig, parseTitle } from "../../lib/utils";
import { FeedTitle } from "../../components";

const Keybindings = () => {
  const data = useSelector((state) => state.keybindings.keybindings);
  const highlightedIds = useSelector(
    (state) => state.keybindings.highlightedIds
  );
  const filters = useSelector((state) => state.keybindings.filters);

  const { tags } = filters;

  const filteredData = _.sortBy(data, "platform").filter((dataItem) =>
    _.isEmpty(tags)
      ? true
      : dataItem.platform && _.includes(tags, dataItem.platform)
  );
  const grouppedData = Object.entries(_.groupBy(filteredData, "platform"));

  const filteredGrouppedData = _.filter(
    grouppedData,
    ([, groupData]) => !!groupData.length
  );

  return (
    <section>
      <FeedTitle
        {...getFeedConfig("keybindings")}
        subText={`Showing ${filteredData.length}/${data.length} shortcuts.`}
      />
      <div className="groupped-container">
        {_.map(filteredGrouppedData, ([groupName, groupData]) => {
          return (
            <div className="group">
              <div className="group-title">
                {parseTitle(groupName)}
                <span className="medium">
                  {groupName ? ` (${groupData.length})` : ""}
                </span>
              </div>
              <div className="keybindings-wrapper">
                {groupData.map((keybinding) => {
                  const { _id } = keybinding;
                  return (
                    <Card
                      data={keybinding}
                      key={_id}
                      highlighted={_.includes(highlightedIds, _id)}
                      type="KEYBINDINGS"
                      showAppTag={false}
                    />
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

export default Keybindings;

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const keybindings = await getKeybindings();
  store.dispatch(setKeybindings(keybindings));
});
