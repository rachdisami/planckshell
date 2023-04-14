export const commandsCallback = [
    {
        name: "showHelp",
        callback: (handler, args, content) => {
            let commandsListHTML = '';
            handler.commands.map(cmd => {
                const name = cmd.name;
                const description = cmd.description;

                commandsListHTML += `
                <li class="mb-300"><span class="text-tertiary-200">${name}</span> : <br><span class="fs-300 pl-600">${description}</span></li>
                `; 
            });

            const gHTML = `
            <p>
                Here is a list of available commands
                <ul role="list" class="mt-200 mb-400">
                    ${commandsListHTML}
                </ul>
            </p>
            `;

            handler.insertHtml(gHTML);
        }
    },
    {
        name: "showWhois",
        callback: (handler, args, content) => {
            let commandHTML = '';
            content.map(c => {
                if (typeof c === 'string' || c instanceof String) {
                    commandHTML += ` ${c} `;
                }
            });

            handler.insertHtml(`
            <p class="fs-300">
                ${commandHTML}
            </p>
            `);
        }
    },
    {
        name: "clearTerminal",
        callback: (handler, args, content) => {
            handler.clearTerminal();
        }
    },
    {
        name: "showProjects",
        callback: (handler, args, content) => {
            let commandHTML = '';
            content.map(c => {
                if (!(typeof c === 'string' || c instanceof String)) {
                    commandHTML += `
                    <li class="my-0 pl-600">&rarr; <a target="_blank" href="${c.url}" class="text-tertiary-200">${c.name}</a>: - <span class="">${c.description}</span></li>
                    `;
                }
            });
            handler.insertHtml(`
            <p>
                List of Project
                <ul role="list" class="fs-300">
                    ${commandHTML}
                </ul>
            </p>
            `);
        }
    },
    {
        name: "showSkills",
        callback: (handler, args, content) => {
            let commandHTML = '';
            content.map(c => {
                if (typeof c === 'string' || c instanceof String) {
                    commandHTML += `
                    <li class="my-0 pl-600"><span class="text-accent-400">&#9733;</span> ${c}</li>
                    `;
                }
            });

            handler.insertHtml(`
            <p>
                I can assist you with
                <ul role="list" class="fs-300">
                    ${commandHTML}
                </ul>
            </p>
            `);
        }
    },
    {
        name: "showSocials",
        callback: (handler, args, content) => {
            let commandHTML = '';
            content.map(c => {
                if (!(typeof c === 'string' || c instanceof String)) {
                commandHTML += `
                    <li class="my-0 pl-600">&rarr; <a target="_blank" href="${c.url}" class="text-tertiary-200">${c.name}</a></li>
                    `;
                }
            });

            handler.insertHtml(`
            <p>
                You can find me on the following social media
                <ul role="list" class="fs-300">
                    ${commandHTML}
                </ul>
            </p>
            `);
        }
    },
];
