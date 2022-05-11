import { useState } from 'react';
import Header from './components/Header';
import MainSection from './components/MainSection';
import { Todo, Todos } from './models/Todos';
import { VisibilityFilter, VisibilityFilters } from './models/VisibilityFilter';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<VisibilityFilter>(
    VisibilityFilters.SHOW_ALL
  );
  const addTodo = (text: string) => {
    setTodos([...todos, { id: todos.length + 1, completed: false, text }]);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((x) => x.id !== id));
  };

  const completeTodo = (id: number) => {
    const todoToBeCompleted = todos.find((x) => x.id === id);
    if (todoToBeCompleted) {
      setTodos([
        ...todos.filter((x) => x.id !== id),
        { ...todoToBeCompleted, completed: true },
      ]);
    }
  };

  const editTodo = (id: number, text: string) => {
    const todoToBeCompleted = todos.find((x) => x.id === id);
    if (todoToBeCompleted) {
      setTodos([...todos, { ...todoToBeCompleted, completed: true, text }]);
    }
  };

  const completeAllTodos = () => {
    setTodos(todos.map((x) => ({ ...x, completed: true })));
  };
  const clearCompletedTodos = () => {
    setTodos([]);
  };

  return (
    <div>
      <Header addTodo={addTodo} />
      <MainSection
        activeVisibilityFilter={filter}
        todos={todos}
        todosCount={todos.length}
        completedCount={0}
        actions={{
          completeTodo,
          editTodo,
          deleteTodo,
          completeAllTodos,
          clearCompletedTodos,
          setVisibilityFilter: setFilter,
        }}
      />
    </div>
  );
}

export default App;
