
import React from 'react';
import Modal from 'react-modal'
import { useState } from 'react';
import './App.css';



function Windowmodal() {

  
  const [showModal,setShowModal]=useState(false);

  return (


    <div>
      <h1> Привет </h1>

    <button onClick={()=>{setShowModal(true)}}> окно </button>

      <Modal 
      ariaHideApp={false}
      isOpen={showModal} 
      onRequestClose={()=>{setShowModal(false)}}
      className='modal'
      >
        модальное окно

        <button onClick={()=>{}}  > да</button>
        <button onClick={()=>{}} > нет</button>
      </Modal>


    </div>


  )
}

export default Windowmodal