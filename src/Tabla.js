import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Popper from 'popper.js'
import $ from 'jquery'

class Tabla extends Component {
    constructor() {
        super()
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        $.ajax({
            url: 'http://10.20.154.122/persona/persona/read.php',
            type: 'GET',
            dataType: 'json',
            ContentType: 'application/json',
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (jqXHR) {
                console.log(jqXHR);
            }.bind(this)

        });
    }

    render() {
        return (
            <table class="table table-striped table-hover">
                <tbody>
                    {this.state.data.map(function (item, key) {
                        return (
                            <tr key={key}>
                                <td>{item.id}</td>
                                <td>{item.nombre}</td>
                                <td>{item.fecha}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        );
    }
}

export default Tabla;
