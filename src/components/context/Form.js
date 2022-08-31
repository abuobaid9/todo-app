
import React, { useContext } from "react";
import { SettingsContext } from './Settings'
// import { FormGroup, InputGroup } from '@blueprintjs/core';
import { Switch } from "@blueprintjs/core";



export default function Form() {
  const { setPostsPerPage, postsPerPage, showComplete, setShowComplete } = useContext(SettingsContext);

  const storeData = (e) => {
    e.preventDefault();
    setPostsPerPage(parseInt(e.target.value))

    localStorage.setItem("settings", JSON.stringify(postsPerPage));
  };

  const handleClick = () => {
    setShowComplete(!showComplete);
  }

  return (
    <>
      <form className="f" onSubmit={storeData} class="card1">
        <span>Input number of Items per Page:</span>
        <input onChange={(e) => { setPostsPerPage(e.target.value) }} type="text" name="number" placeholder="Items per page" />
        <br></br>
        <br></br>
        <Switch checked={showComplete} onClick={handleClick}>Display completed Items</Switch>
        {/* <button onClick={setItem} className='sortB'>Save Settings</button> */}
        <button type="submit">edit</button>
      </form>

    </>
  );
}