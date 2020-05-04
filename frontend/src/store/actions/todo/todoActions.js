export const addTodo = (id, full_name, task, start_date, due_date, project, priority, tag, comments) => ({
   type: "ADD_TODO",
   id: id++,
   full_name: full_name ? full_name : "",
   task: task ? task : "",
   start_date: start_date ? start_date : "",
   due_date: due_date ? due_date : "",
   project: project ? project : "",
   priority: priority ? priority : "",
   tag: tag ? tag : "",
   comments: comments ? comments : "",
   image: "https://randomuser.me/api/portraits/thumb/men/" + id + ".jpg"
});

export const updateTodo = (id, field, value) => ({
   type: "UPDATE_TODO",
   id: id,
   field: field,
   value: value
});

export const todoDetails = id => ({
   type: "TODO_DETAILS",
   id
});

export const assignProject = (id, label) => ({
   type: "ASSIGN_TODO_PROJECT",
   id,
   label
});

export const assignTodoTag = (id, tag) => ({
   type: "ASSIGN_TODO_TAG",
   id,
   tag
});

export const setEditTodoFlag = flag => ({
   type: "EDIT_TODO",
   flag
});

export const setTodoVisibilityFilter = filter => ({
   type: "SET_TODO_VISIBILITY_FILTER",
   filter
});

export const todoSearch = searchTerm => ({
   type: "FILTER_TODO",
   payload: searchTerm
});

export const toggleTodo = id => ({
   type: "TOGGLE_TODO",
   id
});

export const toggleStarredTodo = id => ({
   type: "TOGGLE_STARRED_TODO",
   id
});
export const togglePriorityTodo = id => ({
   type: "TOGGLE_PRIORITY_TODO",
   id
});

export const deleteTodo = id => ({
   type: "DELETE_TODO",
   id
});

export const todoVisiblityFilter = {
   SHOW_ALL: "SHOW_ALL",
   OPEN_TODO: "OPEN_TODO",
   COMPLETED_TODO: "COMPLETED_TODO",
   STARRED_TODO: "STARRED_TODO",
   PRIORITY_TODO: "PRIORITY_TODO",
   PROJECT_A_TODO: "PROJECT_A_TODO",
   PROJECT_B_TODO: "PROJECT_B_TODO",
   UIUX_TODO: "UIUX_TODO",
   FRONTEND_TODO: "FRONTEND_TODO",
   BACKEND_TODO: "BACKEND_TODO",
   SEARCH_TODO: "SEARCH_TODO",
   DELETED_TODO: "DELETED_TODO"
};
