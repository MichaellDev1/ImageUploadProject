import React from "react";
import Image from "next/image";
import { Post } from "../types/types.d";
import { Key, useEffect, useState } from "react";
import { useAuthConsumer } from "@/context/AuthContext";
import { IconChat, IconHeartLike, IconHeartNotLike, IconShare } from "./Icons";
import Link from "next/link";
import VerifyCheck from "./VerifyCheck";
import { useRouter } from "next/router";

interface handleProps {
  _id: string | Key;
}

function CardPost({
  image,
  likes,
  title,
  _id,
  description,
  pathImageUser,
  username,
  isVerified,
}: Post) {
  const [likeLength, setLikeLengh] = useState<number>(likes.length);
  const { user } = useAuthConsumer();
  const [isLike, setIsLike] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setIsLike(user ? likes.includes(user._id) : false);
    }
  }, [user, likes]);

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

  const handleRedirectComment = () => {
    return router.push(`/post/${_id}`);
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
      <div className="w-[350px] relative card-post">
        <div className="w-full flex items-center gap-1 min-h-[20px] justify-between mb-2">
          <Link href={`/user/${username}`} className="flex gap-1 items-center">
            <div className="w-[32px] h-[32px] rounded-full overflow-hidden">
              <Image
                src={`http://localhost:4000/auth/image/${pathImageUser}`}
                alt="image user"
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-semibold flex items-center gap-1 text-[13px]">
              @{username}
              {isVerified && <VerifyCheck />}
            </span>
          </Link>
        </div>

        <Link
          href={`/post/${_id}`}
          className="w-[100%] h-[300px] relative overflow-hidden cursor-pointer block rounded-md content-image"
        >
          <Image
            alt={`image post id ${_id}`}
            src={`http://localhost:4000/post/image/${image}`}
            width={700}
            className="w-full h-[100%] object-cover"
            height={700}
          />
          <div className="flex flex-col z-10 bottom-2 left-2 max-w-[80%] items-start absolute">
            <div>
              <h5 className="text-sm font-semibold text-white bg-[#00000059] rounded-xl px-2  text-neutro-900">
                {title}
              </h5>
            </div>
          </div>
        </Link>

        <div className="flex flex-col">
          <div className="flex items-center gap-3 w-full justify-start mt-4 mb-2">
            <button
              className=" text-[25px] cursor-pointer text-neutro-900"
              title="Comentarios"
              onClick={handleRedirectComment}
            >
              <span>
                <IconChat />
              </span>
            </button>
            <div>
              <button
                onClick={() => handleLike({ _id })}
                title="Me gusta"
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
            <button
              className=" text-[25px] cursor-pointer text-neutro-900"
              title="Compartir"
            >
              <IconShare />
            </button>
          </div>
          <div className="min-h-[10px]">
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
          <div style={{ lineHeight: 0 }}>
            <p className="text-[13px] font-semibold text-[#e6e6e6] mt-[12px]">
              {description}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default React.memo(CardPost);
