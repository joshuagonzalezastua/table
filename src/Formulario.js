import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Popper from 'popper.js'
import $ from 'jquery'

class Formulario extends Component {
    constructor() {
        super()
        this.state = {
            id: '',
            nombre: '',
            fecha: '2011-01-13'
        }
    }

    savePersona = () => {
        var arr = '{"id":"' + this.state.id + '","nombre":"' + this.state.nombre + '","fecha":"' + this.state.fecha + '"}';
        $.ajax({
            async: true,
            url: "http://10.20.154.122/persona/persona/create.php",
            type: "POST",
            data: arr,
            dataType: 'json',
            success: function (msg) {
                alert(msg.message);
            }
        });
    }

    handleChange = (e) => {
        if (e.target.id === 'personaId')
            this.setState({ id: e.target.value });
        if (e.target.id === 'personaNombre')
            this.setState({ nombre: e.target.value });
        if (e.target.id === 'personaFecha')
            this.setState({ fecha: e.target.value });
    }

    render() {
        return (
            <div class="container">
                <form>
                    <div class="form-group">
                        <label for="personaId">Identificación</label>
                        <input type="text" class="form-control" id="personaId" onChange={this.handleChange} value={this.state.id} placeholder="Ejemplo: 0 0000 0000" />
                    </div>
                    <div class="form-group">
                        <label for="personaNombre">Nombre</label>
                        <input type="text" class="form-control" id="personaNombre" onChange={this.handleChange} value={this.state.nombre} placeholder="Ejemplo: Joshua Gonzalez" />
                    </div>

                    <div class="form-group">
                        <label for="personaFecha">Fecha</label>
                        <input type="text" class="form-control" id="personaFecha" onChange={this.handleChange} value={this.state.fecha} />
                    </div>
                    <button type="button" class="btn btn-success" id="save" onClick={this.savePersona}>Guardar</button>
                </form>
            </div>
        );
    }
}

export default Formulario;
