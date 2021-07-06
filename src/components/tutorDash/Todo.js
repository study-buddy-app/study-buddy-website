import React from 'react'
class TodoApp extends React.Component {
    constructor(props) {
      super(props);
      this.state = { items: [], text: '' };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    render() {
      return (
        <div className="todo">
          <h3 className="todo-h3">TODO</h3>
          <br/><br/>
          <TodoList items={this.state.items} />
          <form className="todo-form"onSubmit={this.handleSubmit}>
            <br/><br/>
            <label className="todo-label" htmlFor="new-todo">
              What needs to be done?
            </label>
            <input
              id="new-todo"
              onChange={this.handleChange}
              value={this.state.text}
            />
            <button>
              Add #{this.state.items.length + 1}
            </button>
          </form>
        </div>
      );
    }
  
    handleChange(e) {
      this.setState({ text: e.target.value });
    }
  
    handleSubmit(e) {
      e.preventDefault();
      if (this.state.text.length === 0) {
        return;
      }
      const newItem = {
        text: this.state.text,
        id: Date.now()
      };
      this.setState(state => ({
        items: state.items.concat(newItem),
        text: ''
      }));
    }
  }
  
  class TodoList extends React.Component {
   
    render() {
      return (
        <ul>
          {this.props.items.map(item => (
            <li className="todo-list" key={item.id}>{item.text}</li>
          ))}
        </ul>
      );
    }
  }
  
  export default TodoApp