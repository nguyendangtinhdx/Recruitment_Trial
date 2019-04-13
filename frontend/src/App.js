import React, { Component } from 'react';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import loading from './images/loading.gif';
import * as Config from './constants/Config';
import callApi from './utils/callApi';

class App extends Component {

    state = {
        users: [],
        errors: {},
        newUserData: {
            name: '',
            age: '',
            comment: '',
            date_created: new Date(),
        },
        editUserData: {
            id: '',
            name: '',
            age: '',
            comment: '',
            date_created: ''
        },
        editUserModal: false,
        itemsToShow: Config.itemsToShowChange
    }
    componentWillMount() {
        this._refreshUsers();
    }
    toggleEditUserModal() {
        this.setState({
            editUserModal: !this.state.editUserModal
        });
    }
    addUser() {
        if (this.handleValidation()) {
            callApi('users', 'POST', this.state.newUserData).then((response) => {
                this._refreshUsers();
                this.setState({
                    newUserData: {
                        name: '',
                        age: '',
                        comment: '',
                        date_created: new Date()
                    }
                });
            });
        }
    }
    updateUser() {
        let { id } = this.state.editUserData;
        callApi(`users/${id}`, 'PUT', this.state.editUserData).then((response) => {
            this._refreshUsers();
        });
    }
    updateUserAge(id, age) {
        if (age < 120) {
            age++;
            var user = {
                id: id,
                age: age
            };
            callApi(`users/${id}`, 'PUT', user).then((response) => {
                this._refreshUsers();
            });
        }
    }
    editUser(id, name, age, comment, date_created) {
        this.setState({
            editUserData: { id, name, age, comment, date_created }, editUserModal: !this.state.editUserModal
        });
    }
    deleteUser(id, name) {
        if (window.confirm(Config.alertConfirmDelete)) {
            callApi(`users/${id}`, 'DELETE', null).then((response) => {
                // if (response.status === '200') {
                    this._refreshUsers();
                // }else{
                //     document.getElementById('deleteError').style.display = "block";
                //     document.getElementById('deleteError').innerHTML = name + Config.deleteError;
                // }
            });
        }
    }
    _refreshUsers() {
        callApi('users', 'GET', null).then((response) => {
            this.setState({
                users: response.data
            })
            this.enableButton()
        });
    }
    cancelUser() {
        this.setState({
            newUserData: {
                name: '',
                age: '',
                comment: ''
            }
        });
        let errors = {};
        errors["errAge"] = "";
        errors["errName"] = "";
        this.setState({ errors: errors });
        document.getElementById('Age').value = "";
    }
    showImage() {
        var img = document.createElement("img");
        img.src = loading;
        document.getElementById('showimage').appendChild(img);
        setTimeout(function () { img.parentNode.removeChild(img); }, 800);
    }
    enableButton() {
        if (this.state.users.length <= this.state.itemsToShow) {
            document.getElementById('buttonShowMore').disabled = true;
        } else {
            document.getElementById('buttonShowMore').disabled = false;
        }
    }
    showMore() {
        if (this.state.users.length > this.state.itemsToShow) {
            this.showImage();
            this.setState({
                itemsToShow: this.state.itemsToShow + Config.itemsToShowChange,
            })
        }
        if (this.state.users.length > this.state.itemsToShow - Config.itemsToShowChange) {
            document.getElementById('buttonShowMore').disabled = true;
        } else {
            document.getElementById('buttonShowMore').disabled = false;
        }
    }
    handleValidation() {
        let { name, age } = this.state.newUserData;
        let errors = {};
        let formIsValid = true;

        if (name === '') {
            formIsValid = false;
            errors["errName"] = Config.errorName;
        }
        if (age < 1 || !this.isNumeric(age)) {
            formIsValid = false;
            errors["errAge"] = Config.errorAge1;
        }
        if (age === '') {
            formIsValid = false;
            errors["errAge"] = Config.errorAge;
        }
        if (age > 120) {
            formIsValid = false;
            errors["errAge"] = Config.errorAge120;
        }
        this.setState({ errors: errors });
        return formIsValid;
    }

    isNumeric(value) {
        return /^-{0,1}\d+$/.test(value);
    }

