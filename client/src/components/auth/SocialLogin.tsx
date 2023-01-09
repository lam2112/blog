import React from 'react';
import { useDispatch } from 'react-redux';
// import {GoogleLogin} from 'react-google-login-lite';
// import { GoogleLoginResponse} from 'react-google-login-lite';
import {FacebookLogin, FacebookLoginAuthResponse} from 'react-facebook-login-lite';
// import { googleLogin } from '../../redux/actions/authAction';
  import { facebookLogin } from '../../redux/actions/authAction';



const SocialLogin = () => {
  const dispatch = useDispatch()

  // const onSuccess = (googleUser: GoogleLoginResponse) => {
  //   const id_token = googleUser.getAuthResponse().id_token;
  //   dispatch(googleLogin(id_token))
  // }

  const onFBSuccess = (response: FacebookLoginAuthResponse) => {
    const {accessToken, userID} = response.authResponse

    dispatch(facebookLogin(accessToken, userID))
  }



  return (
    <>
      {/* <div className='my-2'>
        <GoogleLogin 
          client_id='221070210166-je3njpvo5b6drofh88l2l5il9jthpnh9.apps.googleusercontent.com'
          cookiepolicy='single_host_origin'
          onSuccess={onSuccess}
          theme='light'
          isSignedIn={true}
        />
      </div> */}

      <div className='my-2'>
        <FacebookLogin 
        appId='566079298700395'
        onSuccess={onFBSuccess}
        />
      </div>

    </>
  )
}

export default SocialLogin