import { useAuthConsumer } from "@/context/AuthContext";
import { LayoutPagesInterface } from "@/types/types.d";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "./Header";
import Footer from "./Footer";

export default function LayoutPages({ children, title }: LayoutPagesInterface) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  );
}
