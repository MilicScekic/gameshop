import Footer from "./Footer";
import Header from "./Header";
import AlertBox from "../components/Alert";

function Layout({ children }) {
  return (
    <>
      <Header />
      <AlertBox />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
