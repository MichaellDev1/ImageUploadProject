import LayoutPages from "@/components/LayoutPages";
import { useAuthConsumer } from "@/context/AuthContext";
import React, { useState } from "react";

interface StatePost {
  title: string;
  description: string;
}

export default function Upload() {
  const [image, setImage] = useState<string | Blob>("");
  const [titleDescription, setTitleDescription] = useState<StatePost>({
    title: "",
    description: "",
  });
  const { user } = useAuthConsumer();

  const formData = new FormData();

  const handleCreatePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (image == "" || !user) return;

    formData.append("file", image);
    formData.append("title", titleDescription.title);
    formData.append("description", titleDescription.description);
    formData.append("pathImageUser", user.image);

    fetch("http://localhost:4000/post/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body: formData,
    })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files || e.target.files.length === 0) {
      //TODO: Manejar errores
      console.error("Select a file");
      return;
    }
    setImage(e.target.files[0]);
  };

  const handleChangeInputs = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
    setTitleDescription({
      ...titleDescription,
      [name]: value,
    });
  };

  return (
    <LayoutPages title="Home">
      <main className="w-full min-h-[100vh] flex justify-center items-center">
        <form onSubmit={handleCreatePost}>
          <input
            type="file"
            name="file"
            id="file"
            onChange={handleUploadImage}
          />
          <input
            type="text"
            placeholder="title"
            name="title"
            onChange={handleChangeInputs}
          />
          <input
            type="text"
            placeholder="description"
            name="description"
            onChange={handleChangeInputs}
          />
          <button>Send</button>
        </form>
      </main>
    </LayoutPages>
  );
}
