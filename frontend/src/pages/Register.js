import React from "react";



function Register() {
    
    const check_valid_email = (input) => {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input);
    }
    
    const [username, setUsername] = React.useState('');
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [validUSer, setValidUser] = React.useState(false);
    
    const registerUser = async () => {
        
        //check if the shit user passed in is valid bruh
        if(password !== confirmPassword || check_valid_email(email)){
            setValidUser(false);
        } 
        
    
        if (username && name && email && password){
            const res = await fetch(`${BACKEND_URL}admin/auth/register`);
        }
    
    }

    return (
    <section>
        <h2>Welcome to the Register page motherfucker</h2>
        <div name='register-container'>
            <form name='register-form'>
                <input name='username' type='text' placeholder='Enter Username'></input>
                <input name='name' type='text' placeholder='Enter Name'></input>
                <input name='email' type='text' placeholder='Enter Email'></input>
                <input name='password' type='password' placeholder='Enter Password'></input>
                <input name='password-confirm' type='password' placeholder='Confirm Password'></input>
            </form>
            <button name='Register' onClick={registerUser()}>Register</button>
            <span>
              {" "}
              Already have an account?
              <Link to={`/login`}>Login here</Link>
            </span>
            
            
            <Switch>
                <Route path={'/login'}>
                    <Login />
                </Route>
            </Switch>
        </div>
    </section>);

}

export default Register;