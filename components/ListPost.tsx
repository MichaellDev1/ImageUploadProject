import { Post } from "@/types/types.d";
import CardPost from "./CardPost";

interface Props {
  posts: Array<Post>;
}

export default function ListPost({ posts }: Props) {
  return (
    <ul className="flex flex-wrap gap-5">
      {posts.map(
        ({ image, likes, title, _id, description, createdAt, comment}: Post) => (
          <CardPost
            _id={_id}
            description={description}
            createdAt={createdAt}
            title={title}
            likes={likes}
            comment={comment}
            image={image}
            key={_id}
          />
        )
      )}
    </ul>
  );
}
