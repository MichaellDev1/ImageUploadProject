import LayoutPages from "@/components/LayoutPages";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PorfileUser } from "@/types/types.d";
import { useAuthConsumer } from "@/context/AuthContext";

export default function Username({ porfileUser }: PorfileUser) {
  const { user } = useAuthConsumer();
  const [loading, setLoading] = useState<boolean>(false);
  const [isInARow, setInARow] = useState<boolean>();
  const [followers, setFollowers] = useState<number>(
    porfileUser.porfile.followers
  );

  useEffect(() => {
    setInARow(user ? user.inARow.includes(porfileUser.porfile._id) : false);
  }, [user, porfileUser.porfile._id]);

  const handleFollower = (): void => {
    if (!loading) {
      setLoading(true);
      fetch(`http://localhost:4000/user/follow/${porfileUser.porfile._id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }).then((e) => {
        if (followers) {
          setFollowers(followers - 1);
          setInARow(false);
        } else {
          setFollowers(followers + 1);
          setInARow(true);
        }
        setLoading(false);
      });
    }
  };

  return (
    <LayoutPages title={`Porfile | ${porfileUser.porfile.username}`}>
      <div className="w-full min-h-[100vh] px-32">
        {porfileUser && (
          <div className="flex flex-col items-center">
            <div className="relative w-[300px] rounded-full overflow-hidden h-[300px]">
              <Image
                src={`http://localhost:4000/auth/image/${porfileUser.porfile.image}`}
                alt="user porfile image"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="text-xl font-semibold">
              @{porfileUser.porfile.username}
            </h4>

            <div className="flex gap-5">
              <div>
                <span>Seguidores: {followers}</span>
              </div>
              <div>
                <span>Seguidos: {porfileUser.porfile.inARow}</span>
              </div>
            </div>

            {user ? (
              user._id == porfileUser.porfile._id ? (
                <h3>Este es tu perfil</h3>
              ) : (
                <button
                  onClick={handleFollower}
                  className="text-base font-semibold bg-blue-500 px-5 rounded-xl py-1 mt-3"
                >
                  {isInARow ? "Dejar de seguir" : "Seguir"}
                </button>
              )
            ) : (
              <h3>Logeate!!!</h3>
            )}

            <div className="flex flex-wrap gap-2 w-full mt-5">
              {porfileUser.posts.map((post) => (
                <Link
                  href={`http://localhost:3000/post/${post._id}`}
                  className="w-[220px] h-[220px] overflow-hidden"
                  key={post._id}
                >
                  <Image
                    src={`http://localhost:4000/post/image/${post.image}`}
                    alt={`Image user ${post.title}`}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </LayoutPages>
  );
}

export const getServerSideProps = async (context: any) => {
  const { query } = context;
  const fetching = await fetch(`http://localhost:4000/user/${query.username}`);
  const porfileUser = await fetching.json();
  return {
    props: {
      porfileUser,
    },
  };
};
