import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const socket = io('http://localhost:7000')

const userName = 'Kullanıcı ' + parseInt(Math.random() * 10);

function App() {

  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);


  useEffect(() => {
    socket.on('message', payload => {
      setChat([...chat, payload])
    })
  })

  const sendMessage = e => {
    e.preventDefault()
    socket.emit('message', { userName, message })
    setMessage('');
  }
  return (
    <div className="container">
      <div className='row'>
        <div className='col-12'>
          <h1>Sohbet Uygulamasına Hoş Geldiniz!</h1>

          <Form onSubmit={sendMessage}>
            <Form.Group className="mb-3" >
              <Form.Control as="textarea" placeholder='Mesajınızı Giriniz' className='w-100 mb-3 ' style={{ resize: 'none  ' }} rows={3} value={message} onChange={(e) => { setMessage(e.target.value) }} onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null} required />
              <Button type='submit' variant='primary' className='w-100'>Gönder</Button>
            </Form.Group>

          </Form>
        </div>
        <div className='row' >
          <div className='col-12'>
            <div style={{ height: '250px', overflowY: 'scroll' }}>
            {chat.map((payload, index) => {
              return (
                <h3>{payload.userName}: <span>{payload.message}</span></h3>
              )
            })}
          </div>
         </div>
        </div>

      </div>
    </div>
  );
}

export default App;
