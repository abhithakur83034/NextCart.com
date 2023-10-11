import { Dancing_Script } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import NavBar from "./NavBar";
// import Footer from "./footer";
import Cartdata from "./Cartdata";
import Authentication from "./components/authentication/Authentication";
const inter = Dancing_Script({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Cartdata>

          <NavBar />
          <Authentication>
          {children}
          </Authentication>
          <ToastContainer />
          {/* <Footer /> */}
        </Cartdata>
        
      </body>
    </html>
  );
}
