import LayoutPages from "@/components/LayoutPages";
import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState<File>();
  const [titleDescription, setTitleDescription] = useState({
    title: "",
    description: "",
  });

  const formData = new FormData();
  const handleCreatePost = (e: any) => {
    e.preventDefault();

    formData.append("file", image);
    formData.append("title", titleDescription.title);
    formData.append("description", titleDescription.description);

    fetch("http://localhost:4000/post/create", {
      method: "POST",
      body: formData,
    })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  const handleUploadImage = (e: any) => {
    setImage(e.target.files[0]);
  };

  const handleChangeInputs = (e: any) => {
    const { value, name } = e.target;
    setTitleDescription({
      ...titleDescription,
      [name]: value,
    });
  };

  return (
    <LayoutPages title="Home">
      <main className="w-full min-h-[100vh] flex justify-center items-center">
        <form action="" onSubmit={handleCreatePost}>
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
