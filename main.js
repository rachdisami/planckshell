import { CommandHandler } from './public/utils.js'
import { commandsCallback } from './public/data.js'

const commandInput = document.getElementById('command-input');
const insertDiv = document.querySelector('.insert');

const handler = new CommandHandler(commandsCallback, insertDiv, commandInput);
handler.loadCommands('commands.json');

const getCommandInputValue = (commandInput) => {
  const inputVal = commandInput.value.trim().toLowerCase().split(' ');
  let args = [];
  let command = null;

  if (inputVal.length > 1) {
    for(let i = 1; i < inputVal.length; i++) {
      args.push(inputVal[i]);
    }
  }

  command = inputVal[0];

  return {command: command, args: args};
}

commandInput.addEventListener('keypress', (e) => {
  if (e.key === "Enter") {
    const inputVal = getCommandInputValue(commandInput);
    if (!inputVal.command) return;

    handler.execute(inputVal.command, inputVal.args);
  }
});

commandInput.addEventListener('keyup', (e) => {
  if (e.key === "ArrowUp" && handler.historyIndex > 0) {
    e.preventDefault();
    handler.historyIndex--;
    handler.commandInput.value = handler.history[handler.historyIndex].name;
  }

  if (e.key === "ArrowDown" && handler.historyIndex < handler.history.length - 1) {
    e.preventDefault();
    handler.historyIndex++;
    handler.commandInput.value = handler.history[handler.historyIndex].name;
  }
});