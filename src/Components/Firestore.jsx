import React from "react";
import { db } from "../firebase";
import moment from "moment";
import "moment/locale/es";

function Firestore(props) {
  
  const [dojave, setdojave] = React.useState([]);
  const [dojava, setdojava] = React.useState("");
  const [uredivanje, seturedivanje] = React.useState(false);
  const [id, setId] = React.useState("");
  React.useEffect(() => {
    // Para conectar la base de datos usaremos una funcion
    const obtenerDatos = async () => {
      try {
        // Ejecutamos el metodo get lo podemos hacer dentro del try o podemos usar promesas con then
        const data = await db
          .collection(props.user.uid)
          .orderBy("fecha", "desc")
          .get();

        // Una vez obtenemos la colleccion en este caso el id del usuario la mostramos en consola
        const arrayData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setdojave(arrayData);
      } catch (error) {
        console.log(error);
      }
    };
    // Funkcija da se jednom vrti a ne beskonacno puta
    obtenerDatos();
  }, [props.user.uid]);
  const aggTarea = async (e) => {
    e.preventDefault();
    if (!dojava.trim()) {
      console.log("Prazno je, popunite polje");
      return;
    }
    try {
      const novadojava = {
        name: dojava,
        fecha: Date.now(),
      };
      const data = await db.collection(props.user.uid).add(novadojava);
      setdojave([...dojave, { ...novadojava, id: data.id }]);
      setdojava("");
    } catch (error) {
      console.log(error);
    }
    console.log(dojava);
  };
  const izbrisidojavu = async (id) => {
    try {
      await db.collection(props.user.uid).doc(id).delete();

      const arrayFiltrado = dojave.filter((dojava) => dojava.id !== id);
      setdojave(arrayFiltrado);
    } catch (error) {
      console.log(error);
    }
  };
  const activarEdicion = (item) => {
    seturedivanje(true);
    setdojava(item.name);
    setId(item.id);
  };
  const urediDojavu = async (e) => {
    e.preventDefault();
    if (!dojava.trim()) {
      return;
    }
    try {
      await db.collection(props.user.uid).doc(id).update({
        name: dojava,
      });
      const arrayEditado = dojave.map((item) =>
        item.id === id ? { id: item.id, name: dojava, fecha: item.fecha } : item
      );
      setdojave(arrayEditado);
      setdojava("");
      setId("");
      seturedivanje(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mx-auto">
      <div className="crud lg:flex lg:justify-between mt-10">
        <div className="dojave w-full lg:w-1/2">
          {dojave.length > 0 ? (
            <h2 className="text-center text-2xl font-bold">Lista dojava</h2>
          ) : (
            <h2 className="text-center text-2xl font-bold">Još nema dojava</h2>
          )}
          {dojave.map((dojava) => (
            <div
              key={dojava.id}
              className="w-11/12 lg:w-3/4 mx-auto p-4 box-border mb-2 flex flex-col lg:flex-row items-center rounded bg-blue-200"
            >
              <p className="w-full text-center lg:text-left lg:w-3/4 mb-5 lg:m-0">
                {dojava.name} - {moment(dojava.fecha).format("L")} a las{" "}
                {moment(dojava.fecha).format("LT")}
              </p>
              <div className="div-buttons mx-auto flex flex-shrink">
                <button
                  className="rounded bg-orange-400 border border-b-4 border-orange-600 text-white p-4"
                  onClick={() => activarEdicion(dojava)}
                >
                  Uredi
                </button>
                <button
                  className="rounded bg-red-400 border border-b-4 border-red-600 text-white p-4 ml-2 "
                  onClick={() => izbrisidojavu(dojava.id)}
                >
                  Izbriši
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full lg:w-1/2">
          <h2 className="text-center text-2xl font-bold">
            {uredivanje ? "Uredi dojavu" : "Dodaj dojavu"}
          </h2>
          <form
            onSubmit={uredivanje === true ? urediDojavu : aggTarea}
            className="w-3/4 mx-auto"
          >
            <input
              type="text"
              name="name"
              className="focus:outline-none w-full bg-gray-300 p-4 border mb-3"
              placeholder="Unesite novu dojavu"
              onChange={(e) => setdojava(e.target.value)}
              value={dojava}
            />
            {uredivanje === true ? (
              <button
                type="submit"
                className="block px-4 py-3 mx-auto text-white rounded bg-yellow-400 border border-b-4 border-orange-600"
              >
                Uredi
              </button>
            ) : (
              <button
                type="submit"
                className="block px-4 py-3 mx-auto text-white rounded bg-green-400 border border-b-4 border-green-600"
              >
                Dodaj
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Firestore;
