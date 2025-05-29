import React, { useState, useEffect, Fragment } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { getPostById, goToNextPost } from "../../store/posts/actions";
import { md } from "../../lib";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import Card from "../../components/Card";
import { IconWrapper } from "../../lib/UI";
import Link from "next/link";
import { Tags } from "../../components";
import { getAllPostIds, getPostDataById } from "../../lib/db";
import Helmet from "../../lib/Helmet";
import { Accordion } from "@mantine/core";
import colors from "../../lib/magicdust";

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  .card {
    display: flex;
    flex-direction: column;
    width: 100%;
    .title {
      text-align: left;
      padding: 0;
      margin: 0 0 20px;
      font-size: 2rem;
      font-weight: bold;
      line-height: 2.6rem;
    }
    .content-wrapper {
      width: 100%;
      margin-bottom: 30px;
      .content {
        display: flex;
        flex-direction: column;
        gap: 20px;
        font-size: 1rem;
      }
      .chain-content-wrapper {
        display: flex;
        flex-direction: column;
        gap: 40px;
      }
      .chain-item {
        display: flex;
        flex-direction: column;
        .chain-item-header {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          .chain-item-id {
            background: ${colors.PRIME};
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 26px;
            height: 26px;
            font-size: 0.9rem;
            cursor: pointer;
            transition: 0.4s;
            margin-right: 10px;
            position: relative;
            top: 3px;
          }
          .chain-item-title {
            position: relative;
            top: 2px;
            font-weight: bold;
            color: gray;
            font-size: 1.4rem;
          }
        }
        .chain-item-content {
          text-align: left;
          padding-left: 36px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
      }
    }
    .actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .date {
        font-size: 0.8rem;
      }
    }
  }
`;

const PostView = ({ post }) => {
  const [isClient, setIsClient] = useState(false);
  const [prevPost, setPrevPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    dispatch(getPostById(post));
    setPrevPost(dispatch(goToNextPost(-1)));
    setNextPost(dispatch(goToNextPost(1)));
  }, [post]);

  if (!post) return null;

  const {
    title = "",
    content = "",
    tags = [],
    type,
    chainedPosts = [],
    publishedAt,
    solution,
  } = post || {};

  return (
    <section id="view-post">
      <Helmet title={title} />
      <CardWrapper className="card-wrapper">
        <Link href="/posts" passHref>
          <span className="icon no-padding">
            <IconWrapper variant="'transparent" type="caret-left" />
            <span>Back</span>
          </span>
        </Link>
        <div className="card">
          <h1
            className="title"
            dangerouslySetInnerHTML={{ __html: md.renderInline(title) }}
          />
          <div className="content-wrapper">
            {type === "CHAIN" ? (
              <div className="chain-content-wrapper">
                {chainedPosts.map((post, index) => (
                  <div className="chain-item" key={post._id}>
                    <div className="chain-item-header">
                      <div className="chain-item-id">{index + 1}</div>
                      <h2
                        className="chain-item-title"
                        dangerouslySetInnerHTML={{
                          __html: md.renderInline(_.get(post, "title", "")),
                        }}
                      />
                    </div>
                    <div
                      className="chain-item-content"
                      dangerouslySetInnerHTML={{
                        __html: md.render(_.get(post, "content", "")),
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: md.render(content || "") }}
              />
            )}
            {solution && (
              <Accordion
                variant="contained"
                radius="xs"
                style={{ marginTop: "12px" }}
              >
                <Accordion.Item value="solution">
                  <Accordion.Control>Solution</Accordion.Control>
                  <Accordion.Panel>{solution}</Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            )}
          </div>
          {isClient && (
            <Fragment>
              <div className="actions" style={{ alignItems: "flex-start" }}>
                <div>
                  <div className="date">
                    {publishedAt &&
                      `Published on: ${new Date(
                        publishedAt
                      ).toLocaleDateString()}`}
                  </div>
                  <SharePost />
                </div>
                <div>
                  <Tags
                    tags={tags}
                    onClick={(tag) => {
                      router.push(`/posts?tags=${tag}`);
                    }}
                    fontSize="1rem"
                  />
                  <div
                    className="fcc gap-16"
                    style={{ justifyContent: "flex-end" }}
                  >
                    {prevPost && (
                      <div
                        className="icon no-padding"
                        onClick={() => router.push(`/posts/${prevPost.slug}`)}
                      >
                        <IconWrapper variant="transparent" type="caret-left" />
                        <span>Prev</span>
                      </div>
                    )}
                    {nextPost && (
                      <div
                        className="icon no-padding"
                        onClick={() => router.push(`/posts/${nextPost.slug}`)}
                      >
                        <span>Next</span>
                        <IconWrapper variant="transparent" type="caret-right" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </CardWrapper>
      <div className="splitter">~~~</div>
      <RelatedPosts />
    </section>
  );
};

const SharePost = () => {
  const Wrapper = styled.div`
    font-size: 0.8rem;
    .icons {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    a {
      cursor: pointer;
      position: relative;
    }
  `;

  const encodedPageURL = encodeURIComponent(window.location.href);
  const icons = [
    {
      id: "Facebook",
      type: "facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedPageURL}`,
    },
    {
      id: "Linkedin",
      type: "linkedin",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedPageURL}`,
    },
    {
      id: "Twitter",
      type: "twitter",
      href: `https://twitter.com/intent/tweet?url=${encodedPageURL}`,
    },
  ];

  return (
    <Wrapper>
      <div>Liked this post? Share it!</div>
      <div className="icons">
        {icons.map(({ id, type, href }) => (
          <a key={id} target="_blank" rel="noopener noreferrer" href={href}>
            <IconWrapper type={type} tooltip={id} />
          </a>
        ))}
      </div>
    </Wrapper>
  );
};

const RelatedPosts = () => {
  const relatedPosts = useSelector((state) => state.posts.relatedPosts);
  if (_.isEmpty(relatedPosts)) return null;

  return (
    <div
      className="posts-wrapper"
      style={{ maxWidth: "800px", margin: "0 auto 20px" }}
    >
      {relatedPosts.map((post) => (
        <Card key={post._id} data={post} type="POST" />
      ))}
    </div>
  );
};

export default PostView;

export async function getStaticPaths() {
  const paths = await getAllPostIds();
  return {
    paths,
    // Set fallback to blocking. Now any new post added post build will SSR
    // to ensure SEO. It will then be static for all subsequent requests
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostDataById(params.id);

  return {
    props: {
      post,
    },
  };
}
