import React, { Component } from "react";
import CardPanel from "../components/CardPanel"
import Post from "../components/Post"
import { Row, Container } from "../components/Grid";
import CreatePost from './../components/CreatePost';
import API from '../utils/API'
import HeadTitle from "../components/HeadTitle";
import Background from "../assets/bg10.jpg"


// Import Materialize
import 'materialize-css/dist/css/materialize.min.css';

const divStyle = {
    backgroundImage: `url(${Background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed'
};

const styles = {
    left: '0',
    bottom: '0',
    marginTop: '30%',
    width: '100%',
    backgroundColor: '#2196f3',
    color: 'white',
    textAlign: 'center',
    opacity: '1'
}



class Feed extends Component {
    state = {
        user_id: this.props.user_id,
        email: '',
        firstName: this.props.firstName,
        lastName: '',
        image: '',
        // followIds: {},
        followPosts: {},
        place: {}

    }


    showPlaceDetails(place) {
        this.setState({ place });
    }

    async componentDidMount() {
        console.log("BRING IN FOLLOWERS")
        API.getFollowPosts(this.state.user_id).then(res => {
            console.log("\nFOLLOWING POST ARRAY")
            console.log(res)
            this.setState({
                followPosts: res.data
            })

        })


    }



    render() {

        const AddressDetails = props => {
            return (
                <div>
                    <pre>{JSON.stringify(props.place, null, 2)}</pre>
                </div>
            )
        };

        return (
            <div style={divStyle}>

                <HeadTitle></HeadTitle>

                <Container>

                    <CreatePost user_id={this.state.user_id} />
                    <Container>
                        {(this.state.followPosts.length) ?
                            this.state.followPosts.map((post, i) => (
                                <Row className="center">

                                    <Post
                                        key={i}
                                        title={post.title}
                                        info={post.info}
                                        location={post.location}
                                        tag={post.tag}
                                        user_id={post.user_id}
                                        image={post.image}

                                    />
                                </Row>

                            )) : "No Posts"
                        }
                    </Container>
                </Container>
                <CardPanel style={styles}></CardPanel>
            </div>
        )

    }
}

export default Feed;