import "./styles.css";
import { useState } from "react";
import { useCopyToClipboard } from "react-use";
import { BiCopy } from "react-icons/bi";

export default function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [updateTask, setUpdateTask] = useState("");
  const [isUpdatedInputVisible, setIsUpdatedInputVisible] = useState(false);
  const [currentTodoIndex, setCurrentTodoIndex] = useState("");
  const [optionSelected, setoptionSelected] = useState(false);
  const [heading, setHeading] = useState(false);
  const [subHeading, setSubHeading] = useState(false);
  const [close, setClose] = useState(false);
  const [state, copyToClipboard] = useCopyToClipboard();

  const closeBanner = () => {
    setClose(true);
  };

  const saveTask = (e) => {
    // setting the task's value using the setTask function
    // to get the value we use the syntax event.target.value
    setTask(e.target.value);
  };
  const saveUpdatedTask = (e) => {
    setUpdateTask(e.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "/" && todos.length !== 0) {
      setoptionSelected(true);

      // console.log(event.key);
    } else {
      setoptionSelected(false);
    }

    if (event.key === "Enter") {
      const tempTodos = todos;
      var stringWithSlash = task;
      var stringWithoutSlash = stringWithSlash.replace(/\//g, "");
      const newTodo = {
        title: stringWithoutSlash,
        isHeading: heading ? true : false,
        isSubHeading: subHeading ? true : false,
        isMainHeading: tempTodos.length === 0 ? true : false
      };
      tempTodos.push(newTodo);
      setTodos(tempTodos);

      setTask("");
      setHeading(false);
      setSubHeading(false);
    }
  };
  const removetask = (t) => {
    const tempTodos = todos;
    const result = tempTodos.filter(function (task) {
      return task !== t;
    });
    setTodos(result);
  };

  const openUpdateInput = (stringWithoutSlash, currentIndex) => {
    setIsUpdatedInputVisible(true);
    setUpdateTask(stringWithoutSlash.title);
    setCurrentTodoIndex(currentIndex);
  };

  const updateHandleKeyPress = (updateEvent) => {
    if (updateEvent.key === "/" && currentTodoIndex !== 0) {
      setoptionSelected(true);
    } else {
      setoptionSelected(false);
    }
    if (updateEvent.key === "Enter") {
      const tempTodos = todos;
      var stringWithSlash = updateTask;
      var stringWithoutSlash = stringWithSlash.replace(/\//g, "");
      tempTodos[currentTodoIndex].title = stringWithoutSlash;
      tempTodos[currentTodoIndex].isHeading = heading;
      tempTodos[currentTodoIndex].isSubHeading = subHeading;

      setTodos(tempTodos);
      setIsUpdatedInputVisible(false);
      setHeading(false);
      setSubHeading(false);
    }
  };

  const changeToHeading = () => {
    setHeading(true);
    setSubHeading(false);
    setTask("");
    setoptionSelected(false);
  };
  const changeToSubHeading = () => {
    setSubHeading(true);
    setHeading(false);
    setTask("");
    setoptionSelected(false);
  };
  const titleStyle = {
    color: "black",
    height: "10vh",
    fontFamily: "Arial",
    fontSize: "35px"
  };

  return (
    <div className="App">
      <div className="loginDiv">
        <h2>notionClone</h2>
        <button>Login</button>
      </div>
      {close ? null : (
        <div className="createdPageBanner">
          <h3>Hey 👋 You just created a public page.</h3>
          <span onClick={closeBanner}>X</span>
        </div>
      )}
      <div className="task-output-container">
        {isUpdatedInputVisible ? (
          <div className="editPopup">
            <input
              type="text"
              value={updateTask}
              onChange={saveUpdatedTask}
              onKeyPress={updateHandleKeyPress}
            />
            <button
              className="editPopupCopyHere"
              type="button"
              onClick={() => copyToClipboard(updateTask)}
            >
              <BiCopy />
            </button>
          </div>
        ) : null}
        {optionSelected ? (
          <div className="tagButtons">
            <button onClick={changeToHeading}>Heading</button>
            <button onClick={changeToSubHeading}>SubHeading</button>
          </div>
        ) : null}
        {todos.map((task, index) => {
          return (
            <div className="myTask" key={index}>
              {/* {index === 0 && <h1 style={{ color: "pink" }}>{task.title}</h1>} */}

              {task.isHeading ? (
                <h1 style={titleStyle} contentEditable="true">
                  {task.title}
                </h1>
              ) : null}
              {task.isSubHeading && (
                <h2 contentEditable="true">{task.title}</h2>
              )}
              {!task.isHeading && !task.isSubHeading && index !== 0 && (
                <p contentEditable="true">{task.title}</p>
              )}

              {task.isMainHeading && (
                <h1
                  style={titleStyle}
                  contentEditable="true"
                  onInput={(e) =>
                    console.log(e.currentTarget.textContent, index)
                  }
                  onBlur={
                    (e) =>
                      console.log(e.currentTarget.textContent, index, "blur")
                    // saveUpdatedTask(task, index)
                  }
                >
                  {task.title}
                </h1>
              )}

              <img
                onClick={() => removetask(task)}
                className="removeTask"
                alt="deletetask"
                src="https://img.icons8.com/ios-glyphs/100/000000/filled-trash.png"
              />
              <img
                onClick={() => openUpdateInput(task, index)}
                className="editTask"
                alt="edit"
                src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/000000/external-edit-interface-kiranshastry-solid-kiranshastry.png"
              />
            </div>
          );
        })}
      </div>
      <div className="task-input-container">
        <input
          className="taskInput"
          placeholder={
            todos.length === 0 ? `Type a page title` : `Add your Notes`
          }
          type="text"
          name="todo"
          value={task}
          onChange={saveTask}
          onKeyPress={handleKeyPress}
        />
        <button
          className="taskInputContainerCopy"
          type="button"
          onClick={() => copyToClipboard(task)}
        >
          <BiCopy />
        </button>
      </div>
    </div>
  );
}
