import React, { Component } from 'react';
import {db} from '../firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hitnoca_nesrece:'',
      key: '',
      vrsta_nesrece:'',
      broj_ozljedenih:'',
      broj_mobitela:'',
      ime_k:'',
      prezime_k:''
    };
  }

  componentDidMount() {
    const ref = db.collection('test').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const dojave = doc.data();
        this.setState({
          key: doc.id,
          hitnoca_nesrece:dojave.hitnoca_nesrece,
          vrsta_nesrece: dojave.vrsta_nesrece,
          broj_ozljedenih: dojave.broj_ozljedenih,
          broj_mobitela: dojave.broj_mobitela,
          ime_k: dojave.ime_k,
          prezime_k: dojave.prezime_k
        });
      } else {
        console.log("Nema dokumenta!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({dojave:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { hitnoca_nesrece, vrsta_nesrece, broj_ozljedenih, broj_mobitela, ime_k, prezime_k } = this.state;

    const updateRef = db.collection('test').doc(this.state.key);
    updateRef.set({
        hitnoca_nesrece,
        vrsta_nesrece,
        broj_ozljedenih,
        broj_mobitela,
        ime_k,
        prezime_k
        })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
    <div>  <h1 className="font-bold text-center mx-auto text-5xl my-5">
      Pregled dojave
    </h1>
      <form
            onSubmit={this.onSubmit}
            className="w-3/4 mx-auto"
          >
            <input
              type="text"
              name="hitnoca_nesrece"
              className="focus:outline-none w-full bg-gray-300 p-4 border mb-3"
              placeholder="Unesite hitnocu od 1 do 5"
              onChange={this.onChange}
              value={this.state.hitnoca_nesrece}
            />
      <input
              type="text"
              name="vrsta_nesrece"
              className="focus:outline-none w-full bg-gray-300 p-4 border mb-3"
              placeholder="Unesite vrstu nesrece (pad sa litice, sumnja na lom...)"
              onChange={this.onChange}
              value={this.state.vrsta_nesrece}
            />

<input
              type="number"
              name="broj_ozljedenih"
              className="focus:outline-none w-full bg-gray-300 p-4 border mb-3"
              placeholder="Unesite broj ozljedenih"
              onChange={this.onChange}
              value={this.state.broj_ozljedenih}
            />

<input
              type="number"
              name="broj_mobitela"
              className="focus:outline-none w-full bg-gray-300 p-4 border mb-3"
              placeholder="Unesite broj mobitela"
              onChange={this.onChange}
              value={this.state.broj_mobitela}
            />

<input
              type="text"
              name="ime_k"
              className="focus:outline-none w-full bg-gray-300 p-4 border mb-3"
              placeholder="Unesite ime"
              onChange={this.onChange}
              value={this.state.ime_k}
            />

<input
              type="text"
              name="prezime_k"
              className="focus:outline-none w-full bg-gray-300 p-4 border mb-3"
              placeholder="Unesite prezime"
              onChange={this.onChange}
              value={this.state.prezime_k}
            />
            
              <button type="submit"
                className="block px-4 py-3 mx-auto text-white rounded bg-green-400 border border-b-4 border-green-600"
              >
                Izmjeni
              </button>
          </form>  </div> 
    );
  }
}

export default Edit;