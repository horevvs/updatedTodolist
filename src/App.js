
import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import BackspaceSharpIcon from '@mui/icons-material/BackspaceSharp';






function App() {

  const [todo, setTodo] = useState([])

  useEffect(() => {
    fetch('https://todo.soprano.biz/note/')
      .then((response) => response.json())
      .then((data) => setTodo(data))
 
  }, [])

 console.log(todo)


  // подтвержедние удаления //
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //
  const ref = useRef(null);
  const checkbox = useRef(null);

  const [inputs, setInputs] = useState([])
  const [list, setList] = useState([])
  const [edit, setEdit] = useState([])
  const [returnedit, setReturnedit] = useState([])





  // добвление элемента с интпута //
  const addfrominput = () => {
    
    let random = Math.random().toFixed(2) * 100
    setList([...list, { value: inputs, id: random }])
    // просто складываем сюда тоже самое что и в лист
    setReturnedit([...returnedit, { value: inputs, id: random }])
    // ищем последний элемент масссива, чтобы  положить  отправить его на сервер.
    console.log(list.length)
    let index = list.at(-1);
    let obj = {
      name: index.value
    }

    fetch('https://todo.soprano.biz/note', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
   document.location.reload();
  }

  //  изменение отредактированной строки 
  const send = (id, value) => {
    let obj = {
      value: `${edit}`,
      id: id,
    }
    // console.log(obj.id)


    // находим айдишиник нашего  измняемого элемента  
    // for (let i = 0; i < returnedit.length; i++)
    //   if (returnedit[i].id === obj.id) {
    //     alert('find returnedit ')
    //     let findreturneditname = returnedit[i].value
    //     console.log(findreturneditname + 'это он')
    //   }



    for (let i = 0; i < list.length; i++)
      if (list[i].id !== obj.id) {
      }
      else {
        list[i].value = obj.value
      }

    let newarray = list.filter((item) => item.value !== value)
    setList(newarray)
    // console.log(list)
    // console.log(returnedit)

    // попадет в фетч чтобы потом участвовать в пут запросе 
    let obj2 = {
      name: obj.value
    }


    // отюда не понятно
    fetch('https://todo.soprano.biz/note')
      .then((response) => response.json())
      .then((data) => {
        // взяли наш массив в который складывем изначальные туду
        for (let i = 0; i < returnedit.length; i++)
          // фильтруем если наши айди совпадабт получим изначально имя которое было в пос запросе
          if (returnedit[i].id === obj.id) {
            // alert('find returnedit ')
            // получаем результат  имя  которое изначально было в пост запросе
            let findreturneditname = returnedit[i].value
            // console.log(findreturneditname + 'это он точно')

            // получсем наш большой массив с бэкэнда
            for (let i = 0; i < data.length; i++)
              // фильтруем если имя в большом массиве рано имени которое было в переменной  findreturneditname
              if (data[i].name === findreturneditname) {
                // alert('find')
                // alert(data[i].id )
                let thisnewLet = data[i].id
                // console.log(thisnewLet + 'это он')
                let url = `https://todo.soprano.biz/note/${thisnewLet}`
                fetch(url, {
                  method: 'PUT',
                  body: JSON.stringify(obj2),
                  headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                  },
                })
              }
          }
      }
      )


    // // сюда доюавить то что должно попадать с редактирования
    // let idName = 299;
    // let url = `https://todo.soprano.biz/note/${idName}`
    // // здесб вместо 299 должен попадать то айдишник   в котором было записано изначально//
    // fetch(url, {
    //   method: 'PUT',
    //   body: JSON.stringify(obj2),
    //   headers: {
    //     'Content-type': 'application/json; charset=UTF-8',
    //   },
    // })
  }

  // удаление заметки
  const deletehandler = (id) => {
    let newarray = list.filter((item) => item.id !== id)
    setList(newarray)


    fetch('https://todo.soprano.biz/note')
      .then((response) => response.json())
      .then((data) => {





        // взяли наш массив в который складывем изначальные туду
        for (let i = 0; i < returnedit.length; i++)
          // фильтруем если наши айди совпадабт получим изначально имя которое было в пос запросе
          if (returnedit[i].id === id) {
            // alert('find returnedit ')
            // получаем результат  имя  которое изначально было в пост запросе
            let findreturneditname = returnedit[i].id
            console.log(findreturneditname + 'это он точно')

            // получсем наш большой массив с бэкэнда
            for (let i = 0; i < data.length; i++)
              // фильтруем если имя в большом массиве рано имени которое было в переменной  findreturneditname
              if (data[i].id === findreturneditname) {
                alert('find')
                alert(data[i].id)
                let thisnewLet = data[i].id
                console.log(thisnewLet + 'это он')
                let url = `https://todo.soprano.biz/note/${thisnewLet}`
                fetch(url, {
                  method: 'DELETE',
                })
              }
          }
      }
      )






    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then((response) => response.json())
      .then((json) => console.log(json)



      );




    setOpen(false);
  }

  // толи нужен толи нет потом допилить
  let check = (id) => {
    // alert(id)
    // checkbox.current.style.textDecoration = 'line-through'
  }


  let returndeleted = (id, value) => {
    let obj = {
      ids: id,
    }

    for (let i = 0; i < returnedit.length; i++)
      if (returnedit[i].id === obj.ids) {
        list[i].value = returnedit[i].value
        let newarray = list.filter((item) => item.value !== value)
        setList(newarray)
      }
  }
  return (
    <div >
      <div className='position'>
        <TextField id="standard-basic" label="заметки" variant="standard" ref={ref} value={inputs} onChange={(e) => setInputs(e.target.value)} />
        <Button onClick={addfrominput} variant="contained" endIcon={<SendIcon />}> Send  </Button>
      </div>
      {todo.map((item) => {
        return (
          <div key={item.id} >
            <div className='flow positionreder'> <input type="checkbox" onClick={() => check(item.id)} ref={checkbox}  ></input>
              <p  > {item.name} </p>
              <div>
                <Tooltip title="Delete">
                  <IconButton onClick={handleClickOpen} >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Dialog className='modalDialog '
                  open={open}
                  onClose={handleClose}
                >
                  <DialogContent >
                    <DialogContentText className='modal'>
                      Вы точно  хотите удалить заметку?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button color="warning" onClick={() => deletehandler(item.id)}
                    >Да</Button>
                    <Button onClick={handleClose} autoFocus>
                      Нет
                    </Button>
                  </DialogActions>
                </Dialog>


              </div>




              <div className='opasity'>
                <input type="text" placeholder='add text' value={edit} onChange={(e) => setEdit(e.target.value)} />
                <Button variant="text" onClick={() => send(item.id)} >  edit </Button>
                <Tooltip title="return edit">
                  <IconButton onClick={() => returndeleted(item.id)} >
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








