import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Container, Form, Button, Header, Dropdown } from "semantic-ui-react";
import styles from "./style.module.scss";

//redux
import { currentUser } from "../../redux/Features/UserSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [users, setUsers] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const router = useRouter();
  const dispatch = useDispatch()

  const currUser = useSelector((state)=> state.user)

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    try {
      let list = await axios.get("https://fakestoreapi.com/users");
      setUsers(...users, list.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleOptionClick = (e, { value }) => {
    setUserEmail(value.email);
    setUserPassword(value.password);
    dispatch(currentUser({id: value.id, name: value.name, email: value.email, username: value.username, password: value.password}))
  };

  console.log(currUser);

  const handleForm = (e) => {
    e.preventDefault();
    let { emailId, password } = document.forms[0];
    if (
      currUser != null &&
      emailId.value === currUser.email &&
      password.value === currUser.password
    ) {
      router.push(
        {
          pathname: "/products",
          query: {
            user: JSON.stringify(currUser),
          },
        },
        "/products"
      );
    } else {
      alert("Enter valid email id and password");
    }
  };

  const stateOptions = users.map((state, index) => {
    return {
      key: state.name.firstname + " " + state.name.lastname,
      text: state.name.firstname + " " + state.name.lastname,
      value: state,
    };
  });

  return (
    <Container className={styles.mainContainer}>
      <Container className={styles.subContainer}>
        <Header as="h1" color="grey" className={styles.bgHeader}>Login</Header>
        <Form onSubmit={handleForm}>
          <Form.Field>
            <label>Select User</label>
            <Dropdown
              placeholder="Select User"
              fluid
              selection
              options={stateOptions}
              onChange={handleOptionClick}
            />
          </Form.Field>
          <Form.Field>
            <label>Email ID</label>
            <input
              type="email"
              name="emailId"
              placeholder="Enter your email id"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </Form.Field>
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form>
      </Container>
    </Container>
  );
};

export default Login;
