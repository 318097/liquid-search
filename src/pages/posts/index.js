import { useEffect, Fragment } from "react";
import Card from "../../components/Card";
import config from "../../config";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../../store/posts/actions";
import _ from "lodash";
import { ButtonWrapper, LoaderWrapper } from "../../lib/UI";
import { useRouter } from "next/router";
import tracker from "../../lib/mixpanel";
import { getPosts } from "../../lib/db";
import { wrapper } from "../../store";
import { setPosts } from "../../store/posts";
import colors from "../../lib/magicdust";
import { FeedTitle } from "../../components";
import { getFeedConfig } from "../../lib/utils";

const PageWrapper = styled.div`
  .page-splitter {
    display: block;
    width: 80%;
    margin: 40px 0;
    position: relative;
    span {
      padding: 2px 4px;
      left: 20px;
      display: inline-block;
      position: relative;
      background: ${colors.PRIME};
      color: white;
      font-size: 0.6rem;
      z-index: 2;
    }
    &:after {
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      position: absolute;
      top: 50%;
      background: ${colors.PRIME};
    }
  }
`;

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const total = useSelector((state) => state.posts.total);
  const filters = useSelector((state) => state.posts.filters);
  const totalText = useSelector((state) => state.posts.totalText);
  const appLoading = useSelector((state) => state.app.appLoading);
  const router = useRouter();
  const { page = 1 } = filters;

  useEffect(() => {
    refetch();
  }, [router.query]);

  const refetch = async () => {
    const { query } = router;
    await dispatch(setFilter(query));
  };

  const handleLoad = () => {
    dispatch(setFilter({ page: page + 1 }, false));
    tracker.track("LOAD_MORE_POSTS", { postType: "CodeDrops" });
  };

  const postChunks = _.chunk(posts, config.POST_COUNT);
  const showLoadButton = posts.length < total;
  const isEmpty = appLoading && filters.page === 1;
  return (
    <section id="posts">
      {appLoading ? (
        <LoaderWrapper fullScreen />
      ) : isEmpty ? null : (
        <Fragment>
          <FeedTitle
            {...getFeedConfig("posts")}
            subText={`Showing ${totalText} posts.`}
          />
          {postChunks.map((chunk, index) => (
            <PageWrapper key={index}>
              <div className="posts-wrapper">
                {chunk.map((post) => (
                  <Card key={post._id} data={post} type={"POST"} />
                ))}
              </div>
              {index < postChunks.length - 1 && (
                <div className="page-splitter">
                  <span>{`Page: ${index + 2}`}</span>
                </div>
              )}
            </PageWrapper>
          ))}

          {showLoadButton && (
            <div className="actions-row">
              <ButtonWrapper onClick={handleLoad} variant="transparent">
                Show more
              </ButtonWrapper>
            </div>
          )}
        </Fragment>
      )}
    </section>
  );
};

export default Posts;

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const filters = store.getState().posts?.filters;
  const response = await getPosts(filters);
  store.dispatch(setPosts(response));
});
