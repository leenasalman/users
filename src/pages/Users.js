import React from "react";
import UsersTable from "../components/UsersTable";
import AuthContext from "../state/auth-context";

function users() {
  return (
    <AuthContext.Consumer>
      {/* add table to display users data */}
      {(ctx) => {
        return <UsersTable users={ctx.users} />;
      }}
    </AuthContext.Consumer>
  );
}

export default users;
