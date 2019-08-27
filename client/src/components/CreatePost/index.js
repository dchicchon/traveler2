import React, { Component } from 'react';
import CardPanel from '../CardPanel';
import { Col, Row, Container } from "../Grid";
import Button from "../Button";
import './style.css'

import M from 'materialize-css'

import axios from 'axios'

// Utils
import API from '../../utils/API'


class CreatePost extends Component {
    state = {
        info: "",
        title: "",
        location: "",
        url: '',
        file: '',
        fileName: '',
        tag: '',
        user_id: '',
        lat: '',
        lng: '',
        image: '',

        place: {}

    }

    componentDidMount() {
        M.AutoInit();
    }

    // AUTOCOMPLETE
    // showPlaceDetails(place) {
    //     this.setState({ place });
    // }


    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    handlePicture = async e => {
        // e.preventDefault();
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
        axios.post("/api/feed", formData)
            .then((res) => {
                console.log(res)
                // this.setState({
                //     url: res.data.imageURL
                // })
            })
    }

    addPost = async event => {
        event.preventDefault();
        console.log("Add post begins")
        console.log(this.state.url)
        var postData = {
            info: this.state.info,
            tag: this.state.tag,
            user_id: this.props.user_id,
            title: this.state.title,
            location: this.state.location,
            url: this.state.url,
            lat: this.state.lat,
            lng: this.state.lng,
        }
        console.log("POST DATA:", postData)
        API.newPost(postData)
            .then(response => {
                console.log(response)
                window.location.reload()
            })
    }
    render() {


        return (


            // IF MODAL WORKS WITH AUTOCOMPLETE
            <div>
                <Row>
                    <Container>
                        <Container>

                            {/* <CardPanel> */}
                            <Row className='center'>
                                {/* <h6>Post About a Trip!</h6> */}
                                <a className=" waves-light btn-large modal-trigger blue" href="#modal1">Create Post</a>

                            </Row>
                            {/* </CardPanel> */}
                        </Container>
                    </Container>
                </Row>
                <div id="modal1" className="modal">

                    {/* USER ID */}
                    <Row className='center'>
                        <h3 style={{ marginTop: '2rem' }}>Create a Post</h3>
                    </Row>
                    <Container>
                        <CardPanel>
                            <Container>
                                <form>
                                    {/* <Date className="col s6" /> */}
                                    {/* <TextInput>Where are you?</TextInput> */}
                                    {/* AUTOCOMPLETE TESTING */}
                                    <Row>
                                        <Col size="s6">
                                            <input placeholder="Location" id="location" name="location" type="text" className="validate" value={this.state.location} onChange={this.handleInputChange} />

                                        </Col>

                                        {/* <label htmlFor="location">Where are you?</label> */}
                                        {/* <TextInput className="col s6">Title</TextInput> */}
                                        <Col size="s6">
                                            <input placeholder="Title" id="title" name="title" type="text" className="validate" value={this.state.title} onChange={this.handleInputChange} />
                                        </Col>
                                        {/* <label htmlFor="title">Title</label> */}
                                    </Row>

                                    <Row>
                                        {/* <TextInput>Record Your Journey</TextInput> */}
                                        <Col size="s6">
                                            <input placeholder="Record your journey" id="description" name="info" type="text" className="validate" value={this.state.info} onChange={this.handleInputChange} />
                                        </Col>
                                        {/* COMMENTED OUT FOR NOW */}
                                        {/* <label htmlFor="description">Record?</label> */}
                                        <Col size="s6">
                                            <input placeholder="Tag" id="tag" name="tag" type="text" className="validate" value={this.state.tag} onChange={this.handleInputChange} />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col size="s6">
                                            <input placeholder="lat" id="lat" name="lat" type="text" className="validate" value={this.state.lat} onChange={this.handleInputChange} />
                                        </Col>
                                        <Col size="s6">
                                            <input placeholder="lng" id="lng" name="lng" type="text" className="validate" value={this.state.lng} onChange={this.handleInputChange} />
                                        </Col>
                                    </Row>




                                    {/* UPLOAD IMAGE */}
                                    <Row>
                                        <div className="file-field input-field">
                                            <div className="btn blue">
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

                                    <Button className="btn blue modal-close" onClick={this.addPost} >Submit</Button>
                                </form>
                            </Container>
                        </CardPanel>
                    </Container>

                </div>
            </div>


        )
    }

}




export default CreatePost;