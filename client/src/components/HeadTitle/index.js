import React from 'react';
import { Col, Row, Container } from "../Grid"

function HeadTitle(props) {
    return (

        <div>

            <Container>
                <Row>
                    <Col size="s4"> </Col>

                    <div className="row center">
                        <div className="input-field col s4">
                            <h3 className="grey-text text-darken-3" >{props.children}</h3>
                        </div>
                    </div>
                    <Col size="s4"> </Col>
                </Row>
            </Container>
        </div>

    );

}

export default HeadTitle;