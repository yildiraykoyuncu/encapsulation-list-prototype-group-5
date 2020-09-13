import { TodoList } from './list-prototype.js'

const newApp = {
    _state: {
        todoLists: []
    },

    addNewTodoListHandler: (event) => {
        if (event.key !== "Enter") return;

        // Create new todo list
        const name = event.target.value;
        const todoList = new TodoList(name);


        // push new todo list to the state

        newApp._state.todoLists.push(todoList)
        console.log(todoList);

        // add new todoList to DOM

        const root = document.getElementById("root");
        const renderedTodoList = todoList.renderAddTodoInput();
        root.appendChild(renderedTodoList);
        renderedTodoList.querySelector('input[type="text"]')
            .addEventListener("keyup", todoList.addTodoHandler);
        renderedTodoList.querySelector("#toggle-button")
            .addEventListener("click", todoList.toggleAllHandler);

        const todosView = todoList.renderTodos(todoList.state.todos)
        todosView.addEventListener("change", todoList.toggleCompletedHandler); // event delegation!
        const id = `${name}-todos`
        document.getElementById(id).addEventListener("click", todoList.deleteTodoHandler);
        todosView.addEventListener("dblclick", todoList.editTodoHandler);
        //renderedTodoList.appendChild(todosView)

        //clean input field

        event.target.value = ''

    }
};

export { newApp }