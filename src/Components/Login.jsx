import React from "react";
import { db, auth } from "../firebase";
import { withRouter } from "react-router-dom";


const Login = (props) => {
  

  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [msg, setMsg] = React.useState("");
  const [registr, setRegistr] = React.useState(true);


  const registriranjeKorisnika = React.useCallback(async () => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, pass);
      await db.collection("users").doc(res.user.uid).set({
        email: res.user.email,
        uid: res.user.uid,
      });
      await db.collection(res.user.uid).add({
        name: "primjer",
        fecha: Date.now(),
      });
      setEmail("");
      setPass("");
      setMsg("");
      props.history.push("/admin");
    } catch (error) {
      console.log(error);
      setMsg(error.message);
    }
  }, [email, pass, props.history]);

  const Sesija = React.useCallback(async () => {
    try {
      await auth.signInWithEmailAndPassword(email, pass);
      setEmail("");
      setPass("");
      setMsg("");
      props.history.push("/admin");
    } catch (error) {
      setMsg(error.message);
      return;
    }
  }, [email, pass, props.history]);

  //Funkcija provjere valjanosti podataka
  const provjeraPodataka = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setMsg("Unesite email adresu");
      return;
    }
    if (!pass.trim()) {
      setMsg("Unesite lozinku");
      return;
    }
    if (pass.length < 6) {
      setMsg("Lozinka mora imati minimalno 6 znakova");
      return;
    }
    setMsg("");
    console.log("Uredu je sve");
    if (registr) {
      registriranjeKorisnika();
    } else {
      Sesija();
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h3 className="text-center font-bold text-2xl mb-10">
        {registr ? "Registracija" : "Prijava"}
      </h3>
      <hr />
      <form
        onSubmit={provjeraPodataka}
        className="mt-10 w-11/12 md:w-5/6 lg:w-3/5 xl:w-1/2 mx-auto"
      >
        {msg.length > 0 ? (
          <div className="p-4 bg-red-300 text-red-600 block w-3/4 mx-auto mb-4">
            {msg}
          </div>
        ) : null}
        <input
          type="email"
          placeholder="Unesite email adresu"
          name="email"
          className="focus:outline-none bg-transparent text-xl border-b-2 border-blue-400 w-3/4 mx-auto mb-5 block"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Unesite lozinku"
          name="password"
          className="focus:outline-none bg-transparent text-xl border-b-2 border-blue-400 w-3/4 mx-auto mb-5 block"
          onChange={(e) => setPass(e.target.value)}
          value={pass}
        />
        <button
          type="submit"
          className="block p-4 border-b-4 bg-gray-700 border-gray-900 rounded text-white w-3/4 mb-5 mx-auto"
        >
          {registr ? "Registriraj se" : "Prijavi se"}
        </button>
        <button
          type="button"
          onClick={() => setRegistr(!registr)}
          className="block p-3 border-b-4 bg-blue-500 border-blue-700 rounded text-white w-3/4 mx-auto"
        >
          {registr ? "Imate li već račun?" : "Niste još registrirani?"}
        </button>
      </form>
    </div>
  );
};

export default withRouter(Login);
