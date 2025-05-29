/* Mantine wrapper */

import {
  ActionIcon,
  Card,
  Button,
  Overlay,
  Input,
  PasswordInput,
  Checkbox,
  Alert,
  SegmentedControl,
  Textarea,
  Badge,
  Modal,
  Loader,
  LoadingOverlay,
  Tooltip,
  Select,
  MultiSelect,
} from "@mantine/core";

import {
  FiX,
  FiStar,
  FiPlus,
  FiCode,
  FiChevronsLeft,
  FiChevronsRight,
  FiTrash2,
  FiHelpCircle,
  FiHexagon,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiInstagram,
  FiGithub,
} from "react-icons/fi";
import {
  TbAppWindow,
  TbBrandNpm,
  TbHelpSquareRoundedFilled,
  TbWorldWww,
} from "react-icons/tb";
import {
  MdCloud,
  MdExtension,
  MdOutlineArticle,
  MdCode,
  MdOndemandVideo,
  MdGroups,
} from "react-icons/md";
import { RxComponent1 } from "react-icons/rx";
import {
  FaRocket,
  FaRupeeSign,
  FaTools,
  FaHome,
  FaRegCheckCircle,
  FaCheck,
} from "react-icons/fa";
import { CgWebsite, CgStack } from "react-icons/cg";
import { ImBook } from "react-icons/im";
import { PiExam } from "react-icons/pi";
import { LuBrainCircuit } from "react-icons/lu";
import { BsCollection, BsStars } from "react-icons/bs";
import { BiSpreadsheet } from "react-icons/bi";
import { IoLogoJavascript } from "react-icons/io";

const mantineDefaultProps = {
  size: "xs",
  radius: "xs",
};

const getIcon = (type) => {
  switch (type) {
    case "close":
      return <FiX />;
    case "code":
      return <FiCode />;
    case "star":
      return <FiStar />;
    case "plus":
      return <FiPlus />;
    case "delete":
      return <FiTrash2 />;
    // return <FiXCircle />;
    case "caret-left":
      return <FiChevronsLeft />;
    case "caret-right":
      return <FiChevronsRight />;
    case "help":
      return <FiHelpCircle />;
    case "about":
      return <FiHexagon />;
    case "facebook":
      return <FiFacebook />;
    case "twitter":
      return <FiTwitter />;
    case "linkedin":
      return <FiLinkedin />;
    case "instagram":
      return <FiInstagram />;
    case "app-sass":
      return <TbAppWindow />;
    case "extension":
      return <MdExtension />;
    case "article":
      return <MdOutlineArticle />;
    case "cloud":
      return <MdCloud />;
    case "design-system":
      return <RxComponent1 />;
    case "npm":
      return <TbBrandNpm />;
    case "repo":
    case "open-source":
      return <FiGithub />;
    case "blog":
      return <CgWebsite />;
    case "book":
      return <ImBook />;
    case "coding-platform":
      return <MdCode />;
    case "learning-platform":
      return <LuBrainCircuit />;
    case "course":
      return <MdOndemandVideo />;
    case "docs":
      return <TbHelpSquareRoundedFilled />;
    case "interview-preparation":
      return <PiExam />;
    case "job-board":
      return <FaRupeeSign />;
    case "side-project":
      return <BsStars />;
    case "startup":
      return <FaRocket />;
    case "util":
      return <FaTools />;
    case "website":
      return <TbWorldWww />;
    case "cheetsheet":
      return <BiSpreadsheet />;
    case "landing-page":
      return <FaHome />;
    case "resources":
      return <CgStack />;
    case "lib":
      return <IoLogoJavascript />;
    case "collection":
      return <BsCollection />;
    case "community":
      return <MdGroups />;
    case "check":
      return <FaCheck />;
    // return <FaRegCheckCircle />;
  }
};

const IconWrapper = (props) => {
  const { type, tooltip } = props;
  const icon = getIcon(type);
  const iconComp = <ActionIcon {...props}>{icon}</ActionIcon>;

  return tooltip ? (
    <Tooltip
      label={tooltip}
      color="gray"
      radius="xs"
      position="bottom"
      withArrow
    >
      {iconComp}
    </Tooltip>
  ) : (
    iconComp
  );
};

