import { useState } from "react";

function Mycomponent({ index, task, removetask, openUpdateInput }) {
  const [heading, setHeading] = useState(false);

  return (
    <div className="myTask" key={index}>
      {index === 0 ? <h1>{task}</h1> : <p>{task}</p>}
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
}

export default Mycomponent;
