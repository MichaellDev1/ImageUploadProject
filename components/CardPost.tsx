import Image from "next/image";
import { Post } from "../types/types.d";
import { FormEvent, Key, use, useEffect, useState } from "react";
import { comment } from "postcss";
import { AiFillLike, AiOutlineLike, AiOutlineDelete } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { TbShare3 } from "react-icons/tb";

import { useAuthConsumer } from "@/context/AuthContext";

interface handleProps {
  _id: string | Key;
}

interface CommentInterface {
  comment?: string;
  id_user?: string;
  username?: string;
}

export default function CardPost({
  image,
  likes,
  title,
  _id,
  description,
  comment,
  createdAt,
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
      setIsLike(likes.includes(user._id));
      setOwner(user.rol.includes("owner"));
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
      <div className="w-[400px] p-5 relative">
        <div className="flex justify-between  w-full min-h-[40px] items-center relative">
          {isOwner && (
            <button
              className="absolute right-1 text-2xl top-3"
              onClick={handleDelete}
            >
              <AiOutlineDelete />
            </button>
          )}
          <h5 className="text-base font-semibold text-neutro-900">{title}</h5>
        </div>
        <div className="w-[100%] h-[300px] relative overflow-hidden">
          <Image
            alt={`image post id ${_id}`}
            src={`http://localhost:4000/post/image/${image}`}
            width={300}
            className="w-full h-[100%] object-cover"
            height={200}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-3 w-full justify-start mt-2 mb-[2px]">
            <div>
              <button
                onClick={() => handleLike({ _id })}
                className="flex flex-col text-[27px] text-neutro-900"
              >
                <span>
                  {isLike ? (
                    <span className="text-sky-600">
                      <AiFillLike />
                    </span>
                  ) : (
                    <AiOutlineLike />
                  )}
                </span>
              </button>
            </div>
            <button className=" text-[27px] text-neutro-900">
              <span>
                <FaRegComment />
              </span>
            </button>
            <button className=" text-[27px] text-neutro-900">
              <TbShare3 />
            </button>
          </div>
          <div>
            <span className="text-base text-neutro-900 font-semibold">
              {likeLength > 0
                ? likeLength == 1 && isLike
                  ? "Te a gustado este post"
                  : `A ${likeLength} ${
                      likeLength > 1 ? "personas" : "persona"
                    } le gusto este post`
                : ""}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-500">
              {description}
            </p>
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
