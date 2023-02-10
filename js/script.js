const root = document.querySelector(".root");

function TodoForm(app){
    const container = document.createElement("form");

    container.innerHTML = `
        <input class="inputForm" type ="text" />
        <button>Add</button>
    `;
    container.addEventListener("submit",function(e){
        e.preventDefault();
        const value = container.querySelector("input").value;
        app(value)
    });

    return container;
}

function ListItem(todo,onChange){
    const container = document.createElement("div");
    container.innerHTML = `
        <label>
            <input type="checkbox" ${todo.completed ? "checked": ""} />
            ${todo.label}
        </label>
    `
    const input = container.querySelector("input");
    input.addEventListener("change",(e)=>{
        onChange(e.target.checked);
    })
    return container;
}

function List(todos,onChange){
    const container = document.createElement("div");
    todos.map(todo =>{
        return ListItem(todo,(change)=>{
            todo.completed = change;
            onChange();
        })
    }).forEach(el=>{
        container.appendChild(el);
    });

    return container;
}

function TodoFooter(todos,onChange){
    const comp=todos.filter(todo =>{
        return todo.completed === true
    }).length
    const container = document.createElement("div");
    container.innerHTML = `
        <span>${comp}/${todos.length} Completed</span>
        <button>Clear Completed</button>
    `;
    const btn = container.querySelector("button");
    btn.addEventListener("click",()=>{
        onChange(todos.filter((todo)=>{
            todo.completed === false;
        }))
    })

    return container;
}

function App(){

    let todos = [
        {label: "learn JS", completed: false},
        {label: "learn Node", completed: false},
        {label: "learn CSS", completed: false},
    ]

    const container = document.createElement("div")
    function render(){
        container.innerHTML = "";
        container.appendChild(TodoForm(function(newText){
            todos.push({
                label: newText,
                completed:false
            });
            render();
        }));
        container.appendChild(List(todos,()=>{
            render()
        }));
        container.appendChild(TodoFooter(todos,(newTodo)=>{
            todos = newTodo;
            render()
        }));
    }
    render()
    return container;
}

root.appendChild(App());
