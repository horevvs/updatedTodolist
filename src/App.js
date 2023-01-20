
import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import BackspaceSharpIcon from '@mui/icons-material/BackspaceSharp';


function App() {
  const [todo, setTodo] = useState([])
  useEffect(() => {
    fetch('https://todo.soprano.biz/note/')
      .then((response) => response.json())
      .then((data) => setTodo(data))
  }, [])


  useEffect(() => {

  }, [])




  //
  // const ref = useRef(null);
  // const checkbox = useRef(null);
  //
  const [inputs, setInputs] = useState([])
  const [list, setList] = useState([])
  const [edit, setEdit] = useState([])
  // const [returnedit, setReturnedit] = useState([])
  const [returnara, setReturnara] = useState([])


  // добавление элемента с интпута //



  const addfrominput = () => {
    let random = Math.random().toFixed(2) * 100
    setList([...list, { value: inputs, id: random }])
    setTodo([...todo, { name: inputs, id: random }])
    // просто складываем сюда тоже самое что и в лист
    // setReturnedit([...returnedit, { value: inputs, id: random }])
    // ищем последний элемент масссива, чтобы  положить  отправить его на сервер.

    let index = list.at(-1);
    let obj = {
      name: index.value
    }

    fetch('https://todo.soprano.biz/note',
      {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: { 'Content-type': 'application/json; charset=UTF-8', },
      }
    )
    document.location.reload();
  }

  //  изменение отредактированной строки //
  const send = (id, name) => {
    let obj = {
      name: `${edit}`,
    }
    let objtask = {
      subject: `${name}`,
      note_id: id,
      resolved: false
    }

    for (let i = 0; i < todo.length; i++)
      if (todo[i].id === id) {
        let thisname = todo[i].id
        let url = `https://todo.soprano.biz/note/${thisname}`
        fetch(url, {
          method: 'PUT',
          body: JSON.stringify(obj),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          }
        })

        fetch('https://todo.soprano.biz/task',
          {
            method: 'POST',
            body: JSON.stringify(objtask),
            headers: { 'Content-type': 'application/json; charset=UTF-8', },
          }
        )
        document.location.reload();
      }
  }

  // удаление заметки//
  const deletehandler = (id) => {
    fetch(`https://todo.soprano.biz/note/${id}`, {
      method: 'DELETE',
    });
    document.location.reload();
  }

  //  подтверждение выполнения//
  const handle = (id) => {
    alert(id)

    let a = todo
    for (let i = 0; i < todo.length; i++)
      if (todo[i].id == id) {
        a[i].name = 'выполнено'
        setList(a)


        let obj = {
          name: a[i].name,
        }
        let thisname = todo[i].id

        let url = `https://todo.soprano.biz/note/${thisname}`
        fetch(url, {
          method: 'PUT',
          body: JSON.stringify(obj),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          }
        }
        )
      
        
  
      
      




      }
  }

  let returndeleted = (id) => {

    // в состояние ложим фетч запрос
    fetch('https://todo.soprano.biz/task/')
      .then((response) => response.json())
      .then((data) => setReturnara(data))
    console.log(id)

    // проверяем что старый запрос появился

    // перебираем масссив ищем старое имя котрое было по id  в note_id
    // for (let i = returnara.length - 1; i < returnara.length; i--)
    for (let i = returnara.length - 1; i > 0; i--)
      if (returnara[i].note_id === id) {
        let b = returnara[i].subject
        let a = returnara[i].note_id
        for (let c = 0; c < todo.length; c++)
          if (todo[c].id === a) {
            todo[c].name = b
            console.log(a + b)
          }
      }
    //document.location.reload();
  }

  return (
    <div >
         <div className='position'>
        <TextField id="standard-basic" label="заметки" variant="standard" value={inputs} onChange={(e) => setInputs(e.target.value)} />
        <Button onClick={addfrominput} variant="contained" endIcon={<SendIcon />}> Send  </Button>
      </div>
      {todo.map((item) => {
        return (
          <div key={item.id} >
            <div className='flow positionreder'>  <p onClick={() => { handle(item.id); }}> {item.name} </p> <div>
              <button onClick={() => deletehandler(item.id)}> удалить</button>
            </div>
              <div className='opasity'>
                <input type="text" placeholder='add text' value={edit} onChange={(e) => setEdit(e.target.value)} />
                <Button onClick={() => send(item.id, item.name)} >  edit </Button>
                <Tooltip title="return edit">
                  <IconButton onClick={() => returndeleted(item.id, item.name)} >
                    <BackspaceSharpIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default App








