import React from "react";
import { auth } from "../firebase";
import { withRouter } from "react-router-dom";
import ListaDojava from './UpravljanjeDojavama'

const Admin = (props) => {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    if (auth.currentUser) {
      setUser(auth.currentUser);
    } else {
      props.history.push("/login");
    }
  }, [props.history]);
  return (
    <div>
      <h2 className="text-center text-2xl mt-10 font-bold">
        Upravljanje dojavama
      </h2>
      <ListaDojava />
    </div>
  );
};

export default withRouter(Admin);