    render() {
        let users = this.state.users.slice(0, this.state.itemsToShow).map((user) => {
            return (
                <tr key={user.id}>
                    <td>{user.name} ({user.age})</td>
                    <td className="comment">{user.comment}</td>
                    <td className="text-center">
                        <Button className="buttonAdd" color="primary" size="sm" onClick={this.updateUserAge.bind(this, user.id, user.age)}>{Config.buttonUpdateAge}</Button>
                        {/* <Button color="primary" size="sm" onClick={this.editUser.bind(this, user.id, user.name, user.age, user.comment, user.date_created)}>Edit</Button>&nbsp;&nbsp; */}
                        <Button className="button btnDelete" color="danger" size="sm" onClick={this.deleteUser.bind(this, user.id, user.name)}>{Config.buttonDelete}</Button>
                    </td>
                </tr>
            )
        });
        return (
            <div id="form" className="container">
                <br />
                <h1 className="title text-center">{Config.title}</h1>
                <br />
                {/* <div id="deleteError" className="alert alert-danger text-center" role="alert"></div> */}
                <FormGroup>
                    <div className="form-group row">
                        <Label for="Name" className="col-md-2 col-form-label-sm">{Config.labelName} (<span className="required">*</span>)</Label>
                        <div className="col-md-4">
                            <Input id="Name" name="name" className="form-control form-control-sm" placeholder={Config.placeholderName} maxLength="10"
                                value={this.state.newUserData.name} onChange={(e) => {
                                    let { newUserData } = this.state;
                                    newUserData.name = e.target.value;
                                    this.setState({ newUserData });
                                }} />
                            <span className="error">{this.state.errors["errName"]}</span>
                        </div>
                    </div>
                </FormGroup>
                <FormGroup>
                    <div className="form-group row">
                        <Label for="Age" className="col-md-2 col-form-label-sm">{Config.labelAge} (<span className="required">*</span>)</Label>
                        <div className="col-md-4">
                            <Input type="number" id="Age" name="age" className="form-control form-control-sm" placeholder={Config.placeholderAge} min="1" max="120"
                                value={this.state.newUserData.age} onChange={(e) => {
                                    let { newUserData } = this.state;
                                    newUserData.age = e.target.value;
                                    this.setState({ newUserData });
                                }} />
                        <span id="errorAge" className="error">{this.state.errors["errAge"]}</span>
                        </div>
                    </div>
                </FormGroup>
                <FormGroup>
                    <div className="form-group row">
                        <Label for="Comment" className="col-md-2 col-form-label-sm">{Config.labelComment}</Label>
                        <div className="col-md-8">
                            <textarea className="form-control form-control-sm" rows="3" placeholder={Config.placeholderComment}
                                value={this.state.newUserData.comment} onChange={(e) => {
                                    let { newUserData } = this.state;
                                    newUserData.comment = e.target.value;
                                    this.setState({ newUserData });
                                }} ></textarea>
                        </div>
                    </div>
                </FormGroup>

                <div className="text-center">
                    <Button className="button buttonAdd" color="success" size="sm" onClick={this.addUser.bind(this)}>{Config.buttonAdd}</Button>
                    <Button className="button" color="secondary" size="sm" onClick={this.cancelUser.bind(this)}>{Config.buttonCancel}</Button>
                </div>

                <Modal isOpen={this.state.editUserModal} toggle={this.toggleEditUserModal.bind(this)}>
                    <ModalHeader toggle={this.toggleEditUserModal.bind(this)}>{Config.buttonUpdate}</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="Name" className="col-form-label-sm">{Config.labelName}</Label>
                            <Input id="Name" className="form-control form-control-sm" placeholder={Config.placeholderName} value={this.state.editUserData.name}
                                onChange={(e) => {
                                    let { editUserData } = this.state;
                                    editUserData.name = e.target.value;
                                    this.setState({ editUserData });
                                }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Age" className="col-form-label-sm">{Config.labelAge}</Label>
                            <Input id="Age" className="form-control form-control-sm" placeholder={Config.placeholderAge} value={this.state.editUserData.age}
                                onChange={(e) => {
                                    let { editUserData } = this.state;
                                    editUserData.age = e.target.value;
                                    this.setState({ editUserData });
                                }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Comment" className="col-form-label-sm">{Config.labelComment}</Label>
                            <textarea id="Comment" className="form-control form-control-sm" rows="3" value={this.state.editUserData.comment}
                                onChange={(e) => {
                                    let { editUserData } = this.state;
                                    editUserData.comment = e.target.value;
                                    this.setState({ editUserData });
                                }} >placeholder={Config.placeholderComment}</textarea>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="button" color="primary" size="sm" onClick={this.updateUser.bind(this)}>{Config.buttonUpdate}</Button>
                        <Button className="button" color="secondary" size="sm" onClick={this.toggleEditUserModal.bind(this)}>{Config.buttonCancel}</Button>
                    </ModalFooter>
                </Modal>
                <br />
                <div className="table-responsive">
                    <table className="table-striped table-bordered table-hover table-sm">
                        <thead>
                            <tr className="table-primary">
                                <th className="thName text-center">{Config.labelName} ({Config.labelAge})</th>
                                <th className="thComment text-center">{Config.labelComment}</th>
                                <th className="thOption text-center">{Config.labelOption}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users}
                        </tbody>
                    </table>
                </div>

                <br />

                <div className="text-center">
                    <div id="showimage"></div>
                    <Button id="buttonShowMore" className="button" color="info" size="sm" onClick={this.showMore.bind(this)}>{Config.buttonShowMore}</Button>
                </div>

                <br />

            </div>
        );
    }
}
export default App;
