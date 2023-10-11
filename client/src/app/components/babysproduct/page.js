import Babyfetch from "./fetch";

const getProducts = async () => {
  let response = await fetch("http://localhost:4500/product/showproduct", {
    cache: "no-store",
  });
  let products = await response.json();
  return products;
};

const Page = () => {
  const fetchAndRenderProducts = async () => {
    let products = await getProducts();
    // console.log(products);
    return (
      <>
        <Babyfetch product={products} />
      </>
    );
  };

  return <>{fetchAndRenderProducts()}</>;
};

export default Page;
