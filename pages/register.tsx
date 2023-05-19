import { useRouter } from 'next/router';
import React, { useState } from 'react'

export default function Register() {
    const [dataForm, setDataForm] = useState<object>({
        username: "",
        password: "",
      });
      const router = useRouter()
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch("http://localhost:4000/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataForm),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.message){
              return router.push('/login')
            }
          });
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
          <button>Register</button>
        </form>
      );
}
