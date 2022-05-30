import React from 'react';
import Footer from './Footer';
import {
  VisibilityFilter,
  VisibilityFilters,
} from '../models/VisibilityFilter';
import TodoList from './TodoList';
import { Todos } from '../models/Todos';

interface MainSectionProps {
  activeVisibilityFilter: VisibilityFilter;
  todosCount: number;
  completedCount: number;
  actions: any;
  todos: Todos;
}

/**
 * This is a view component. It doesn't define anything that
 * is responsible for querying or mutating, it just relies
 * on it from the upper layer component (namely, actions)
 */

const MainSection = ({
  activeVisibilityFilter,
  todosCount,
  completedCount,
  actions,
  todos,
}: MainSectionProps) => {
  const filteredTodos = filterTodosByVisibility(activeVisibilityFilter, todos);
  return (
    <section className="main">
      {!!todosCount && (
        <span>
          <input
            className="toggle-all"
            type="checkbox"
            checked={completedCount === todosCount}
            readOnly
          />
          <label onClick={actions.completeAllTodos} />
        </span>
      )}
      <TodoList actions={actions} filteredTodos={filteredTodos} />
      {!!todosCount && (
        <Footer
          activeVisibilityFilter={activeVisibilityFilter}
          completedCount={completedCount}
          activeCount={todosCount - completedCount}
          onClearCompleted={actions.clearCompletedTodos}
          setVisibilityFilter={actions.setVisibilityFilter}
        />
      )}
    </section>
  );
};

function filterTodosByVisibility(
  visibilityFilter: VisibilityFilter,
  todos: Todos
) {
  switch (visibilityFilter.id) {
    case VisibilityFilters.SHOW_ALL.id:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED.id:
      return todos.filter((t) => t.completed);
    case VisibilityFilters.SHOW_ACTIVE.id:
      return todos.filter((t) => !t.completed);
    default:
      throw new Error('Unknown filter: ' + visibilityFilter);
  }
}

export default MainSection;
