// This component will contain
// 1. a body for the title of the todo message
// 2. a button for deleting this todo entry
// 3. a button to edit this todo entry
// 4. a checkbox that will be used to check the entry if completed.

import type { TodoCardFunctions } from "./TodoApp";

export default function TodoCard({
  id,
  checked,
  title,
  handleTodoCheck,
  handleDeleteTodo,
  handleEditTodo,
}: TodoCardFunctions) {
  return (
    <div className="TodoCard">
      <div>
        <input
          type="checkbox"
          name="checked"
          id="checked"
          checked={checked}
          onChange={(e) => handleTodoCheck(e, id)}
        />
        <span
          style={
            checked
              ? { textDecoration: "line-through" }
              : { textDecoration: "none" }
          }
        >
          {title}
        </span>
      </div>
      <div>
        <button id="delete" onClick={() => handleDeleteTodo(id)}>Delete</button>
        <button id="edit" onClick={() => handleEditTodo(id)}>Edit</button>
      </div>
    </div>
  );
}
