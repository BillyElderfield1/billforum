import * as React from "react";
import { Form, Col } from "react-bootstrap";

function FormField(props: {display: string; name: string; type: string; value: string; handleChange: () => void; error: string;}){
    const { display, name, type, value, handleChange, error } = props;

    return(
        <Form.Row className="mb-3 text-right">
            <Form.Label className="col-4 mr-1 pt-1">{display}:</Form.Label>
            <Col className="col-lg-5 col-6">
                <input className="form-control" name={name} type={type} value={value} onChange={handleChange}/>
                {error &&
                    <div className="text-left text-danger">
                        {error}
                    </div>
                }
            </Col>
        </Form.Row>
    );
}

export default FormField;