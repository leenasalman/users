import React from "react";
import ProductsTable from "../components/ProductsTable";
import AuthContext from "../state/auth-context";

function Products() {
  return (
    <AuthContext.Consumer>
      {/* add table to display users data */}
      {(ctx) => {
        return <ProductsTable products={ctx.products} />;
      }}
    </AuthContext.Consumer>
  );
}

export default Products;
