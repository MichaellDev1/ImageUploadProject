import { useAuthConsumer } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Comment } from "@/types/types.d";
import LayoutPages from "@/components/LayoutPages";
import VerifyCheck from "@/components/VerifyCheck";

interface Creator {
  image: string;
  username: string;
  verified: boolean;
  _id: string;
}

interface Props {
  post: any;
  comments: Array<object>;
  user: Creator;
}

export default function PostSelected({ post }: Props) {
  const [comment, setComment] = useState<Array<Comment>>(post.comments);
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
          id_publication: post.post._id,
          comment: newComment,
        }),
      }).then((res) => {
        if (res.status == 200) {
          setComment([
            {
              comment: newComment,
              username: user.username,
              isVerified: user.verified,
              id_user: user.id,
              image: user.image,
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
      <LayoutPages title={`Post | ${post.post._id}`}>
        <div className="w-full min-h-[75vh] flex justify-center items-center">
          <div className="flex min-h-[500px] max-h-[600px] relative rounded-3xl overflow-hidden">
            <div className="max-w-[540px]">
              <Image
                src={`http://localhost:4000/post/image/${post.post.image}`}
                alt={`Post image user ${post.post.username}`}
                width={1000}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-[400px] flex flex-col justify-between  pt-5 px-5">
              <div>
                <div className="flex items-center gap-1 pb-4">
                  <div className="h-[45px] w-[45px] overflow-hidden rounded-full">
                    <Image
                      src={`http://localhost:4000/auth/image/${post.user.image}`}
                      alt={`Post image user ${post.post.username}`}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Link
                    href={`http://localhost:4000/user/${post.user.username}`}
                    className="flex items-center font-semibold text-[16px] gap-2"
                  >
                    @{post.user.username}
                    <span>{post.user.verified && <VerifyCheck />}</span>
                  </Link>
                </div>
                <h4 className="text-lg font-semibold">Comentarios:</h4>
                <div className="py-5 flex-1 min-h-[100%] w-full overflow-y-scroll flex flex-col  gap-7 content-comments max-h-[245px]">
                  {comment.map((comment, inx) => (
                    <li key={inx} className="list-none flex gap-2 items-center">
                      <div className="h-[35px] w-[35px] overflow-hidden rounded-full">
                        <Image
                          src={`http://localhost:4000/auth/image/${comment.image}`}
                          alt={`Post image user ${comment.username}`}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <Link
                          href={`http://localhost:4000/user/${comment.username}`}
                          className="flex text-md font-semibold items-center gap-2"
                        >
                          {comment.username}
                          <span>{comment.isVerified && <VerifyCheck />}</span>
                        </Link>
                        <p className="text-md font-semibold text-[14px] text-[#979797]">
                          {comment.comment}
                        </p>
                      </div>
                    </li>
                  ))}
                </div>
              </div>
              <form
                onSubmit={handleComment}
                className="w-full flex gap-2 items-center"
              >
                <div className="h-[48px] w-[48px] overflow-hidden rounded-full">
                  {user && (
                    <Image
                      src={`http://localhost:4000/auth/image/${user.image}`}
                      alt={`Post image user ${user.username}`}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Deja un comentario..."
                  onChange={handleChangeComment}
                  className="flex-1 text-gray-700 font-semibold px-5 py-[12px] rounded-3xl bg-[rgb(219, 219, 219)]"
                  value={newComment}
                />
                <button className="bg-slate-500  px-4 text-white font-medium hidden">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </LayoutPages>
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
