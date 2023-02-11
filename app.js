
// global variables


const todoList = document.querySelector('.todo__list');
const submitButton = document.querySelector('.todo__button');
const input = document.querySelector('.forms__new');
const author = document.querySelector('#forms__user li:first-child a');

let todos = [];
let users = [];



// events

document.addEventListener('DOMContentLoaded', initApp);
submitButton.addEventListener('click', handleSubmit)



// smoool logic 

async function getTodos() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    return data
  }
  catch (error) {
    alertError(error)
  }
}



async function getUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data
  }
  catch (error) {
    alertError(error)
  }
}



function getUserName(userId) {
  const user = users.find(u => u.id === userId);
  return user.name
}

function initApp() {
  Promise.all([getTodos(), getUsers()]).then(values => { 
    [todos, users] = values;
    todos.forEach((todo) => printTodo(todo));
    addUsers();
    addClickOnModalList();


  })
  

}

function handleSubmit(event) {
  event.preventDefault();
  if(author.id.length > 0 && input.value.length > 0) {
    // console.log(author.id);
    // console.log(input.value);
    createNewTodo({
      userId: Number(author.id),
      title: input.value,
      completed: false,

    })
  }

  else {
   throw new Error('invalid property of input') 
  }
}

function handleToDoChange() {
  const todoId = this.parentElement.dataset.id;
  const completed = this.checked;
  toggleTodoComplete(todoId, completed)
}

function handleClose() {
  const todoId = this.parentElement.dataset.id;
  deleteTodo(todoId);
}


function printTodo({ id, userId, title, completed }) {
  const li = document.createElement('li');
  li.dataset.id = id;
  li.innerHTML = `
    <p class="item__text">${title}</p>
    <span class="item__author">${getUserName(userId)}</span>`;
  
  
  const close = document.createElement('a');
  close.className = 'item__delete';
  close.innerHTML = `<img src="images/delete.svg" alt="">`
  li.prepend(close)


  const status = document.createElement('input');
  status.className = 'item__box'
  status.type = 'checkbox';
  li.append(status);
  status.checked = completed;


  status.addEventListener('change', handleToDoChange);
  close.addEventListener('click', handleClose);

  todoList.prepend(li);
}

async function createNewTodo(todo) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json',

      }

    })
    const todoId = await response.json();
    console.log(todoId);
    printTodo({ id: todoId, ...todo })
  }
  catch (error) {
    alertError(error)
  }
}

function addUsers() {
  for (let i = 0; i < users.length; i++) {
    let createdLi = document.createElement('li');
    document.querySelector('.modal__list').appendChild(createdLi);

    document.querySelector('.modal__list li:last-child').innerHTML = `<a id="${users[i].id}"href="#">${users[i].name}</a>`;
  }
}




function addClickOnModalList() {
  let listElement = document.querySelectorAll('.modal__list li a');

// console.log(firstElem.textContent)
  for (let i = 0; i < listElement.length; i++) {
    //console.log(listElement[i]);
    listElement[i].addEventListener('click', () => {
      let firstElem = document.querySelector('#forms__user li:first-child a');
      firstElem.id = listElement[i].id
      // console.log(listElement[i].id)
      firstElem.innerHTML =  ` ${listElement[i].textContent} <img src="images/expand_more.svg" alt="">`;
    });
  }

}


function removeTodo(todoId) {
  todos = todos.filter(todo => todo.id !== todoId);
  const todo = todoList.querySelector(`[data-id="${todoId}"]`);
  todo.querySelector('input').removeEventListener('change', handleToDoChange);
  todo.querySelector('.item__delete').removeEventListener('click', handleClose);
  todo.remove()
}

async function toggleTodoComplete(todoId, completed) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
      method: 'PATCH',
      body: JSON.stringify({ completed }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const resp = await response.json();
    console.log(resp)

    if (!response.ok) {
        throw new Error('problems with server, please try later')
    }
  }
  catch (error) {
    alertError(error)
  }
}

async function deleteTodo(todoId) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })


    if (response.ok) {
      removeTodo(todoId)
    }
    else {
        throw new Error('problems with server, please try later')
    }
  }
  catch (error) {
    alertError(error)
  }
}

function alertError(error) {
  alert(error.message)
}