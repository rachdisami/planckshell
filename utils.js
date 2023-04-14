class Command {
    constructor(name, description, content, callback) {
        this.name = name;
        this.description = description;
        this.content = content;
        this.callback = callback;
    }
}

export class CommandHandler {
    constructor(commandsCallback, insertDiv, commandInput) {
        this.commands = [];
        this.history = [];
        this.historyIndex = 0;
        this.dataError = false;
        this.commandsCallback = commandsCallback;
        this.insertDiv = insertDiv;
        this.commandInput = commandInput;
    }

    loadCommands(filePath) {

        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }
                return response.json();
            })
            .then(json => {
                const commands = JSON.parse(JSON.stringify(json), (key, value) => {
                    if ( key === "callback") {

                        const commandCall = this.commandsCallback.find((c) => c.name === value);
                        return commandCall ? commandCall.callback : null;
                    }
                    
                    return value;
                });
        
                for (const cmd of commands) {
                    this.commands.push(new Command(cmd.name, cmd.description, cmd.content, cmd.callback));
                }
            })
            .catch((e) => {
                console.error(e);
            })
    }

    registerCommand(command) {
        this.commands.push(command);
    }

    execute(commandName, args) {
        const command = this.commands.find((c) => c.name === commandName);

        // Insert a dummy
        this.insertDiv.innerHTML += this.dummyInput(this.commandInput.value);

        // Clear the input field
        this.commandInput.value = '';
        

        if (command) {
            this.history.push(command);
            this.historyIndex = this.history.length;
            if (command.callback) command.callback(this, args, command.content);
            return command;
        } else {
            this.history.push(new Command(commandName, null, null, null));
            this.historyIndex = this.history.length;
            console.log(`Unknown command: ${commandName}`);
            this.insertHtml(`
            <p>
                <spam style="color:red">Unknown command</span>: <spam class="text-tertiary-200">${commandName}</span>
            </p>
            `);
            return null;
        }
    }

    scrollElementHeight(element) {
        element.scroll({
            top: element.scrollHeight,
            behavior: 'smooth'
        });
    }

    insertHtml(HTML) {
        this.insertDiv.innerHTML += HTML.trim();
        this.scrollElementHeight(this.insertDiv);
    }

    clearTerminal() {
        this.insertDiv.innerHTML = '';
        this.commandInput.value = '';
    }

    dummyInput(value) {
        return `
        <div class="shell">
            <label class="inline-flex flex-space-between flex-align-items-center" for="command-input">
            <svg class="height-1 text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
            </svg>                
            <span class="text-primary-400 my-0"><strong class="text-tertiary-200"> root </strong>@acousticpeepo $</span>
            </label>
            <input disabled value="${value}" type="text" id="command-input" class="command-input | my-0 text-neutral-100 px-200">
        </div>
        `.trim();
    }
}

