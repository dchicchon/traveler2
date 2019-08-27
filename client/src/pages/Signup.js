import React, { Component } from "react";
import { Row, Container } from "../../components/Grid";
import Button from '../../components/Button'
import axios from 'axios'

import { Link } from 'react-router-dom'


class Signup extends Component {
    state = {
        email: "",
        password: '',
        passwordConfirm: '',
        firstName: '',
        lastName: '',

        file: '',
        fileName: '',
        url: '',

    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    handlePicture = async e => {


        var uniqueName = e.target.files[0].name
        console.log(uniqueName)
        this.setState({
            file: e.target.files[0],
            url: `https://travelerdb.s3-us-west-1.amazonaws.com/${uniqueName}`,
            fileName: uniqueName
        })

        let formData = new FormData();
        // formData.append("imageName", fileName + Date.now())
        formData.append('imageData', e.target.files[0])
        formData.append("imageName", uniqueName)
        axios.post("/api/user", formData)
            .then((res) => {
                console.log(res)
                // this.setState({
                //     url: res.data.imageURL
                // })
            })
    }

    handleFormSubmit = async event => {
        event.preventDefault();

        if (this.state.firstName && this.state.lastName && this.state.email && this.state.password && this.state.passwordConfirm) {
            if (this.state.password === this.state.passwordConfirm) {
                // console.log(this.state.uniqueName)
                await fetch("/auth/signup", {
                    method: "POST",
                    credentials: "include",
                    mode: "cors",
                    body: JSON.stringify({
                        password: this.state.password,
                        email: this.state.email,
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        image: this.state.url
                    }),
                    headers: new Headers({
                        "Content-Type": "application/json"
                    })
                })
                    .then(response => {
                        window.location.href = "/"
                    })
                    .catch(err => console.log(err))

                this.setState({
                    email: '',
                    password: '',
                    passwordConfirm: '',
                    firstName: '',
                    lastName: '',
                    url: ''
                });

            } else {
                console.log("Make sure that your passwords match")
            }
        } else {
            console.log("Make sure to fill out all fields")
        }
    }

    render() {
        return (
            <div>
                {/* <UnsplashApiLogin /> */}
                <Container>
                    <div className="card-panel center" id="cardStyleSignup">
                        <h4 style={{ marginBottom: '0' }}>Sign Up</h4>
                        {/* <div className="row"> */}
                        <form className="col s12">

                            <Row>
                                <div className="input-field col s6">
                                    <input id="firstName" className="validate" type="text" name="firstName" value={this.state.firstName} onChange={this.handleInputChange} />
                                    <label htmlFor="firstName">First Name</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="lastName" className="validate" type="text" name="lastName" value={this.state.lastName} onChange={this.handleInputChange} />
                                    <label htmlFor="lastLame">Last Name</label>
                                </div>
                            </Row>
                            <Row className='mb-1'>
                                <div className="input-field col s12">
                                    <input id="email" className="validate" type="email" name="email" value={this.state.email} onChange={this.handleInputChange} />
                                    <label htmlFor="email">Email</label>
                                </div>
                            </Row>

                            <Row className='mb-1'>
                                <div className="input-field col s12">
                                    <input id="password" className="validate" type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                                    <label htmlFor="password">Password</label>
                                </div>
                            </Row>
                            <Row className='mb-1'>
                                <div className="input-field col s12">
                                    <input id="passwordConfirm" className="validate" type="password" name="passwordConfirm" value={this.state.passwordConfirm} onChange={this.handleInputChange} />
                                    <label htmlFor="passwordConfirm"> Confirm Password</label>
                                </div>
                            </Row>

                            <Row>

                                <div className="file-field input-field">
                                    <div className="btn blue" id='signUP'>
                                        <span>Upload Photo</span>
                                        <input
                                            type='file'
                                            onChange={this.handlePicture}
                                        />
                                        {/* <input type='file' onChange={this.handlePicture} ref={(ref) => { this.uploadInput = ref }} /> */}
                                    </div>
                                    <div className="file-path-wrapper">
                                        <input className="file-path validate" />
                                    </div>
                                </div>

                            </Row>

                        </form>
                        {/* </div> */}
                        <Row className="center" id='loginRe'>
                            <Link to="/">
                                Already have an account? Login here.
                            </Link>
                        </Row>
                        <Row>
                            <Button onClick={this.handleFormSubmit}>Signup <i className="material-icons right">send</i></Button>

                        </Row>

                    </div>
                </Container>

            </div >

        )
    }

}

export default Signup;