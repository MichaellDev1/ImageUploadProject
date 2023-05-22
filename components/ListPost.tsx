import { Post } from "@/types/types.d";
import CardPost from "./CardPost";
import { useAuthConsumer } from "@/context/AuthContext";

interface Props {
  posts: Array<Post>;
}

export default function ListPost({ posts }: Props) {
  return (
    <ul className="flex flex-wrap items-center w-full justify-center gap-14">
      {posts.map(
        ({
          image,
          likes,
          title,
          description,
          createdAt,
          updatedAt,
          _id,
          username,
          isVerified,
          pathImageUser,
        }: Post) => (
          <CardPost
            _id={_id}
            pathImageUser={pathImageUser}
            description={description}
            createdAt={createdAt}
            updatedAt={updatedAt}
            username={username}
            title={title}
            likes={likes}
            isVerified={isVerified}
            image={image}
            key={_id}
          />
        )
      )}
    </ul>
  );
}
