import React, { useEffect, useState, useContext } from 'react';
import useForm from '../../hooks/form.js';
import { When } from 'react-if';
import { LoginContext } from "../context/Login"
import Auth from "../auth/auth"
import { v4 as uuid } from 'uuid';
import { useSettingsContext } from '../context/Settings'
import Pagination from "../Pagination/Pagination";

const LOCAL_STORAGE_KEY = 'localStorage';

const ToDo = () => {
  const { currentPage, setCurrentPage, postsPerPage, setPostsPerPage, showComplete, setShowComplete } = useSettingsContext();
  const login = useContext(LoginContext);

  const [todos, setTodos] = useState([]);
  const [defaultValues] = useState({
    difficulty: 3,
  });

  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [listOfUncompleted, setListOfUncompleted] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);


  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
    setTodos([...todos, item]);
  }

  function deleteItem(id) {
    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  function deleteListItem(id) {
    const items = listOfUncompleted.filter(item => item.id !== id);
    setListOfUncompleted(items);
  }

  function toggleComplete(id) {
    const items = todos.map(item => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      if (item.complete === false) {
        setListOfUncompleted([...listOfUncompleted, item])
      }
      return item;
    });
    setTodos(items);
    setList(items);
  }
  function toggleUncompletedList(id) {
    const items = listOfUncompleted.map(item => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      if (item.complete === true) {
        listOfUncompleted.filter(item => item.id !== id)
      }
      return item;
    });
    setTodos(items);
    setListOfUncompleted(items);
  }

  const handleShow = () => {
    setShowComplete(!showComplete)
  }

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storageTodos) {
      if (storageTodos.length > 0) {
        setTodos(storageTodos);
      }
    }
    const storageShow = JSON.parse(localStorage.getItem('status'));
    if (storageShow) {
      if (storageShow.length > 0) {
        setShowComplete(storageShow);
      }
    }
    const storageNumber = JSON.parse(localStorage.getItem('number'));
    if (storageNumber) {
      if (storageNumber.length > 0) {
        setPostsPerPage(storageNumber);
      }
    }
    const storageIncomplete = JSON.parse(localStorage.getItem('incomplete'));
    if (storageIncomplete) {
      if (storageIncomplete.length > 0) {
        setListOfUncompleted(storageIncomplete);
      }
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // fires when todos array gets updated
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    localStorage.setItem('status', JSON.stringify(showComplete));
    localStorage.setItem('number', JSON.stringify(postsPerPage));
    localStorage.setItem('incomplete', JSON.stringify(listOfUncompleted));
  }, [todos, showComplete, postsPerPage, listOfUncompleted]);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = todos.slice(indexOfFirstPost, indexOfLastPost);
  const complete = listOfUncompleted.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    let incompleteCount = todos.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [todos, incomplete]);

  useEffect(() => {
    if (todos.complete === false) {
      setListOfUncompleted([...listOfUncompleted, todos.complete]);
    }
  }, [todos, listOfUncompleted]);

  return (
    <>
      <When condition={login.loggedIn}>
        <button onClick={login.logout}>Log Out</button>

        <Auth actions='delete'>
          <form onSubmit={handleSubmit}>
            <label>
              <span>To Do Item</span>
              <input required data-testid='input' onChange={handleChange} name="text" type="text" placeholder="Item Details" />
            </label>

            <label>
              <span>Assigned To</span>
              <input required onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
            </label>

            <label>
              <span>Difficulty</span>
              <input onChange={handleChange} defaultValue={defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
            </label>

            <label>
              <button data-testid='button' type="submit">Create</button>
            </label>

          </form>
          <input type="number" className='per-page' name="postsPerPage" placeholder='Number of posts per page' onChange={(e) => { setPostsPerPage(parseInt(e.target.value)) }} />

          <br />
          <button className='show' onClick={handleShow}>{showComplete ? 'Show Completed Items' : 'Hide Completed Items'}</button>
          {
            showComplete ?
              <ul>
                {
                  currentPosts.map((item, index) => {
                    return (
                      <>
                        <li key={index}>
                          <div>
                            <button onClick={() => deleteItem(item.id)}>x</button>
                          </div>
                          <label className={item.complete ? "active" : ""}>
                            <p >
                              {item.text}
                            </p>
                            <p ><small>Assigned to: {item.assignee}</small></p>
                            <p ><small>Difficulty: {item.difficulty}</small></p>
                          </label>
                          <div >
                            {
                              item.complete ? <div>
                                <input type="checkbox" name='completed' onClick={() => toggleComplete(item.id)} defaultChecked={true} />
                                <label htmlFor="completed">Completed</label>
                              </div>
                                : <div>
                                  <input type="checkbox" name="Incomplete-item" onClick={() => toggleComplete(item.id)} />
                                  <label htmlFor="Incomplete-item">Complete</label>
                                </div>
                            }
                          </div>
                        </li>
                      </>
                    )
                  })
                }
              </ul>

              :
              <ul>
                <h1>Comleted Item</h1>

                {
                  complete.map((item, index) => {
                    return (
                      <>
                        <li key={index}>
                          <button onClick={() => deleteListItem(item.id)}>x</button>
                          <label className={item.complete ? "active" : ""}>
                            <p>
                              {item.text}
                            </p>
                            <span ><small>Assigned to: {item.assignee}</small></span>
                            <span ><small>Difficulty: {item.difficulty}</small></span>
                          </label>
                          <div>
                            {
                              !item.complete ? <div>
                                <input type="checkbox" name='Incomplete' onClick={() => toggleUncompletedList(item.id)} />
                                <label htmlFor="Incomplete">Complete</label>
                              </div> : null
                            }
                          </div>
                        </li>
                      </>
                    )
                  })
                }
              </ul>
          }
          <div >
            <Pagination postsPerPage={postsPerPage}
              totalPosts={todos.length}
              paginate={paginate} />
          </div>
        </Auth>
        <Auth actions='read'>
          <header data-testid='header'>
            <h1>To Do List: {incomplete} items pending</h1>
          </header>
        </Auth>
      </When>
    </>
  );
};

export default ToDo;