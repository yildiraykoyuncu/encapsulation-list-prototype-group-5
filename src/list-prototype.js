'use strict';

/* List Prototype

  This object will contain all the methods for your many lists
  in your app you will use Object.create(listPrototype) to create many lists
  it will include all the functions you need for a list:
    logic
    views
    handlers

  You will need to use binding (or arrow functions) to connect handlers to views

*/
class Todo {
    constructor(text) {
        this.text = text;
        this.completed = false;
    }
};

class TodoList {
    constructor(name) {
        this.name = name;
    }


    _state = {
        todos: []
    }

    get state() {
        return this._state;
    }

    set state(newState) {
        this._state = newState
    }

    renderAddTodoInput() {
        //container
        const div = document.createElement('div');
        div.classList.add('container');
        div.id = this.name;

        //page title
        const h1 = document.createElement('h1');
        h1.textContent = this.name;

        //toggle button
        const toggleButton = document.createElement('button');
        toggleButton.id = 'toggle-button'
        toggleButton.innerText = 'V'


        //input field

        const input = document.createElement('input');
        input.type = 'text';

        // add todos div
        const todosDivEl = document.createElement('div');
        todosDivEl.id = `${this.name}-todos`;

        //append to div
        div.appendChild(h1);
        div.appendChild(toggleButton)
        div.appendChild(input);
        div.appendChild(todosDivEl);

        return div;

    }

    renderTodos(todosArr) {
        const ulEl = document.createElement('ul');


        for (const todo of todosArr) {
            //create <li>
            const liEl = document.createElement('li');
            liEl.classList.add('todo-item');
            liEl.setAttribute('data-index', todosArr.indexOf(todo));


            //Create and add checkbox
            const checkBoxEl = document.createElement('input');
            checkBoxEl.type = 'checkbox';
            if (todo.completed) {
                checkBoxEl.setAttribute('checked', true);
            }
            checkBoxEl.setAttribute('data-index', todosArr.indexOf(todo));
            liEl.appendChild(checkBoxEl);

            //create todo body

            const p = document.createElement('p')
            p.innerText = todo.text;

            liEl.appendChild(p);

            //create delete button
            const deleteButton = document.createElement('button');
            deleteButton.type = 'button'
            deleteButton.classList.add('delete')
            deleteButton.setAttribute('data-index', todosArr.indexOf(todo))
            deleteButton.innerText = 'X'

            liEl.appendChild(deleteButton)
            ulEl.appendChild(liEl);
        }

        return ulEl;
    }

    // add new todo item
    addTodo(text) {
        const newTodo = new Todo(text);
        this._state.todos.push(newTodo);

    }

    // add new todo item handler
    addTodoHandler = (event) => {

        if (event.key !== 'Enter') return;
        //read from user
        const input = event.target.value;

        //update state

        this.addTodo(input);

        // populate DOM
        const todos = this.renderTodos(this._state.todos);
        
        const id = `${this.name}-todos`;
        document.getElementById(id).innerHTML= '';
        document.getElementById(id).appendChild(todos);
        event.target.value = '';

    }

}

export { TodoList }