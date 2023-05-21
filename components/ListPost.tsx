import { Post } from "@/types/types.d";
import CardPost from "./CardPost";
import { useAuthConsumer } from "@/context/AuthContext";

interface Props {
  posts: Array<Post>;
}

export default function ListPost({ posts }: Props) {
  return (
    <ul className="flex flex-wrap w-full justify-center gap-10">
      {posts.map(
        ({
          image,
          likes,
          title,
          _id,
          description,
          createdAt,
          comment,
          id_user,
          pathImageUser,
          username,
          isVerified,
        }: Post) => (
          <CardPost
            _id={_id}
            description={description}
            createdAt={createdAt}
            id_user={id_user}
            pathImageUser={pathImageUser}
            username={username}
            title={title}
            likes={likes}
            isVerified={isVerified}
            comment={comment}
            image={image}
            key={_id}
          />
        )
      )}
    </ul>
  );
}
