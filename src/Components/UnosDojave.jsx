import React, { useEffect } from "react";
import { db } from "../firebase";
import "moment/locale/es";

function UnosDojave() {
  const [hitnoca,setHitnoca] = React.useState();
  const [vrsta, setvrsta] = React.useState("");
  const [ozljeden, setozljeden] = React.useState("");
  const [broj, setbroj] = React.useState("");
  const [ime, setime] = React.useState("");
  const [prezime, setprezime] = React.useState("");
  const [lat,setLat]=React.useState();
  const [lng,setLng]=React.useState();

  useEffect (() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  })

  const dodavanjedojave = async (e) => {
    e.preventDefault();
    if (!hitnoca.trim()) {
      console.log("Prazno je, popunite polje");
      return;
    };
      var hitnoca_nesrece = hitnoca
      var vrsta_nesrece= vrsta
      var broj_ozljedenih= ozljeden 
      var broj_mobitela= broj
      var ime_k= ime
      var prezime_k= prezime
      var today= new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();

      var datum = mm + '/' + dd + '/' + yyyy;
      var geo={latitude: lat,longitude: lng}
     
      db.collection('test').add({ hitnoca_nesrece,vrsta_nesrece,broj_ozljedenih,broj_mobitela,ime_k,prezime_k,datum,geo });

      setHitnoca("");
      setvrsta("");
      setozljeden("");
      setbroj("");
      setime("");
      setprezime("");
  };
  return (

    <form
            onSubmit={dodavanjedojave}
            className="w-3/4 mx-auto"
          >

<div>
<h1 className="font-bold text-center mx-auto text-5xl my-5">
        Prijavi nesreću
      </h1>
    </div>

      <input
              type="number"
              name="name"
              className="focus:outline-none w-full bg-gray-300 p-4 border mb-3"
              placeholder="Hitnoća od 1-5"
              onChange={(e) => setHitnoca(e.target.value)}
              value={hitnoca}
            />
      <input
              type="text"
              name="vrsta_nesrece"
              className="focus:outline-none w-full bg-gray-300 p-4 border mb-3"
              placeholder="Unesite vrstu nesrece (pad sa litice, sumnja na lom...)"
              onChange={(e) => setvrsta(e.target.value)}
              value={vrsta}
            />

<input
              type="number"
              name="broj_ozljedenih"
              className="focus:outline-none w-full bg-gray-300 p-4 border mb-3"
              placeholder="Unesite broj ozljedenih"
              onChange={(e) => setozljeden(e.target.value)}
              value={ozljeden}
            />

<input
              type="number"
              name="broj_mobitela"
              className="focus:outline-none w-full bg-gray-300 p-4 border mb-3"
              placeholder="Unesite broj mobitela"
              onChange={(e) => setbroj(e.target.value)}
              value={broj}
            />

<input
              type="text"
              name="ime"
              className="focus:outline-none w-full bg-gray-300 p-4 border mb-3"
              placeholder="Unesite ime"
              onChange={(e) => setime(e.target.value)}
              value={ime}
            />

<input
              type="text"
              name="prezime"
              className="focus:outline-none w-full bg-gray-300 p-4 border mb-3"
              placeholder="Unesite prezime"
              onChange={(e) => setprezime(e.target.value)}
              value={prezime}
            />
              <button
                onClick={dodavanjedojave}
                className="block px-4 py-3 mx-auto text-white rounded bg-green-400 border border-b-4 border-green-600"
              >
                Prijavi
              </button>
          </form>
  );
}

export default UnosDojave;
