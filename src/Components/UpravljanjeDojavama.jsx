import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import {db} from '../firebase';

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
       const { ime_k,prezime_k,broj_mobitela,vrsta_nesrece,broj_ozljedenih,datum,hitnoca_nesrece } = doc.data();
       dojave.push({
         key: doc.id,
         doc, // DocumentSnapshot
         ime_k,
         prezime_k,
         broj_mobitela,
         vrsta_nesrece,
         hitnoca_nesrece,
         broj_ozljedenih,
         datum
       });
     });
     this.setState({
       dojave
    });
   }
  render() {
    return (
      
      <div>
        
            <table>
              <thead>
                <tr>
                  <th>Ime</th>
                  <th>Prezime</th>
                  <th>Broj mobitela</th>
                  <th>Broj ozljeđenih</th>
                  <th>Hitnoća</th>
                  <th>Vrsta nesrece</th>
                  <th>Datum</th>
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
                    <td>{dojave.vrsta_nesrece}</td>
                    <td>{dojave.datum}</td>
                    <Link to={`/edit/${dojave.key}`}>Pregledaj i uredi</Link>;
                    <button onClick={this.delete.bind(this, dojave.key)}>Izbrisi</button>
                  </tr>
                )}
              </tbody>
            </table>
            </div>
    );
  }
}

export default ListaDojava;