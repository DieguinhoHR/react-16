import React, { PureComponent } from 'react'
import styled from 'styled-components'
import firebase from 'firebase/app'
import 'firebase/auth'
import { Button, Grid } from '@material-ui/core'
import { ReactComponent as MainLogo } from './logo-react-zzaria.svg'

var config = {
  apiKey: 'AIzaSyDH6Rc4G7TiwwW8opFNfmKqhl81Aybst8c',
  authDomain: 'reactzzaria-100bb.firebaseapp.com',
  databaseURL: 'https://reactzzaria-100bb.firebaseio.com',
  projectId: 'reactzzaria-100bb',
  storageBucket: 'reactzzaria-100bb.appspot.com',
  messagingSenderId: '119610639488'
}
firebase.initializeApp(config)

class Login extends PureComponent {
  state = {
    isUserLoggedIn: false,
    user: null
  }

  componentDidMount () {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        isUserLoggedIn: !!user,
        user
      })
    })
  }

  login () {
    const provider = new firebase.auth.GithubAuthProvider()

    firebase.auth().signInWithRedirect(provider)
  }

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({
          isUserLoggedIn: false,
          user: null
        })
      })
  }

  render () {
    const { isUserLoggedIn, user } = this.state

    return (
      <Container>
        <Grid container justify='center' spacing={40}>
          <Grid item>
            <Logo />
          </Grid>

          <Grid item xs={12} container justify='center'>
            {isUserLoggedIn && (
              <>
                <pre>{user.displayName}</pre>
                <Button variant='contained' onClick={this.logout}>
                  Sair
                </Button>
              </>
            )}

            {!isUserLoggedIn && (
              <GitHubButton onClick={this.login}>
                Entrar com Github
              </GitHubButton>
            )}
          </Grid>
        </Grid>
      </Container>
    )
  }
}

const Container = styled.div`
  padding: 20px;
`

const Logo = styled(MainLogo)`
  width: 100%;
`

const GitHubButton = styled(Button).attrs({
  variant: 'contained',
  fullWidth: true
})`
  && {
    font-size: 20px;
    max-width: 480px;
    padding: 15px;
    text-transform: none;
  }
`

export default Login
