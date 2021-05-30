import { Component } from 'react';
import React from 'react';
import {Table} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {db} from '../firebase';
import '../Style.css';
import moment from 'moment';


class ListaDojava extends Component {
  constructor(props) {
    super(props);
    this.ref = db.collection('test');
    this.unsubscribe = null;
    this.state = {
      dojave: [],
      key: ''
    };
  }

  
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }
  delete(id){
    this.ref.doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

   onCollectionUpdate = (querySnapshot) => {
     const dojave = [];
     querySnapshot.forEach((doc) => {
       const { ime_k,prezime_k,broj_mobitela,vrsta_nesrece,broj_ozljedenih,datum,hitnoca_nesrece, geo } = doc.data();
       dojave.push({
         key: doc.id,
         doc, // DocumentSnapshot
         ime_k,
         prezime_k,
         broj_mobitela,
         vrsta_nesrece,
         hitnoca_nesrece,
         broj_ozljedenih,
         datum,
         geo
       });
     });
     this.setState({
       dojave
    });
   }
  render() {
    return (
      
      <div ClassName="table">
        
            <Table>
              <thead>
                <tr>
                  <th>Ime</th>
                  <th>Prezime</th>
                  <th>Broj mobitela</th>
                  <th>Broj ozljeđenih</th>
                  <th>Hitnoća</th>
                  <th>Vrsta nesrece</th>
                  <th>Datum </th>
                  <th>Lokacija</th>
                  <th>Akcije</th>
                </tr>
              </thead>
              <tbody>
                {this.state.dojave.map(dojave =>
                  <tr>
                    <td>{dojave.ime_k}</td>
                    <td>{dojave.prezime_k}</td>
                    <td>{dojave.broj_mobitela}</td>
                    <td>{dojave.broj_ozljedenih}</td>
                    <td>{dojave.hitnoca_nesrece}</td>
                    <td>{dojave.vrsta_nesrece} </td>
                    <td>{dojave.datum}</td>

                

                    <td>geografska dužina: {dojave.geo.longitude}, 
                    geografska širina: {dojave.geo.latitude}</td>
                   
                 {/*  <Link to={`/edit/${dojave.key}`}>  <button className="block  mx-auto text-white rounded bg-orange-400 border border-b-4 border-orange-600" >
    Uredi
                </button></Link>  */}
                    <button className="block  mx-auto text-white rounded bg-green-400 border border-b-4 border-green-600" onClick={this.delete.bind(this, dojave.key)}>Izbrisi</button>
                  </tr>
                )}
              </tbody>
            </Table>
            </div>
    );
  }
}

export default ListaDojava;