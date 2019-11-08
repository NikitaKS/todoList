import React from 'react';
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {
    render = () => {
        const tasksElements = this.props.tasks.map(task => {
            return <TodoListTask title={task.title} isDone={task.isDone} priority={task.priority}/>
        });
        // const tasks = [
        //     {title: "CSS", isDone: true},
        //     {title: "HTML", isDone: true},
        //     {title: "JS", isDone: true},
        //     {title: "React", isDone: false},
        // ];
        return (
            <div className="todoList-tasks">
                {tasksElements}
                {/*<TodoListTask title={this.props.tasks[0].title} isDone={this.props.tasks[0].isDone}/>*/}
                {/*<TodoListTask title={this.props.tasks[1].title} isDone={this.props.tasks[1].isDone}/>*/}
                {/*<TodoListTask title={this.props.tasks[2].title} isDone={this.props.tasks[2].isDone}/>*/}
                {/*<TodoListTask title={this.props.tasks[3].title} isDone={this.props.tasks[3].isDone}/>*/}
            </div>
        );
    }
}

export default TodoListTasks;

