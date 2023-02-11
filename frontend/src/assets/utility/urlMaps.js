// Base URL
const BASE = process.env.REACT_APP_BASE_URL || 'http://localhost:4000/api';

const url = {
    LOGIN: BASE + '/login',
    SIGNUP: BASE + '/signup',
    TASKS: BASE + '/tasks',
    TASK: (id) => BASE + '/tasks/' + id,
    TOGGLE_TASK: (id) => BASE + '/tasks/' + id + '/toggle',
};

const LOGIN = url.LOGIN;
const SIGNUP = url.SIGNUP;
const GET_TASKS = url.TASKS;
const POST_TASK = url.TASKS;
const DELETE_TASK = url.TASK;
const UPDATE_TASK = url.TASK;
const TOGGLE_TASK = url.TOGGLE_TASK;

export {
    BASE,
    LOGIN,
    SIGNUP,
    GET_TASKS,
    POST_TASK,
    DELETE_TASK,
    UPDATE_TASK,
    TOGGLE_TASK,
};