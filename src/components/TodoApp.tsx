import { useState, type ChangeEvent, type SubmitEvent } from "react";
import TodosContainer from "./TodosContainer";
import FormComponent from "./FormComponent";

export interface TodoCardProps {
  id: string;
  title: string;
  checked: boolean;
}

export interface TodoCardFunctions extends TodoCardProps {
  handleTodoCheck: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
  handleDeleteTodo: (id: string) => void;
  handleEditTodo: (id: string) => void;
}

export interface TodosContainerProps {
  todosList: TodoCardProps[];
  handleTodoCheck: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
  handleDeleteTodo: (id: string) => void;
  handleEditTodo: (id: string) => void;
}

export interface FormComponentProps extends TodoCardProps {
  handleFormOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleOnSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
}

export default function TodoApp() {
  // States
  // A state to store the input cahnge
  // once the submit button is click, the state will be stored
  // as a todo entry in other state that will save a list of todos

  const [todo, setTodo] = useState<TodoCardProps>({
    id: "",
    title: "",
    checked: false,
  });

  // Second state: a state to store all the todos entry in one array
  const [todosList, setTodosList] = useState<TodoCardProps[]>([]);

  // Handlers

  // 1. Hangle the form input change that will allow typing in the input
  const handleFormOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo((prevTodo) => ({ ...prevTodo, [e.target.name]: e.target.value }));
  };

  // 2. Handle the onSubmit event for the form to add the input to the todo list
  const handleOnSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent the default refresh action from submitting the form

    if (todo.id === "") {
      setTodosList((prevList) => [
        ...prevList,
        {
          id: crypto.randomUUID(),
          title: todo.title,
          checked: false,
        },
      ]);
    } else {
      setTodosList((prevList) => prevList.map(
        (ent) => ent.id === todo.id
        ? {...ent, title: todo.title} 
        : {...ent}
      ));
    }

    // Reset todo
    setTodo({
      id: "",
      title: "",
      checked: false,
    });
  };

  // 3. Handle the checkbox toggle in the Todo Card
  const handleTodoCheck = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    setTodosList((prevList) =>
      prevList.map((entry) =>
        entry.id === id
          ? { ...entry, checked: e.target.checked }
          : { ...entry },
      ),
    );
  };

  // 4. Handle deleting an entry using the delete button
  const handleDeleteTodo = (id: string) => {
    setTodosList((prevList) => prevList.filter((todo) => todo.id != id));
  };

  // 5. Handle editing and entry using the edit button
  const handleEditTodo = (id: string) => {
    const todoEntry = todosList.find((entry) => entry.id === id) || {
      title: "",
      id: "",
      checked: false,
    };
    setTodo({ ...todoEntry });
  };

  // Main return

  return (
    <div className="TodoApp">
      <h1>Todo List App</h1>
      <FormComponent
        {...todo}
        handleFormOnChange={handleFormOnChange}
        handleOnSubmit={handleOnSubmit}
      />
      <TodosContainer
        todosList={todosList}
        handleTodoCheck={handleTodoCheck}
        handleDeleteTodo={handleDeleteTodo}
        handleEditTodo={handleEditTodo}
      />
    </div>
  );
}
