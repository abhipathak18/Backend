const fs = require("fs");
const path = require("path");

const TODO_FILE = path.join(__dirname, "todos.json");

function readTodos() {
  const data = fs.readFileSync(TODO_FILE, "utf-8");
  return JSON.parse(data);
}

function writeTodos(todos) {
  fs.writeFileSync(TODO_FILE, JSON.stringify(todos, null, 2));
}

function addTodo(task) {
  if (!task) {
    console.log("❌ Please provide a task");
    return;
  }

  const todos = readTodos();

  const newTodo = {
    id: Date.now(),
    task,
    done: false
  };

  todos.push(newTodo);
  writeTodos(todos);

  console.log("✅ Todo added!");
}

const command = process.argv[2];
const argument = process.argv.slice(3).join(" ");

if (command === "add") {
  addTodo(argument);
} else {
  console.log('Usage: node todo.js add "Your task"');
}
