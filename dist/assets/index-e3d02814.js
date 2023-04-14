(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerpolicy&&(a.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?a.credentials="include":t.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(t){if(t.ep)return;t.ep=!0;const a=n(t);fetch(t.href,a)}})();class m{constructor(e,n,s,t){this.name=e,this.description=n,this.content=s,this.callback=t}}class d{constructor(e,n,s){this.commands=[],this.history=[],this.historyIndex=0,this.dataError=!1,this.commandsCallback=e,this.insertDiv=n,this.commandInput=s}loadCommands(e){fetch(e).then(n=>{if(!n.ok)throw new Error("HTTP error "+n.status);return n.json()}).then(n=>{const s=JSON.parse(JSON.stringify(n),(t,a)=>{if(t==="callback"){const i=this.commandsCallback.find(c=>c.name===a);return i?i.callback:null}return a});for(const t of s)this.commands.push(new m(t.name,t.description,t.content,t.callback))}).catch(n=>{console.error(n)})}registerCommand(e){this.commands.push(e)}execute(e,n){const s=this.commands.find(t=>t.name===e);return this.insertDiv.innerHTML+=this.dummyInput(this.commandInput.value),this.commandInput.value="",s?(this.history.push(s),this.historyIndex=this.history.length,s.callback&&s.callback(this,n,s.content),s):(this.history.push(new m(e,null,null,null)),this.historyIndex=this.history.length,console.log(`Unknown command: ${e}`),this.insertHtml(`
            <p>
                <spam style="color:red">Unknown command</span>: <spam class="text-tertiary-200">${e}</span>
            </p>
            `),null)}scrollElementHeight(e){e.scroll({top:e.scrollHeight,behavior:"smooth"})}insertHtml(e){this.insertDiv.innerHTML+=e.trim(),this.scrollElementHeight(this.insertDiv)}clearTerminal(){this.insertDiv.innerHTML="",this.commandInput.value=""}dummyInput(e){return`
        <div class="shell">
            <label class="inline-flex flex-space-between flex-align-items-center" for="command-input">
            <svg class="height-1 text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
            </svg>                
            <span class="text-primary-400 my-0"><strong class="text-tertiary-200"> root </strong>@acousticpeepo $</span>
            </label>
            <input disabled value="${e}" type="text" id="command-input" class="command-input | my-0 text-neutral-100 px-200">
        </div>
        `.trim()}}const u=[{name:"showHelp",callback:(r,e,n)=>{let s="";r.commands.map(a=>{const i=a.name,c=a.description;s+=`
                <li class="mb-300"><span class="text-tertiary-200">${i}</span> : <br><span class="fs-300 pl-600">${c}</span></li>
                `});const t=`
            <p>
                Here is a list of available commands
                <ul role="list" class="mt-200 mb-400">
                    ${s}
                </ul>
            </p>
            `;r.insertHtml(t)}},{name:"showWhois",callback:(r,e,n)=>{let s="";n.map(t=>{(typeof t=="string"||t instanceof String)&&(s+=` ${t} `)}),r.insertHtml(`
            <p class="fs-300">
                ${s}
            </p>
            `)}},{name:"clearTerminal",callback:(r,e,n)=>{r.clearTerminal()}},{name:"showProjects",callback:(r,e,n)=>{let s="";n.map(t=>{typeof t=="string"||t instanceof String||(s+=`
                    <li class="my-0 pl-600">&rarr; <a target="_blank" href="${t.url}" class="text-tertiary-200">${t.name}</a>: - <span class="">${t.description}</span></li>
                    `)}),r.insertHtml(`
            <p>
                List of Project
                <ul role="list" class="fs-300">
                    ${s}
                </ul>
            </p>
            `)}},{name:"showSkills",callback:(r,e,n)=>{let s="";n.map(t=>{(typeof t=="string"||t instanceof String)&&(s+=`
                    <li class="my-0 pl-600"><span class="text-accent-400">&#9733;</span> ${t}</li>
                    `)}),r.insertHtml(`
            <p>
                I can assist you with
                <ul role="list" class="fs-300">
                    ${s}
                </ul>
            </p>
            `)}},{name:"showSocials",callback:(r,e,n)=>{let s="";n.map(t=>{typeof t=="string"||t instanceof String||(s+=`
                    <li class="my-0 pl-600">&rarr; <a target="_blank" href="${t.url}" class="text-tertiary-200">${t.name}</a></li>
                    `)}),r.insertHtml(`
            <p>
                You can find me on the following social media
                <ul role="list" class="fs-300">
                    ${s}
                </ul>
            </p>
            `)}}],o=document.getElementById("command-input"),p=document.querySelector(".insert"),l=new d(u,p,o);l.loadCommands("commands.json");const h=r=>{const e=r.value.trim().toLowerCase().split(" ");let n=[],s=null;if(e.length>1)for(let t=1;t<e.length;t++)n.push(e[t]);return s=e[0],{command:s,args:n}};o.addEventListener("keypress",r=>{if(r.key==="Enter"){const e=h(o);if(!e.command)return;l.execute(e.command,e.args)}});o.addEventListener("keyup",r=>{r.key==="ArrowUp"&&l.historyIndex>0&&(r.preventDefault(),l.historyIndex--,l.commandInput.value=l.history[l.historyIndex].name),r.key==="ArrowDown"&&l.historyIndex<l.history.length-1&&(r.preventDefault(),l.historyIndex++,l.commandInput.value=l.history[l.historyIndex].name)});
