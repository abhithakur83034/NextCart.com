import React from "react";
import ShowProduct from "./ShowProduct";
import Slidercart from "./Slidercart";
import Imageoffer from "./Imageoffer";
import Footer from "@/app/footer";
const getProducts = async () => {
  let response = await fetch("http://localhost:4500/product/showproduct", {
    cache: "no-store",
  });
  let products = await response.json();
  return products;
};

const ShowServer = () => {
  const fetchAndRenderProducts = async () => {
    let products = await getProducts();
    return (
      <>   
        <Slidercart product={products} />
        <ShowProduct product={products} />
        <Imageoffer/>
        <Footer/>
      </>
    );
  };

  return <>{fetchAndRenderProducts()}</>;
};

export default ShowServer;
