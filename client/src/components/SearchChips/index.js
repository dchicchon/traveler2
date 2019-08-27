import React from 'react';
import { Col, Container } from "../Grid"

function SearchChip(props) {
    return (
        <div>
            <Container>

                    <Col size="s3">
                        <div className="chip disable" {...props}>{props.tag}<i className="close material-icons">close</i> </div>
                    </Col>
            </Container>
        </div>
    );

}

export default SearchChip;