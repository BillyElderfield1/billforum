import * as React from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../state/user/actions";
import { Formik } from "formik";
import { LoginValues } from "./models/LoginValues";
import history from "../history";
import * as Yup from "yup";
import FormField from "./FormField";
import { useState } from "react";

function Login(){
    const dispatch = useDispatch();
    const [ loginError, setLoginError ] = useState("");

    return(
        <Card className="bg-dark">
            <Card.Header><h3>Login</h3></Card.Header>
            <Card.Body>
                <Formik
                    initialValues={{email: "", password: ""} as LoginValues}
                    onSubmit={async (values: LoginValues, { setSubmitting }) =>{
                        const res = await dispatch(login(values)) as any;
                        if(res.type === "LOGIN_FAIL"){
                            console.log(res)
                            return setLoginError("Incorrect Email/Password combination");
                        }
                        return history.push("/forum");
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string()
                            .required("email is required")
                            .email("Invalid Email"),
                        password: Yup.string()
                            .required("password is required")
                    })}
                    validateOnChange={false}
                    validateOnBlur={true}
                >
                    {({values, handleSubmit, handleChange, errors}: any) =>(
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <FormField display="Email" name="email" type="text" value={values.email} error={errors.email} handleChange={handleChange} />
                                <FormField display="Password" name="password" type="password" value={values.password} error={errors.password} handleChange={handleChange} />
                                {loginError &&
                                    <div className="text-center text-danger mb-2">
                                        {loginError}
                                    </div>
                                }
                                <Button type="submit" variant="primary">Login</Button>
                            </Form.Group>
                        </Form>
                    )}
                </Formik>
            </Card.Body>
        </Card>
    );
}

export default Login;