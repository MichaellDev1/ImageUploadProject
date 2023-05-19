import LayoutPages from "@/components/LayoutPages";
import ListPost from "@/components/ListPost";
import React, { useEffect, useState } from "react";
import { Post } from "@/types/types.d";

interface Props {
  posts: Array<Post>;
}

export default function Home({ posts }: Props) {
  return (
    <LayoutPages title="Home">
      <main className="w-full min-h-[100vh] flex justify-center items-center">
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
