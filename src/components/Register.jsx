import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useState } from "react";
import {
  FormControl,
  FormGroup,
  InputLabel,
  Input,
  FormHelperText,
} from "@mui/material";

function Register() {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [data,setData]=useState("")

  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidName, setIsValidName] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidRepeatPassword, setIsValidRepeatPassword] =
    useState(repeatPassword);

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    setIsValidPassword(passwordRegex.test(newPassword));
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    const nameRegex = /^[a-zA-Z\s]{3,30}$/;
    setIsValidName(nameRegex.test(newName));
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(newEmail));
  };
  const handleRepeatPasswordChange = (event) => {
    const newRepeatPassword = event.target.value;
    setRepeatPassword(newRepeatPassword);
    setIsValidRepeatPassword(newRepeatPassword === password);
  };

  const handleSubmit = () => {
    console.log("Form submitted");
    const data = 
      { Name: name ,
      Email: email ,
       Password: password }
    ;
    setData(data)
    console.log(data)
    alert("Registration Successful")

  };

  return (
    <div className="bg-blue-200 h-screen " >
      <header className=" font-bold p-6 shadow-lg flex items-center px-12" style={{ backgroundColor: '#5680E9' }}>
        <Link to="/">
          <img
            src="https://s3.ap-south-1.amazonaws.com/kalvi-education.github.io/front-end-web-development/Kalvium-Logo.png"
            alt=""
            className="h-9"
          />
        </Link>
        <div className="flex-grow text-center">
          <div className="font-bold text-2xl pr-24">Registration Form</div>
        </div>
      </header>
      <div className="flex justify-center mt-10 bg">
        <FormGroup className="flex justify-center align-center pt-10 w-1/3 bg-blue-300 p-10 leading-10 rounded-md">
          <div className="font-bold mb-4">Create Account</div>
          <FormControl style={{ marginBottom: "10px" }}>
            <InputLabel>Your Name</InputLabel>
            <Input onChange={handleNameChange} />
            <FormHelperText error={!isValidName}>
              Name atleast must contain 3 characters & no special characters
            </FormHelperText>
          </FormControl> 


          <FormControl style={{ marginBottom: "10px" }}>
            <InputLabel>Your Email</InputLabel>
            <Input onChange={handleEmailChange} />
            <FormHelperText error={!isValidEmail}>
              Email must be valid
            </FormHelperText>
          </FormControl>


          <FormControl style={{ marginBottom: "10px" }}>
            <InputLabel>Password</InputLabel>
            <Input type="password" onChange={handlePasswordChange} />
            <FormHelperText error={!isValidPassword}>
              Password must contain at least one character and one number.
            </FormHelperText>
          </FormControl>


          <FormControl style={{ marginBottom: "10px" }}>
            <InputLabel>Repeat Password</InputLabel>
            <Input type="password" onChange={handleRepeatPasswordChange} />
            <FormHelperText error={!isValidRepeatPassword}>
              Password does not match.
            </FormHelperText>
          </FormControl>
          

          <Button
            variant="contained"
            color="success"
            className="mt-2"
            disabled={
              !isValidName ||
              !isValidEmail ||
              !isValidRepeatPassword ||
              !isValidPassword
            }
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
        </FormGroup>
      </div>
    </div>
  );
}

export default Register;
