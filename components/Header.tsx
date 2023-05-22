import { useAuthConsumer } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import VerifyCheck from "./VerifyCheck";
import { BsChatText } from "react-icons/bs";

export default function Header() {
  const { user, setUser } = useAuthConsumer();
  const router = useRouter();

  return (
    <header className="w-full h-[80px] justify-between flex items-center px-14 mb-5">
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
          <div className="flex gap-5">
            <Link
              href={`/user/${user.username}`}
              className="flex gap-1 items-center relative"
            >
              {user.verified && (
                <VerifyCheck
                  style={{ position: "absolute", right: 0, bottom: 0 }}
                />
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
            </Link>
            <button className="text-2xl">
              <BsChatText />
            </button>
          </div>
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
