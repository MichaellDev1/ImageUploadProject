import { useRouter } from "next/router";
import React, { useState } from "react";

export default function Register() {
  const [dataForm, setDataForm] = useState({
    username: "",
    password: "",
  });

  const [image, setImage] = useState<string | Blob>("");
  const router = useRouter();

  const formData = new FormData();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    formData.append("file", image);
    formData.append("username", dataForm.username);
    formData.append("password", dataForm.password);

    fetch("http://localhost:4000/auth/register", {
      method: "POST",
      body: formData
    })
      .then((res) => res.json())
      .then((res) => {
      });
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files || e.target.files.length === 0) {
      //TODO: Manejar errores
      console.error("Select a file");
      return;
    }
    setImage(e.target.files[0]);
  };


  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        name="username"
        onChange={handleChangeInput}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleChangeInput}
      />
      <input type="file" name="file" id="file" onChange={handleUploadImage} />
      <button>Register</button>
    </form>
  );
}
