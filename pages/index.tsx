import LayoutPages from "@/components/LayoutPages";
import ListPost from "@/components/ListPost";
import React from "react";
import { Post } from "@/types/types.d";

interface Props {
  posts: Array<Post>;
}

export default function Home({ posts }: Props) {
  return (
    <LayoutPages title="Home">
      <main className="w-full px-10 min-h-[80vh] flex justify-center items-center">
        <ListPost posts={posts} />
      </main>
    </LayoutPages>
  );
}

export const getServerSideProps = async (context: any) => {
  const res = await fetch("http://localhost:4000/post/all");
  const { post } = await res.json();
  return {
    props: {
      posts: post,
    },
  };
};
