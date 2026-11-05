// A form component that will have a text input for the todo title
// and a button to submit the todo
// Later it will be used to edit the todos as well

import type { FormComponentProps } from "./TodoApp";

export default function FormComponent({
  title,
  handleFormOnChange,
  handleOnSubmit,
}: FormComponentProps) {
  return (
    <div className="FormComponent">
      <form onSubmit={handleOnSubmit} className="InsideForm">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={handleFormOnChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
