import Link from "next/link";
import "./style/notfound.css";
// import { Image } from "next/image";
const NotFound = () => {
  return (
    <section>
      <center>
        <div>
          <h1 className="font">404</h1>
        
          <p className="fnt">The page you are looking for doesn't exist.</p>
          <Link href="/">
            <button className="btn btn-info" style={{ color: "white" }}>
              Go to Home Page
            </button>
          </Link>
          <br/>
          {/* <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnUW54WtaU1UXob-vMjimpN0yAx24Exvhx8w&usqp=CAU"
                
                /> */}
          <img className="mt-2" height="300px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnUW54WtaU1UXob-vMjimpN0yAx24Exvhx8w&usqp=CAU" />
        </div>
      </center>
    </section>
  );
};

export default NotFound;
