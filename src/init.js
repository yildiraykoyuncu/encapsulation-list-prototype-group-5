'use strict';

import { newApp } from './app.js'
import { logger } from '../lib/logger.js'


window.onload = () => {
    document
        .getElementById("add-new")
        .addEventListener("keyup", newApp.addNewTodoListHandler);

    console.log("app:", newApp);


    // log the initiation
    logger.push({
        state: newApp.state,
        newApp,
        //view: todosView,
    });
};