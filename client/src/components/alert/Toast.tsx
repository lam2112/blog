import React from 'react'
import { useDispatch } from 'react-redux'
import {ALERT} from '../../redux/types/alertType'

interface IProps {
  title: string,
  body?: string | string[]
  bgColor: string
}

const Toast = ({title, body, bgColor}: IProps ) => {
  const dispatch = useDispatch()
  const handClose = () => {
    dispatch({ type: ALERT, payload: {}})
  }

  return (
    <div className={`toast show position-fixed text-light ${bgColor}`} style={{ top: '5px', right: '5px', zIndex: 50, minWidth: '200px' }}>
      <div className={`toast-header text-light ${bgColor}`}>
        <strong className="me-auto">{title}</strong>
        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={handClose}/>

      </div>
      <div className="toast-body">
        {
          typeof (body) === 'string' ? body :
            typeof(body) != "undefined" ?
            <ul>
              {
                body.map((text, index) => (
                  <li key={index}>{text}</li>
                ))
              }
            </ul>
            : body
        }
      </div>
    </div>
  )
}

export default Toast;