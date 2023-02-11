
// Getting users and tasks from server, async functions
const todoList = document.querySelector('.todo__list');
const submitButton = document.querySelector('.todo__button');
const input = document.querySelector('.forms__new');
const author = document.querySelector('#forms__user li:first-child a')
let todos = [];
let users = [];

document.addEventListener('DOMContentLoaded', initApp);
submitButton.addEventListener('click', handleSubmit )

function initApp() {
  Promise.all([getTodos(), getUsers()]).then(values => { 
    [todos, users] = values;
    todos.forEach((todo) => printTodo(todo));
    // addTodos();
    addUsers();
    addClickOnModalList();
    // addClickOnSubmit();
    // selectTodoDelete();
  


  })
  

}

function handleSubmit(event) {
  event.preventDefault();
  console.log(author.id);
  console.log(input.value);
}

async function getTodos() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data = await response.json();
  return data
}



async function getUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  return data
}



function getUserName(userId) {
  const user = users.find(u => u.id === userId);
  return user.name
}

{/* <div class="item__box ">
  <img class="box__untoggle" src="images/check.svg" alt="">
    </div> */}
function printTodo({ id, userId, title, completed }) {
  const li = document.createElement('li');
  li.dataset = id;
  li.innerHTML = `
    <p class="item__text">${title}</p>
    <a href="#" class="item__delete">
        <img src="images/delete.svg" alt="">
    </a>
    <span class="item__author">${getUserName(userId)}</span>`;
  
  const status = document.createElement('input');
  status.className = 'item__box'
  status.type = 'checkbox';
  li.append(status);
  status.checked = completed;
  todoList.prepend(li);
}

async function createNewTodo(todo) {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    body: JSON.stringify(todo),
    headers: {
      'Content-Type': 'application/json',

    }

  })
  const todoId = await response.json();
  console.log(todoId);
  printTodo({id: todoId, ...todo})
}

// function addTodos() {
//   for (let i = 0; i < todos.length; i++) {
//     let createdLi = document.createElement('li');
//     let userId = todos[i].userId;
//     let todosTitle = todos[i].title;
    
//     // console.log(userId);
//     // console.log(createdLi);
//     // let createdLiWithClass = createdLi.classList.add('todo__item');
//     for (let i = 0; i < users.length; i++) {
//       if (userId == users[i].id) {
//         actualName = users[i].name;
//         document.querySelector('.todo__list').appendChild(createdLi);
//         document.querySelector('.todo__list li:last-child').innerHTML = `<div class="item__box ">
//     <img class="box__untoggle" src="images/check.svg" alt="">
//       </div>
//       <p class="item__text">${todosTitle}</p>
//       <a href="#" class="item__delete">
//           <img src="images/delete.svg" alt="">
//       </a>
//       <span class="item__author">${actualName}</span>`;
        
//       }
//     }
//   }
//   let boxItems = document.querySelectorAll('.item__box img')
//   for (let i = 0; i < boxItems.length; i++) {
//     boxItems[i].addEventListener('click', () => {
  
//       boxItems[i].classList.toggle('box__toggle');
//       let state;
//       if (todos[i].completed === true) {
//         state = false
//       }
//       else if (todos[i].completed === false) {
//         state = true
//       }
//       updateComplete(state, todos[i].id);
//     }
//     )
//   }
  
//   for (let j = 0; j < todos.length; j++) {
//     if (todos[j].completed === true) {
//       boxItems[j].classList.toggle('box__toggle')
//     }
//   }

 
//   }

//   async function updateComplete(statement, id) {
  
//       const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
//         method: 'PUT',
//         body: JSON.stringify({
//           completed: statement,
//           id: id,
//           headers: {
//             'Content-Type': 'application/json'
      
//           }
//         })
//       })
//       const todoId = await response.json();
//       console.log(todoId)
//     }
  


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


// function createNewTodo() {
//   let newTodo = {
//     userId: checkId(),
//     title: document.querySelector('.forms__new').value,
//   }
//  // console.log(newTodo);
//   return newTodo
// }

// async function sendNewTodo(todo) {
//   const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
//     method: 'POST',
//     body: JSON.stringify(todo),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//   const todoId = await response.json();
//   // console.log(todoId)
// }


// function checkId() {
//   let userName = document.querySelector('#forms__user li:first-child a').textContent;
//   for (let i = 0; i < users.length; i++) {
//     if (users[i].name == document.querySelector('#forms__user li:first-child a').innerText) {
//       return users[i].id
//     }
//   }
// }
//  function checkAndSend() {
//    sendNewTodo(createNewTodo());
//    let newTodoss = createNewTodo();

//   let createdLi = document.createElement('li');
//     let userId = newTodoss.userId;
//     let todosTitle = newTodoss.title;
  
//     // console.log(userId);
//     // console.log(createdLi);
//     // let createdLiWithClass = createdLi.classList.add('todo__item');
//     for (let i = 0; i < users.length; i++) {
//       if (userId == users[i].id) {
//         actualName = users[i].name;
//         let listFirstChild = document.querySelector('.todo__list li:first-child');
//       document.querySelector('.todo__list').insertBefore(createdLi, listFirstChild);
//       document.querySelector('.todo__list li:first-child').innerHTML = `<div class="item__box ">
//     <img class="box__untoggle" src="images/check.svg" alt="">
//       </div>
//       <p class="item__text">${todosTitle}</p>
//       <a href="#" class="item__delete">
//           <img src="images/delete.svg" alt="">
//       </a>
//       <span class="item__author">${actualName}</span>`;
        
//         let boxItem = document.querySelector('.item__box img');
//         boxItem.addEventListener('click', () => {
//           boxItem.classList.toggle('box__toggle')
//           let state;
//           if (todos[i].completed === true) {
//             state = false
//           }
//           else if (todos[i].completed === false) {
//             state = true
//           }
//           updateComplete(state, todos[i].id);
//         })
//     }
//     }
//     }


// function addClickOnSubmit() {
//   document.querySelector('.todo__button').addEventListener('click', checkAndSend)
// }

// function selectTodoDelete() {
//     document.querySelector('.item__delete').addEventListener('click', () => {
//       console.log('nn')
//       let moduleList = document.querySelector('.todo__list li');
//       moduleList[i].remove();
//       deleteTodo(todos[i].id);
//     })
//   }

// async function deleteTodo(id) {
//     const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//     const todoId = await response.json();
//    // console.log(todoId)
// }