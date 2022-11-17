# TODO APP

## Loading Component

- modal/ overlay component
- visibility toggled by loading state
  - loading state is changed during the asynchronous operations of updating, adding, deleting items from the todo list
  - the function to update loading state is avaliable on all screens

## Home Screen

- contains two list: uncompleted tasks, completed tasks
- both list are populated by the todo list item state
- updates to state by addition, deletion, or updating will be reflected
- each list item has an update button, delete button, and completion button
  - update button redirects to the edit screen and populates the edit form with the corresponding data
  - delete button will prompt user before deleting
  - completion button will move the list item from the uncompleted todo list to the completed todo list (and vice versa)

## Add Screen

- contains a form with fields including: task name, description, date
- contains the appropriate form validation
- contains the todo list state function

## Edit Screen

- auto populated form with todo list item information
- after validation of the form, list is updated
- contains the todo list state function

### state management

- loading state (transitions between asynchronous tasks)
- todo list items state

### app function

- display list items on home screen (two lists, one for uncompleted and one for completed)
- toggle completion of the task on the home screen
- edit task
- delete task
- add task
