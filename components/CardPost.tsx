import React from "react";
import Image from "next/image";
import { Post } from "../types/types.d";
import { FormEvent, Key, use, useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

import { useAuthConsumer } from "@/context/AuthContext";
import { IconChat, IconHeartLike, IconHeartNotLike, IconShare } from "./Icons";
import Link from "next/link";

interface handleProps {
  _id: string | Key;
}

interface CommentInterface {
  comment?: string;
  id_user?: string;
  username?: string;
}

function CardPost({
  image,
  likes,
  title,
  _id,
  description,
  comment,
  username,
  id_user,
  pathImageUser,
}: Post) {
  const [likeLength, setLikeLengh] = useState<number>(likes.length);
  const [newComent, setNewComment] = useState<Array<object>>(comment);
  const [commentUser, setCommentUser] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(false);
  const [isOwner, setOwner] = useState(false);
  const { user } = useAuthConsumer();
  const [isLike, setIsLike] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setIsLike(user ? likes.includes(user._id) : false);
      setOwner(user && user.rol.includes("owner"));
    }
  }, [user]);

  const handleLike = ({ _id }: handleProps): void | Error => {
    if (user) {
      fetch("http://localhost:4000/post/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          id_publication: _id,
        }),
      }).then((e) => {
        if (e.status == 404) {
          return console.log("NO_AUTHORIZATION");
        }
      });

      if (isLike) {
        setIsLike(false);
        setLikeLengh(likeLength - 1);
      } else {
        setIsLike(true);
        setLikeLengh(likeLength + 1);
      }
    }
  };

  const handleChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCommentUser(value);
  };

  const handleComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      setLoading(true);
      fetch("http://localhost:4000/post/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          id_publication: _id,
          comment: commentUser,
        }),
      }).then((res) => {
        if (res.status == 200) {
          setLoading(false);
          setNewComment([
            {
              comment: commentUser,
              username: "MichaelSantucho",
              id_user: user._id,
            },
            ...newComent,
          ]);
          setCommentUser("");
        }
      });
    }
  };

  const handleDelete = () => {
    fetch(`http://localhost:4000/post/delete/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }).then((res) => console.log(res));
  };

  return (
    <li key={_id}>
      <style jsx>{`
        .btn-delete {
          opacity: 0;
        }
        .btn-delete:hover {
          opacity: 0;
          background: #00000077;
        }
        .card-post:hover .btn-delete {
          opacity: 1;
        }
      `}</style>
      <div className="w-[300px] relative card-post">
        <div className="w-full flex items-center gap-1 min-h-[20px] justify-between mb-2">
          <Link
            href={`/user/${username}`}
            className="flex gap-1 items-center"
          >
            <div className="w-[32px] h-[32px] rounded-full overflow-hidden">
              <Image
                src=''
                alt="image user"
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-semibold text-[13px]">@{username}</span>
          </Link>
        </div>

        <div className="w-[100%] h-[300px] relative overflow-hidden cursor-pointer rounded-md">
          <Image
            alt={`image post id ${_id}`}
            src={`http://localhost:4000/post/image/${image}`}
            width={500}
            className="w-full h-[100%] object-cover"
            height={500}
          />
          <div className="flex flex-col z-10 bottom-2 left-2 max-w-[80%] absolute">
            <h5 className="text-sm font-semibold text-neutral-100 text-neutro-900">
              {title}
            </h5>
            <p className="text-[13px] font-normal text-[#bdbdbd]">
              {description}
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-3 w-full justify-start mt-4 mb-2">
            <button className=" text-[25px] cursor-pointer text-neutro-900">
              <span>
                <IconChat />
              </span>
            </button>
            <div>
              <button
                onClick={() => handleLike({ _id })}
                className="flex flex-col text-[25px] text-neutro-900 cursor-pointer"
              >
                <span>
                  {isLike ? (
                    <span className="text-sky-600">
                      <IconHeartLike />
                    </span>
                  ) : (
                    <IconHeartNotLike />
                  )}
                </span>
              </button>
            </div>
            <button className=" text-[25px] cursor-pointer text-neutro-900">
              <IconShare />
            </button>
          </div>
          <div className="min-h-[20px]">
            <span className="text-base text-white font-semibold">
              {likeLength > 0
                ? likeLength == 1 && isLike
                  ? "Te a gustado este post"
                  : `A ${likeLength} ${
                      likeLength > 1 ? "personas le han" : "persona le a"
                    } gusto este post`
                : ""}
            </span>
          </div>
        </div>
        <div>
          {/* <ul className="flex flex-col gap-5 ">
            {newComent.length > 0 ? (
              newComent.map(
                ({ comment, id_user, username }: CommentInterface) => (
                  <li key={`this comment is ${id_user} ${comment}`}>
                    <div className="border-t">
                      <span className="font-semibold">{username}</span>
                      <p className="font-medium text-neutral-500">{comment}</p>
                    </div>
                  </li>
                )
              )
            ) : (
              <h3>Aun no hay comentarios...</h3>
            )}
          </ul> */}
          {/* <form onSubmit={handleComment} className="w-full flex items-center">
            <input
              type="text"
              placeholder="Deja un comentario..."
              onChange={handleChangeComment}
              className="flex-1"
              value={commentUser}
            />
            <button className="bg-slate-500  px-4 rounded-lg text-white font-medium">
              {loading ? "Enviando" : "Send"}
            </button>
          </form> */}
        </div>
      </div>
    </li>
  );
}

export default React.memo(CardPost);
