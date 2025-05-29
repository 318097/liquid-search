import { useState, useEffect, useRef } from "react";
import _ from "lodash";
import { ButtonWrapper } from "../lib/UI";
import { onRecordKeybinding } from "../store/keybindings/actions";
import { useDispatch } from "react-redux";
import { setHighlightedIds } from "../store/keybindings";

const RecordKeys = ({ className, _onRecordKeybinding }) => {
  const [status, setStatus] = useState(null);
  const dispatch = useDispatch();
  const statusRef = useRef();

  useEffect(() => {
    if (status === "RECORDING")
      document.addEventListener("keydown", handleKeyDown);
    else document.removeEventListener("keydown", handleKeyDown);
  }, [status]);

  useEffect(() => {
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleKeyDown = (e) => {
    if (!statusRef.current) return;

    e.stopPropagation();
    e.preventDefault();
    dispatch(setHighlightedIds([]));
    const binding = _.pick(e, [
      "altKey",
      "ctrlKey",
      "metaKey",
      "shiftKey",
      "key",
      "code",
    ]);
    dispatch(onRecordKeybinding(binding));
    if (_onRecordKeybinding) _onRecordKeybinding(binding);
  };

  const handleRecordingStatus = () => {
    const updatedStatus = status === "RECORDING" ? null : "RECORDING";
    setStatus(updatedStatus);
    statusRef.current = updatedStatus;
    dispatch(setHighlightedIds([]));
  };

  return (
    <ButtonWrapper onClick={handleRecordingStatus} className={className}>
      {status === "RECORDING" ? "Stop Recording.." : "Record keys"}
    </ButtonWrapper>
  );
};

export default RecordKeys;
