"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function validate(obj) {
    let value = obj.value;
    if (obj.required && !value.toString().trim().length)
        return false;
    if (obj.minLength && (value.toString().trim().length < obj.minLength))
        return false;
    if (obj.maxLength && (value.toString().trim().length > obj.maxLength))
        return false;
    if (typeof value === "number") {
        if (obj.min && value < obj.min)
            return false;
        if (obj.min && value > obj.min)
            return false;
    }
    return true;
}
class ProjectInput {
    constructor() {
        this.templateElement = document.getElementById("project-input");
        this.hostElement = document.getElementById("app");
        let importNode = document.importNode(this.templateElement.content, true);
        this.htmlFormElement = importNode.firstElementChild;
        this.htmlFormElement.id = "user-input";
        this.tileInputElement = this.htmlFormElement.querySelector("#title");
        this.descriptionInputElement = this.htmlFormElement.querySelector("#description");
        this.peopleInputElement = this.htmlFormElement.querySelector("#people");
        this.configure();
        this.attach();
    }
    gatherUserInput() {
        const enteredTitle = this.tileInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        const titleValidatable = {
            value: enteredTitle,
            required: true,
            maxLength: 20,
            minLength: 4,
        };
        const descriptionValidatable = {
            value: enteredDescription,
            required: true,
            maxLength: 100,
            minLength: 20,
        };
        const peopleValidatable = {
            value: enteredPeople,
            required: true,
            min: 1,
            max: 6
        };
        if (!validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)) {
            alert("Invalid Input");
            return;
        }
        else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }
    configure() {
        this.htmlFormElement.addEventListener("submit", this.submitHandler);
    }
    clearInputs() {
        this.tileInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }
    submitHandler(event) {
        event.preventDefault();
        let userInput = this.gatherUserInput();
        if (userInput) {
        }
        this.clearInputs();
    }
    attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.htmlFormElement);
    }
}
__decorate([
    Autobind
], ProjectInput.prototype, "submitHandler", null);
class Project {
    constructor(title, description, people) {
        this.title = title;
        this.description = description;
        this.people = people;
    }
}
class ProjectList {
    constructor(type) {
        this.type = type;
        this.templateElement = document.getElementById("project-list");
        this.hostElement = document.getElementById("app");
        let importNode = document.importNode(this.templateElement.content, true);
        this.element = importNode.firstElementChild;
        this.element.id = `${this.type}-projects`;
        this.attach();
        this.renderContent();
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector("ul").id = listId;
        this.element.querySelector("h2").textContent = this.type.toUpperCase() + "PROJECTS";
    }
    attach() {
        this.hostElement.insertAdjacentElement("beforeend", this.element);
    }
}
function Autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFunction = originalMethod.bind(this);
            return boundFunction;
        }
    };
    return adjDescriptor;
}
class ProjectStorage {
    constructor() {
        this.activeProjectList = new ProjectList("active");
        this.finishedProjectList = new ProjectList("finished");
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ProjectStorage;
        }
        return this.instance;
    }
}
const projectInput = new ProjectInput();
;
//# sourceMappingURL=app.js.map