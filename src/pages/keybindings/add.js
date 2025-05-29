import React, { useState, Fragment } from "react";
import RecordKeys from "../../components/RecordKeys";
import { generateCommandString } from "../../lib/utils";
import _ from "lodash";
import { Code } from "@mantine/core";
import { copyToClipboard } from "@codedrops/lib";

const AddShortcut = () => {
  const [data, setData] = useState({});
  const jsonBlock = JSON.stringify(data, undefined, 2);
  return (
    <section className="add-container">
      <RecordKeys _onRecordKeybinding={(binding) => setData(binding)} />
      {_.isEmpty(data) ? null : (
        <Fragment>
          <Code block onClick={() => copyToClipboard(jsonBlock)}>
            {jsonBlock}
          </Code>
          <Code block>{generateCommandString(data)}</Code>
        </Fragment>
      )}
    </section>
  );
};

export default AddShortcut;
