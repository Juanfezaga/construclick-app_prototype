import React from "react";

import PostCard from "../PostCard/PostCard";

interface postInterface {
  _id: string;
  attributes: any;
  createdAt: string;
  imagesUrl: string[];
  type: string;
  title: string;
  userId: string;
  userImage: string;
  userLastname: string;
  userName: string;
}

interface SegmentProps {
  posts: postInterface[];
}

const NewsSegment: React.FC<SegmentProps> = ({ posts }) => {

  return (
    <>
      {posts.map((post : postInterface) => (
        <PostCard key={post._id} post={post} />
      ))}
    </>
  );
};

export default NewsSegment;

