const TodoSearch = (state = '', action) => {  
   switch (action.type) {
     case 'FILTER_TODO':
       return action.payload
     case 'SET_TODO_VISIBILITY_FILTER':
       return state = ''   
     default:
       return state
   }
 }
 
 export default TodoSearch