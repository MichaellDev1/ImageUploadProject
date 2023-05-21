import { useAuthConsumer } from "@/context/AuthContext";
import { Post } from "@/types/types.d";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Comment } from "@/types/types.d";

interface Props {
  post: Post;
}

export default function PostSelected({ post }: Props) {
  const [comment, setComment] = useState<Array<Comment>>([]);
  const [newComment, setNewComment] = useState<string>();
  const { user } = useAuthConsumer();

  const handleChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewComment(value);
  };

  const handleComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      fetch("http://localhost:4000/post/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          id_publication: post?._id,
          comment: newComment,
        }),
      }).then((res) => {
        if (res.status == 200) {
          setComment([
            {
              comment: newComment,
              username: user.username,
              id_user: user.id,
            },
            ...comment,
          ]);
          setNewComment("");
        }
      });
    }
  };

  return (
    post && (
      <div>
        <div className="flex">
          <div className="w-[400px] h-[400px]">
            <Image
              src={`http://localhost:4000/post/image/${post.image}`}
              alt={`Post image user ${post.username}`}
              width={800}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4>Comentarios:</h4>
            <div>
              {comment.map((comment, inx) => (
                <li key={inx}>
                  <Link href={`http://localhost:4000/user/${comment.username}`}>
                    {comment.username}
                  </Link>
                  <p>{comment.comment}</p>
                </li>
              ))}
            </div>
            <form onSubmit={handleComment} className="w-full flex items-center">
              <input
                type="text"
                placeholder="Deja un comentario..."
                onChange={handleChangeComment}
                className="flex-1"
              />
              <button className="bg-slate-500  px-4 rounded-lg text-white font-medium">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
}

export const getServerSideProps = async (context: any) => {
  const { query } = context;
  const fetching = await fetch(`http://localhost:4000/post/${query.id}`);
  const post = await fetching.json();
  return {
    props: {
      post: post,
    },
  };
};
