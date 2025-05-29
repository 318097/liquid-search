import { SelectWrapper, InputWrapper } from "../lib/UI";
import RecordKeys from "../components/RecordKeys";
// import { Breadcrumbs } from "@mantine/core";
import config from "../config";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import * as keybindingActions from "../store/keybindings";
import * as postActions from "../store/posts/actions";
import * as liquidActions from "../store/liquid";
// import { resetFilters } from "../store/posts";
import { Fragment, useEffect, useState, useRef } from "react";
import logo from "../../public/logo.svg";
import Image from "next/image";

const getRouteMatch = (currentRoute) => {
  const obj = {
    keybindings: currentRoute === "/keybindings",
    posts: currentRoute === "/posts",
    liquid: config.liquidRoutes.map((r) => `/${r}`).includes(currentRoute),
  };

  return { ...obj, isSubRoute: obj.keybindings || obj.posts || obj.liquid };
};

const Header = () => {
  // const breadcrumbs = useSelector((state) => state.app.breadcrumbs);
  const activeMsgIdx = useRef(0);
  const msgList = [
    "Formerly codedrops.tech",
    `All-in-1 place for developers.`,
    // "New posts added every week.",
  ];
  const ref = useRef();
  const [msg, setMsg] = useState(msgList[0]);
  const currentRoute = useSelector((state) => state.app.route);
  const currentL0 = useSelector((state) => state.liquid.currentL0);
  const routes = getRouteMatch(currentRoute);

  const tags = useSelector((state) => {
    if (routes.liquid) {
      const tagOptions = state.liquid.tagOptions;
      return tagOptions[currentL0];
    } else if (routes.keybindings) return state.keybindings.tags;
    return state.posts.tags;
  });
  const filters = useSelector((state) => {
    if (routes.liquid) return state.liquid.filters;
    else if (routes.keybindings) return state.keybindings.filters;
    return state.posts.filters;
  });
  const dispatch = useDispatch();

  // const items = breadcrumbs.map((item, index) => (
  //   <span onClick={() => dispatch(resetFilters())} key={index}>
  //     <Link href={item.href} passHref>
  //       {item.title}
  //     </Link>
  //   </span>
  // ));

  useEffect(() => {
    ref.current = setTimeout(() => {
      // const nextIdx = (activeMsgIdx.current + 1) % msgList.length;
      // activeMsgIdx.current = nextIdx;
      // setMsg(msgList[nextIdx]);
      setMsg(msgList[1]);
    }, 5000);
    return () => {
      clearInterval(ref);
    };
  }, []);

  const onChangeTags = (tags) => {
    if (routes.liquid) dispatch(liquidActions.updateFilters({ tags }));
    else if (routes.keybindings)
      dispatch(keybindingActions.updateFilters({ tags }));
    else dispatch(postActions.setFilter({ tags }));
  };

  const filterList = [
    {
      visible: routes.isSubRoute,
      component: (
        <SelectWrapper
          placeholder="Tag"
          options={tags}
          clearable
          className="multi-select"
          value={filters.tags}
          onChange={onChangeTags}
          // isMulti
          hidePickedOptions={false}
          checkIconPosition="right"
        />
      ),
    },
    {
      visible: routes.keybindings,
      component: <RecordKeys />,
    },
    {
      visible: routes.posts,
      component: (
        <InputWrapper
          placeholder="Search"
          value={filters.search}
          onChange={(e, search) => dispatch(postActions.setFilter({ search }))}
        />
      ),
    },
  ].filter((filter) => filter.visible);

  return (
    <header>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Link href={"/"} passHref>
          <Image
            src={logo}
            alt="Code404 logo"
            height={22}
            width={80}
            style={{
              position: "relative",
              left: "-4px",
            }}
          />
        </Link>
        <span className="small">{msg}</span>
        {/* <Breadcrumbs separator="→" mt="xs">
          {items}
        </Breadcrumbs> */}
      </div>
      <div className="filters">
        {filterList.map((filter, idx) => (
          <Fragment key={idx}>{filter.component}</Fragment>
        ))}
      </div>
    </header>
  );
};

export default Header;
