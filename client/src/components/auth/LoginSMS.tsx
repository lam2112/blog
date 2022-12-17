import React, {useState} from 'react'

const LoginSMS = () => {
    const [phone, setPhone] = useState('')

  return (
        <form>
            <div className='from-group mb-3'>
                <label htmlFor="phone" className='form-label'>Phone number</label>
                <input type="text" className='form-control' name="phone" id="phone" value={phone} onChange={e => setPhone(e.target.value)} />

            </div>
            <button type='submit' className='btn btn-dark w-100' disabled={phone ? true : false}>
                Login        
            </button>

        </form>
    )
}

export default LoginSMS