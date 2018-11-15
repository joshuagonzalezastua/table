import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Popper from 'popper.js';
import $ from 'jquery';



class CRUD extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      personaId: '',
      personaNombre: '',
      personaFecha: ''
    }
    this.idRef = React.createRef();
    this.nombreRef = React.createRef();
    this.fechaRef = React.createRef();
    this.cancelRef = React.createRef();
    this.deleteRef = React.createRef();
    this.modificarRef = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.guardar = this.guardar.bind(this);
    this.cargaValores = this.cargaValores.bind(this);
    this.consultarPersona = this.consultarPersona.bind(this);
    this.cancelar = this.cancelar.bind(this);
    this.borrar = this.borrar.bind(this);
    this.modificar = this.modificar.bind(this);


  }
  handleChange(event) {
    console.log(event.target.id)
    if (event.target.id == 'personaId')
      this.setState({ personaId: event.target.value });
    if (event.target.id == 'personaNombre')
      this.setState({ personaNombre: event.target.value });
    if (event.target.id == 'personaFecha')
      this.setState({ personaFecha: event.target.value });
  }

  guardar(event) {

    var arr = '{"id":"' + this.state.personaId + '","nombre":"' + this.state.personaNombre + '","fecha":"' + this.state.personaFecha + '"}';
    $.ajax({
      async: true,
      url: "http://10.20.154.122/persona/persona/create.php",
      type: "POST",
      data: arr,
      dataType: 'json',
      success: function (msg) {
        alert(msg.message);
        this.cargaValores();

      }.bind(this)
    });
    event.preventDefault();
  }

  modificar(event) {

    var arr = '{"id":"' + this.state.personaId + '","nombre":"' + this.state.personaNombre + '","fecha":"' + this.state.personaFecha + '"}';
    $.ajax({
      async: true,
      url: "http://10.20.154.122/persona/persona/update.php",
      type: "POST",
      data: arr,
      dataType: 'json',
      success: function (msg) {
        alert(msg.message);
        this.cargaValores();

      }.bind(this)
    });
    event.preventDefault();
  }

  borrar(event) {
    var arr = '{"id":"' + this.state.personaId + '","nombre":"' + this.state.personaNombre + '","fecha":"' + this.state.personaFecha + '"}';
      $.ajax({
          async: true,
          url: "http://10.20.154.122/persona/persona/delete.php",
          type: "POST",
          data: arr,
          dataType: 'json',
          success: function(msg) {
              alert(msg.message);
              this.cargaValores();
          }.bind(this)
      });
      event.preventDefault();
  }

  cargaValores() {
    $.ajax({
      url: "http://10.20.154.122/persona/persona/read.php",
      type: "GET",
      dataType: 'json',
      ContentType: 'application/json',
      success: function (data) {

        this.setState({ data: data });
      }.bind(this),
      error: function (jqXHR) {
        console.log(jqXHR);
      }.bind(this)
    })
  }


  componentDidMount() {
    this.cargaValores();
  }
  consultarPersona(e) {
    this.setState({ personaId: e.currentTarget.childNodes[0].textContent });
    this.idRef.current.value = this.state.personaId;

    this.setState({ personaNombre: e.currentTarget.childNodes[1].textContent });
    this.nombreRef.current.value = this.state.personaNombre;

    this.setState({ personaFecha: e.currentTarget.childNodes[2].textContent });
    this.fechaRef.current.value = this.state.personaFecha;
    
    this.deleteRef.current.classList.remove("invisible");
    this.cancelRef.current.classList.remove("invisible");
    this.modificarRef.current.classList.remove("invisible");
  }

  cancelar() {
    this.deleteRef.current.classList.add("invisible");
    this.cancelRef.current.classList.add("invisible");
    this.modificarRef.current.classList.add("invisible");
  }


  render() {


    return (
      <div>
        <table class="table table-striped table-hover">
          <tbody>{this.state.data.map(function (item, key) {

            return (
              <tr key={key} data-key={item.id} onClick={this.consultarPersona}>
                <td>{item.id}</td>
                <td>{item.nombre}</td>
                <td>{item.fecha}</td>
              </tr>
            )
          }.bind(this)

          )}</tbody>
        </table>
        <form >
          <div class="form-group">
            <label for="personaId">Identificación</label>
            <input ref={this.idRef} type="number" class="form-control" id="personaId" placeholder="Ejemplo: 000000000" value={this.state.personaId} onChange={this.handleChange} />
          </div>
          <div class="form-group">
            <label for="personaNombre">Nombre</label>
            <input ref={this.nombreRef} type="text" class="form-control" id="personaNombre" placeholder="Ejemplo: Joshua Gonzalez" value={this.state.personaNombre} onChange={this.handleChange} />
          </div>

          <div class="form-group">
            <label for="personaFecha">Fecha</label>
            <input ref={this.fechaRef} type="text" class="form-control" id="personaFecha" value={this.state.personaFecha} onChange={this.handleChange} />
          </div>
          <button type="button" class="btn btn-success" id="save" onClick={this.guardar}>Guardar</button>
          <button ref={this.modificarRef} type="button" class="btn btn-primary invisible" id="update" onClick={this.modificar}>Modificar</button>
          <button ref={this.deleteRef} type="button" class="btn btn-danger invisible" id="delete"  onClick={this.borrar}>Borrar</button>
          <button ref={this.cancelRef} type="button" class="btn btn-warning invisible" id="cancel" onClick={this.cancelar}>Cancelar</button>
        </form>
      </div>
    )
  }
}





export default CRUD;