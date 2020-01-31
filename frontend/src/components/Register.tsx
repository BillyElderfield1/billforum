import * as React from "react";
import { Card, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import { register } from "../state/user/actions";
import FormField from "./FormField";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import history from "../history";

function Register(){
    const dispatch = useDispatch();

    const equalTo = (ref: any, msg: any) => {
        return Yup.mixed().test({
          name: 'equalTo',
          exclusive: false,
          message: msg,
          params: {
            reference: ref.path,
          },
          test: function(value: any) {
            return value === this.resolve(ref);
          },
        });
      }

      Yup.addMethod(Yup.string, 'equalTo', equalTo);

    return(
        <Card className="bg-dark">
            <Card.Header><h3>Login</h3></Card.Header>
            <Card.Body>
                <Formik
                    initialValues={{email: "", userName: "", password: "", reEnter: ""}}
                    onSubmit={(values) =>{
                        dispatch(register({email: values.email, userName: values.userName, password: values.password}));
                        history.push("/forum");
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string()
                            .required("Email is required")
                            .email("Invalid Email"),
                        userName: Yup.string()
                            .max(30)
                            .required("UserName is required"),
                        password: Yup.string()
                            .min(8)
                            .matches(/(?=.*[0-9])/, "Must contain at least 1 numeric character")
                            .matches(/(?=.*[a-z])/, "Must contain at least 1 lowercase character")
                            .matches(/(?=.*[!@#$%^&])/, "Must contain at least 1 special character")
                            .required("Password is required"),
                        reEnter: (Yup.string() as any)
                            .equalTo(Yup.ref('password'), 'Passwords must match').required('Required')
                            .required("Please re-enter your password"),
                    })}
                    validateOnChange={false}
                    validateOnBlur={true}
                >
                    {({values, handleSubmit, handleChange, errors}: any) =>(
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <FormField display="Email" name="email" type="text" value={values.email} error={errors.email} handleChange={handleChange} />
                                <FormField display="UserName" name="userName" type="text" value={values.userName} error={errors.userName} handleChange={handleChange} />
                                <FormField display="Password" name="password" type="password" value={values.password} error={errors.password} handleChange={handleChange} />
                                <FormField display="Re-Enter" name="reEnter" type="password" value={values.reEnter} error={errors.reEnter} handleChange={handleChange} />
                                <Button type="submit" variant="primary">Login</Button>
                            </Form.Group>
                        </Form>
                    )}
                </Formik>
            </Card.Body>
        </Card>
    );
}

export default Register;