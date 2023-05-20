import { useAuthConsumer } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function Header() {
  const { user, setUser } = useAuthConsumer();  

  const router = useRouter();

  const handleLogOut = (): void => {
    setUser(null);
    localStorage.removeItem("sessionid");
    location.reload();
  };

  const handleLogin = () => {
    return router.push("/login");
  };

  return (
    <header className="w-full h-[70px] justify-between flex items-center px-10 mb-5">
      <nav>
        <Link
          href={"/upload"}
          className="bg-sky-600 font-semibold text-base py-2 rounded-2xl px-4"
        >
          Subir
        </Link>
        <Link href={"/"} className="text-base py-2 px-4 font-semibold">
          Home
        </Link>
      </nav>
      <div>
        <Link href={"/user/"} className="flex gap-1 items-center">
          <div className="w-[40px] relative overflow-hidden rounded-full h-[40px]">
            {/* {user && (
              <Image
                src={`http://localhost:4000/post/image/${user.image}`}
                width={200}
                height={200}
                alt="user image"
                className="w-full h-full object-cover"
              />
            )} */}
          </div>
          <div className="text-xl">
            <MdKeyboardArrowDown />
          </div>
        </Link>

        {user ? (
        <button onClick={handleLogOut}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
      </div>
    </header>
  );
}
