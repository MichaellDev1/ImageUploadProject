import { LayoutPagesInterface } from "@/types/types";
import Head from "next/head";

export default function LayoutPages({ children, title }: LayoutPagesInterface) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <header>Header</header>
      {children}
      <footer>Footer</footer>
    </>
  );
}
