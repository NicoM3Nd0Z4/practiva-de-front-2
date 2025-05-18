import { useNavigate } from 'react-router-dom';
import React, {useState} from 'react'
import { Box, Button, TextField } from '@mui/material'

const Login = ({ login }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onsubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Los campos no pueden estar vacios");
      return;
    }

    try {
      const isLogin = await login({ username, password });
      if (isLogin) {
        setUsername("");
        setPassword("");
        navigate("/items");
      } else {
        alert("El inicio de sesión falló");
      }
    } catch (error) {
      alert("Error al intentar iniciar sesión");
      console.error(error);
    }
    
  };

  return (
    <form onSubmit={onsubmit}>
      <Box
        margin={"auto"}
        flexDirection={"column"}
        display={"flex"}
        width={400}
        marginTop={"20px"}>
          <TextField
            label={"Username"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            marginTop={"10px"}
            id="margin-normal" margin="normal"
          >

          </TextField>
          <TextField
            label={"Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="margin-normal" margin="normal"
          >

          </TextField>
          <Button
            type={"submit"}
            variant={"contained"}
            color={"primary"}
            fullWidth
            id="margin-normal" margin="normal"
          >
            Login
          </Button>
        </Box>
    </form>
  )
}

export default Login