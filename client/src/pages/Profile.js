import React, { Component } from "react"
import CardPanel from "../components/CardPanel"
import ProfileCard from '../components/ProfileCard'
import Button from "../components/Button"
import { Col, Row, Container } from "../components/Grid";
import TextInput from "../components/TextInput"
import HeadTitle from "../components/HeadTitle"

import GoogleMapReact from 'google-map-react'

import Background from "../assets/bg4.jpg"


import styled from 'styled-components';

// Utils
import API from "../utils/API";
import Post from "../components/Post";

const Wrapper = styled.div`
  position: absolute;

  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 15px solid red;
  border-radius: 50%;
  text-align: center;

  cursor: ${props => (props.onClick ? 'pointer' : 'default')};
  &:hover {
    z-index: 1;
  }
  `;

const Marks = ({ text }) => <div><Wrapper>{text}</Wrapper></div>;

const divStyle = {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '100%',
    backgroundAttachment: 'fixed'
};



export class Profile extends Component {
    state = {
        user_id: this.props.user_id,
        editBio: '',
        bio: '',
        image: '',
        posts: [],
        lat: this.props.lat,
        lng: this.props.lng,
        title: this.props.title,
        firstName: this.props.firstName
    }

    static defaultProps = {
        center: {
            lat: 37.77,
            lng: -122.43
        },
        zoom: 1
    };




    componentDidMount() {
        console.log("IS THIS WORKING")
        console.log("USER ID:", this.state.user_id)

        var id = this.state.user_id


        API.getUserPosts(id).then(res => {
            console.log("GET USER POSTS")
            console.log(res.data)

            this.setState({
                posts: res.data
            })

        })

        API.getProfile(id).then(res => {
            console.log("\nGET PROFILE\n")
            console.log(res.data)
            var profileData = res.data
            this.setState({
                bio: profileData.bio,
                image: profileData.image
                // profileImg: res.data.profileImg
            })
        })
    }

    handleFormSubmit = async event => {
        event.preventDefault();
        console.log("WE MADE IT TO THE FORM SUBMIT");
        let editData = {
            user_id: this.state.user_id,
            bio: this.state.editBio,
            image: this.state.image
        }
        console.log(editData)
        API.editUser(editData).then(response => console.log(response))
        window.location.reload()
    }
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div style={divStyle}>
                <Container>
                    <HeadTitle>{this.state.firstName}</HeadTitle>
                    <Row className="center">
                        <Col size="s6">

                            <img style={{ height: "300px", width: "400px" }} src={this.state.image} alt="Profile picture" />
                        </Col>
                    </Row>
                    <Row className='center'>
                        <Col size="s6">
                            <CardPanel>
                                <ProfileCard bio={this.state.bio} />
                                <TextInput name="editBio" placeholder="Edit Bio" value={this.state.editBio} onChange={this.handleInputChange} />
                                <Button onClick={this.handleFormSubmit}>Submit</Button>
                            </CardPanel>
                        </Col>
                    </Row>
                    <CardPanel>
                        <div style={{ height: '100vh', width: '100%' }}>
                            <GoogleMapReact
                                apiKey = {process.env.GOOGLE_API_KEY}
                                defaultCenter={this.props.center}
                                defaultZoom={this.props.zoom}
                                yesIWantToUseGoogleMapApiInternals
                            >
                                {console.log("\nWE MADE IT\n")}
                                {console.log(this.state.posts)}

                                {(this.state.posts.length) ? this.state.posts.map((post, i) =>
                                    <Marks
                                        key={i}
                                        id={post.user_id}
                                        lat={post.lat}
                                        lng={post.lng}
                                        text={post.title}
                                    />
                                ) : console.log("No Markers")}

                            </GoogleMapReact>
                        </div>
                    </CardPanel>

                </Container>
                <Container>
                    <Container>
                        {(this.state.posts.length) ?
                            this.state.posts.map((post, i) => (
                                <Row className='center'>

                                    <Post
                                        follow = {false}
                                        key={i}
                                        title={post.title}
                                        info={post.info}
                                        location={post.location}
                                        tag={post.tag}
                                        user_id={post.user_id}
                                        image={post.image}
                                    />
                                </Row>

                            )).reverse() : "No Posts"
                        }
                    </Container>

                </Container>
            </div>
        )
    }
}

export default Profile;



