import { generateCommandString } from "../../lib/utils";
import cn from "classnames";
import { Tags } from "../../components";
import tracker from "../../lib/mixpanel";

const Keybinding = ({ keybinding, highlighted, showAppTag = true, color }) => {
  const { title, binding = {}, platform, _id } = keybinding;
  return (
    <div
      className={cn("keybinding", { highlighted })}
      onClick={() =>
        tracker.track("VIEW_POST", {
          postType: "Keybindings",
          title,
          _id,
        })
      }
    >
      <div className="">
        <h3 className="title">{title}</h3>
        {showAppTag && <Tags tags={platform} align="left" />}
      </div>
      <div className="hotkey">{generateCommandString(binding)}</div>
    </div>
  );
};

export default Keybinding;
