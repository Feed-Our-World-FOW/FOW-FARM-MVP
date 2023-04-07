import React, { ChangeEvent, useState, FormEvent } from 'react'
import Image from 'next/image'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { LoginFormInterface } from '../../interface/AllFarmsInterface'
import Swal from 'sweetalert2'
import { loginMethod } from '../../components/marketplace/API'



function LoginPage() {
  const [signupForm, setSignupForm] = useState<LoginFormInterface>({
    email: '',
    password: ''
  })
  const [disabled, setDisabled] = useState<boolean>(false)
  const expireTime = process.env.NEXT_PUBLIC_TOKEN_EXPIRE_TIME || 0

  const theme = createTheme();

  const handleClick = async () => {
    setDisabled(true)
    try {
      const login = await loginMethod({
        email: signupForm.email,
        password: signupForm.password
      })

      const token = login.data.token
      const expire = new Date().getTime() + Number(expireTime)
      localStorage.setItem("Token", JSON.stringify({ value: `${token}`, expires: expire }))

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Successfully signed in',
        showConfirmButton: false,
        timer: 1500
      })

      window.location.replace('/')
      
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error.response.data.message}`,
        footer: '<a href="">Please submit the sign up form again</a>'
      })
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setSignupForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const styles = {
    round: `w-32 h-32 rounded-full bg-white drop-shadow-lg`,
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className={styles.round}>
           <Image
            alt=''
            width={100}
            height={100}
            src={'/images/fow.png'}
            className='w-full h-full'
          />
          </div>

          {/* <Typography component="h5" variant="h5">
            Sign in
          </Typography> */}
          <Box component="form" onSubmit={handleClick} noValidate sx={{ mt: 1 }}>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={signupForm.email}
              onChange={handleInputChange}
            />           
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={signupForm.password}
              onChange={handleInputChange}
            />
            <Button
              // type="submit"
              disabled={disabled}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className='bg-dark-blue'
              onClick={handleClick}
            >
              Log In
            </Button>
            <Grid container  className='mb-10'>
              <Grid item>
                <Link href="/Auth/SignupPage" variant="body2">
                  {"Don't have an account? Sign up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    )
  }

  export default LoginPage
  