const ButtonWrapper = ({ children, ...props }) => {
  return (
    <Button {...mantineDefaultProps} {...props}>
      {children}
    </Button>
  );
};

const InputWrapper = (props) => {
  const { type, onChange, required, error, label, ...rest } = props;

  const handleOnChange = (e) => onChange(e, e.currentTarget.value);

  const field =
    type === "password" ? (
      <PasswordInput
        {...mantineDefaultProps}
        {...rest}
        variant="filled"
        onChange={handleOnChange}
      />
    ) : type === "textarea" ? (
      <Textarea
        minRows={props.rows || props.minRows}
        variant="filled"
        {...mantineDefaultProps}
        {...rest}
        onChange={handleOnChange}
      />
    ) : (
      <Input
        {...mantineDefaultProps}
        {...rest}
        variant="filled"
        onChange={handleOnChange}
      />
    );

  return label ? (
    <Input.Wrapper
      {...mantineDefaultProps}
      required={required}
      label={label}
      error={error}
    >
      {field}
    </Input.Wrapper>
  ) : (
    field
  );
};

const CheckboxWrapper = (props) => {
  return <Checkbox {...mantineDefaultProps} {...props} />;
};

const AlertWrapper = (props) => {
  const { children, message } = props;
  return <Alert {...props}>{message || children}</Alert>;
};

const CardWrapper = (props) => {
  const defaultProps = {
    withBorder: true,
  };

  const updatedProps = {
    ...mantineDefaultProps,
    ...defaultProps,
    ...props,
  };

  return <Card withBorder {...updatedProps} />;
};

const OverlayWrapper = (props) => {
  return <Overlay {...props} />;
};

const LoaderWrapper = (props) => {
  const { fullScreen = false, ...rest } = props;
  const loaderProps = {
    color: "white",
    size: "md",
    variant: "dots",
    ...rest,
  };
  return fullScreen ? (
    <LoadingOverlay
      visible
      loaderProps={loaderProps}
      // loaderProps={{ size: "sm", color: "pink", variant: "bars" }}
      // overlayOpacity={0.3}
      // overlayColor="#c5c5c5"
    />
  ) : (
    <Loader {...loaderProps} />
  );
};

const RadioWrapper = ({ onChange, ...props }) => {
  const { options } = props;
  const handleOnChange = (value) => onChange(value, value);
  return (
    <SegmentedControl
      fullWidth
      color="violet"
      size={"xs"}
      data={options}
      onChange={handleOnChange}
      {...props}
    />
  );
};

const TagWrapper = (props) => {
  const { children } = props;

  const defaultProps = {
    color: "teal",
    variant: "filled",
  };

  const updatedProps = {
    ...mantineDefaultProps,
    ...defaultProps,
    ...props,
  };

  return <Badge {...updatedProps}>{children}</Badge>;
};

const ModalWrapper = (props) => {
  const { title, children, visible, setVisibility } = props;

  return (
    <Modal
      centered
      padding="md"
      radius="xs"
      size="lg"
      overflow={"inside"}
      opened={visible}
      onClose={() => setVisibility(false)}
      title={title}
    >
      {children}
    </Modal>
  );
};

const SelectWrapper = ({ options = [], label, isMulti, ...rest }) => {
  return isMulti ? (
    <MultiSelect
      {...mantineDefaultProps}
      label={label}
      data={options}
      {...rest}
    />
  ) : (
    <Select {...mantineDefaultProps} label={label} data={options} {...rest} />
  );
};

export {
  IconWrapper,
  ButtonWrapper,
  InputWrapper,
  CheckboxWrapper,
  AlertWrapper,
  CardWrapper,
  OverlayWrapper,
  RadioWrapper,
  TagWrapper,
  ModalWrapper,
  getIcon,
  LoaderWrapper,
  SelectWrapper,
};
