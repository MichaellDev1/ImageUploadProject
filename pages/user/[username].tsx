import LayoutPages from "@/components/LayoutPages";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { PorfileUser } from "@/types/types.d";

export default function Username({ porfileUser }: PorfileUser) {
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
