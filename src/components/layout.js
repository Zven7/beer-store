import Head from "next/head";
import BottomNavbar from "./BottomNavbar/BottomNavbar";
import Header from "./Header/Header";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <style>
          @import
          url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap");
        </style>
      </Head>
      <Header />
      <main style={{ maxWidth: "var(--max-width)", margin: "auto" }}>
        {children}
      </main>
      <BottomNavbar />
    </>
  );
}
