import React from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import { auth } from "../firebase";
const Navbar = (props) => {
  const odjava = async () => {
    try {
      await auth.signOut();
      console.log("Sesija završena");
      props.history.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="flex flex-col lg:flex-row items-center justify-between bg-gray-700 p-6">
      <div className="text-white">
        <Link className="font-bold text-2xl my-2 uppercase" to="/">
          HGSS dojavni centar
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row justify-between lg:ml-auto items-center box-border">
        <NavLink
          className="text-white p-3 rounded block box-border mr-2"
          activeClassName="bg-gray-900 font-bold"
          to="/prijavinesrecu"
          exact
        >
          Prijavi nesreću
        </NavLink>
        {props.firebaseUser ? (
          <NavLink
            className="text-white p-3 rounded block box-border mr-2"
            activeClassName="bg-gray-900 font-bold"
            to="/admin"
          >
            Dojave
          </NavLink>
        ) : null}
        {props.firebaseUser !== null ? (
          <button
            onClick={() => odjava()}
            className="hover:bg-gray-900 font-bold text-white p-3 rounded block box-border"
          >
            Odjava
          </button>
        ) : (
          <NavLink
            className="text-white p-3 rounded block box-border"
            activeClassName="bg-gray-900 font-bold"
            to="/login"
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
