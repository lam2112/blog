import React from 'react';
import { useDispatch } from 'react-redux';
import {GoogleLogin, GoogleLoginResponse} from 'react-google-login-lite';
import { googleLogin } from '../../redux/actions/authAction';



const SocialLogin = () => {
  const dispatch = useDispatch()

  const onSuccess = (googleUser: GoogleLoginResponse) => {
    const id_token = googleUser.getAuthResponse().id_token;
    dispatch(googleLogin(id_token))
  }
  
  const onFailure = (err: any) => {
    console.log(err);
  }

  return (
    <div className='my-2'>
      <GoogleLogin 
        client_id='221070210166-je3njpvo5b6drofh88l2l5il9jthpnh9.apps.googleusercontent.com'
        cookiepolicy='single_host_origin'
        onSuccess={onSuccess}
        onFailure={onFailure}
        theme='light'
        isSignedIn={true}
        
      />
      window.
    </div>
  )
}

export default SocialLogin