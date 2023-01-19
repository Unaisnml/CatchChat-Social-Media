import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { feedPosts, GetUserPostData } from "../../Api/PostRequest";
import { setPosts } from "../../State/state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  // console.log(posts,'postsoe');
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    // console.log('hello');
    const response = await feedPosts({
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data) {
      // console.log(response.data, "Its ok");
      const data = await response.data;
      dispatch(setPosts(data));
      // console.log(posts, "postukal kittunnu");
    }
  };

  const getUserPosts = async () => {
    const response = await GetUserPostData(userId, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(response.data, "UserPostData");

    if (response.data) {
      const data = response.data;
      console.log(data, "data");
      //console.log(response.data, "UserPostData");
      dispatch(setPosts(data));
    }
  };

  useEffect(() => {
    console.log(isProfile, "profilellll");
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      {Array.isArray(posts)
        ? posts.map(
            ({
              _id,
              userId,
              firstName,
              lastName,
              description,
              location,
              picturePath,
              userPicturePath,
              likes,
              comments,
            }) => (
              <PostWidget
                key={_id}
                postId={_id}
                postUserId={userId}
                name={`${firstName} ${lastName}`}
                description={description}
                location={location}
                picturePath={picturePath}
                userPicturePath={userPicturePath}
                likes={likes}
                comments={comments}
              />
            )
          )
        : null}
    </>
  );
};

export default PostsWidget;
