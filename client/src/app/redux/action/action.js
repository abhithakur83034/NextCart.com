export const actionitem = (data) => {
  console.log("from action", data);
  return {
    type: "PRODUCT",
    payload: data,
  };
};
