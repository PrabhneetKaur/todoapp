import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import ActionPalette from "./ActionPalette";
import { useNavigate } from "react-router-dom";
import { 
    GET_TASKS, 
    POST_TASK, 
    DELETE_TASK, 
    UPDATE_TASK,
    TOGGLE_TASK
} from "../assets/utility/urlMaps";

const Interface = () => {
    const navigate = useNavigate();
    const [newTask, setNewTask] = useState("");
    const [taskList, setTaskList] = useState([]);
    const [updateState, setUpdateState] = useState({
        update: false,
        id: null,
        title: null,
    });

    const [taskVisibility, setTaskVisibility] = useState({
        pending: true,
        completed: true,
    });

    const getJwtToken = () => {
        if (document.cookie.split('=')[1] === undefined) {
            navigate("/login");
        } else if (document.cookie.split('=')[0] !== "token") {
            let cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                if (cookies[i].split('=')[0] === "token") {
                    return cookies[i].split('=')[1];
                }
            }
        } else {
            return document.cookie.split('=')[1];
        }
    }

    const refreshTaskList = () => {
        axios.get(GET_TASKS, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + getJwtToken(),
            }
        })
            .then((response) => {
                setTaskList(response.data);
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status === 401) {
                    navigate("/login");
                }
            });
    };

    const addNewTask = () => {
        if (newTask !== "") {
            axios.post(POST_TASK, {
                title: newTask,
                time: moment().format('YYYY-MM-DD HH:mm:ss'),
            }, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + getJwtToken(),
                }
            })
                .then((response) => {
                    // console.log(response);
                    setNewTask("");
                    refreshTaskList();
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response.status === 401) {
                        navigate("/login");
                    }
                });
        }
    };

    const changeTaskStatus = (id) => {
        axios.put(TOGGLE_TASK(id), {}, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + getJwtToken(),
            }
        })
            .then((response) => {
                // console.log(response);
                refreshTaskList();
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status === 401) {
                    navigate("/login");
                }
            });
    };

    const deleteTask = (id) => {
        axios.delete(DELETE_TASK(id), {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + getJwtToken(),
            }
        })
            .then((response) => {
                // console.log(response);
                refreshTaskList();
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status === 401) {
                    navigate("/login");
                }
            });
    };

    const setUpUpdate = (id, title) => {
        setUpdateState({
            update: true,
            id: id,
            title: title,
        });
        setNewTask(title);
        window.scrollTo(0, 0);
    };

    const updateTask = () => {
        if (newTask === updateState.title) {
            setNewTask("");
            setUpdateState({
                update: false,
                id: null,
                title: null,
            });
        } else if (newTask !== "") {
            axios.put(UPDATE_TASK(updateState.id), {
                title: newTask,
                time: moment().format('YYYY-MM-DD HH:mm:ss'),
            }, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + getJwtToken(),
                }
            })
                .then((response) => {
                    // console.log(response);
                    setNewTask("");
                    setUpdateState({
                        update: false,
                        id: null,
                        title: null,
                    });
                    refreshTaskList();
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response.status === 401) {
                        navigate("/login");
                    }
                });
        }
    };

    useEffect(() => {
        refreshTaskList();
	// eslint-disable-next-line
    }, []);
    
    useEffect(() => {}, [taskList]);

    return (
        <div className="flex relative min-h-screen w-full bg-dark">
            <ActionPalette totalTasks={taskList.length} completedTasks={taskList.filter(task => task.completed === true).length} />
            <section className="flex-1 text-orange-dark p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl">Tasks</h2>
                </div>
                <div className="flex justify-center items-center gap-8 mt-16 mb-10 mx-auto w-full max-w-xl">
                    <input name="newTask" value={newTask} onChange={(e) => setNewTask(e.target.value)} className="py-1 px-4 bg-gray-dark-600 outline-none rounded text-lg" placeholder="Type in the task" />
                    {
                        !updateState.update 
                        ? <button onClick={addNewTask} className="py-1 px-4 rounded bg-green-dark text-lg text-dark">+ Add</button>
                        : <button onClick={updateTask} className="py-1 px-4 rounded bg-yellow-dark text-lg text-dark">Update</button>
                    }
                </div>
                
                <div className="my-6 mx-auto max-w-4xl text-teal-dark">
                    <button 
                        className="py-2 px-3 flex justify-between items-center w-full rounded hover:bg-gray-dark-600 transition-colors duration-500"
                        onClick={() => setTaskVisibility({...taskVisibility, pending: !taskVisibility.pending})}
                    >
                        <h3 className="text-xl">Pending Tasks</h3>
                        <span className="material-symbols-outlined text-3xl font-extralight">{taskVisibility.pending ? 'expand_less' : 'expand_more'}</span>
                    </button>
                    <div className={`${taskVisibility.pending ? 'max-h-max' : 'max-h-0'} overflow-hidden transition-[max-height] duration-1000`}>
                        {
                            taskList.filter((task) => task.completed === false).sort((a, b) => a.time < b.time).map((task) => (
                                <div key={task._id} className="flex flex-col gap-4 my-4">
                                    <div className="flex items-start gap-6 p-6 w-full bg-gray-dark-600">
                                        <button onClick={() => changeTaskStatus(task._id)}>
                                            <span className="material-symbols-outlined font-extralight">
                                                radio_button_unchecked
                                            </span>
                                        </button>
                                        <div className="flex-1">
                                            <div className="mb-1">{task.title}</div>
                                            <div className="text-xs text-gray-dark-200">{task.time}</div>
                                        </div>
                                        <button onClick={() => setUpUpdate(task._id, task.title)}>
                                            <span className="material-symbols-outlined p-2 h-10 w-10 hover:bg-dark transition-colors duration-500 rounded-full text-yellow-dark font-extralight">
                                                edit
                                            </span>
                                        </button>
                                        <button onClick={() => deleteTask(task._id)}>
                                            <span className="material-symbols-outlined p-2 h-10 w-10 hover:bg-dark transition-colors duration-500 rounded-full text-red-dark font-extralight">
                                                delete
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                        {
                            taskList.filter((task) => task.completed === false).length === 0 && (
                                <div className="flex justify-center items-center gap-4 mt-8 mb-4 text-teal-dark/70">No pending task for you!</div>
                            )
                        }
                    </div>
                </div>

                <div className="mt-12 mb-6 mx-auto max-w-4xl text-green-dark">
                    <button 
                        className="py-2 px-3 flex justify-between items-center w-full rounded hover:bg-gray-dark-600 transition-colors duration-500"
                        onClick={() => setTaskVisibility({...taskVisibility, completed: !taskVisibility.completed})}
                    >
                        <h3 className="text-xl">Finished Tasks</h3>
                        <span className="material-symbols-outlined text-3xl font-extralight">{taskVisibility.completed ? 'expand_less' : 'expand_more'}</span>
                    </button>
                    <div className={`${taskVisibility.completed ? 'max-h-max' : 'max-h-0'} overflow-hidden transition-[max-height] duration-1000`}>
                        {
                            taskList.filter((task) => task.completed === true).sort((a, b) => a.time > b.time).reverse().map((task) => (
                                <div key={task._id} className="flex flex-col gap-4 my-4">
                                    <div className="flex items-start gap-6 p-6 w-full bg-gray-dark-600">
                                        <button onClick={() => changeTaskStatus(task._id)}>
                                            <span className="material-symbols-outlined font-extralight">
                                                check_circle
                                            </span>
                                        </button>
                                        <div className="flex-1">
                                            <div className="mb-1 line-through">{task.title}</div>
                                            <div className="text-xs text-gray-dark-200">{task.time}</div>
                                        </div>
                                        <button onClick={() => setUpUpdate(task._id, task.title)}>
                                            <span className="material-symbols-outlined p-2 h-10 w-10 hover:bg-dark transition-colors duration-500 rounded-full text-yellow-dark font-extralight">
                                                edit
                                            </span>
                                        </button>
                                        <button onClick={() => deleteTask(task._id)}>
                                            <span className="material-symbols-outlined p-2 h-10 w-10 hover:bg-dark transition-colors duration-500 rounded-full text-red-dark font-extralight">
                                                delete
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                        {
                            taskList.filter((task) => task.completed === true).length === 0 && (
                                <div className="flex justify-center items-center gap-4 mt-8 mb-4 text-green-dark/70">No finished task for you!</div>
                            )
                        }
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Interface;
