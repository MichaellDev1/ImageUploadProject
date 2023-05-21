import { useAuthConsumer } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { MdKeyboardArrowDown } from "react-icons/md";
import { VscVerifiedFilled } from "react-icons/vsc";

export default function Header() {
  const { user, setUser } = useAuthConsumer();

  const router = useRouter();

  const handleLogOut = (): void => {
    setUser(null);
    localStorage.removeItem("sessionid");
    location.reload();
  };

  return (
    <header className="w-full h-[70px] justify-between flex items-center px-10 mb-5">
      <div>
        {user && (
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
        )}
      </div>
      <div>
        {user ? (
          <Link href={"/user/"} className="flex gap-1 items-center relative">
            {user.verified && (
              <div className="text-sky-600 rounded-full bg-white text-lg z-10 absolute -bottom-[2px] left-5">
                <VscVerifiedFilled />
              </div>
            )}
            <div className="w-[40px] relative overflow-hidden rounded-full h-[40px]">
              {user && (
                <Image
                  src={`http://localhost:4000/auth/image/${user.image}`}
                  width={100}
                  height={100}
                  alt="user image"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="text-xl">
              <MdKeyboardArrowDown />
            </div>
          </Link>
        ) : (
          <ul className="flex items-center gap-2">
            <li>
              <Link
                href={"/login"}
                className="border-sky-600 border font-semibold text-base py-2 rounded-2xl px-4"
              >
                Inicia sesión
              </Link>
            </li>
            <li>
              <Link
                href={"/register"}
                className="bg-sky-600 font-semibold text-base py-2 rounded-2xl px-4"
              >
                Regístrate
              </Link>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}
