interface Validatable {
    value: string | number,
    required?: boolean,
    minLength?: number,
    maxLength?: number,
    min? :number,
    max? :number,
}

function validate(obj: Validatable):boolean{
    let value = obj.value;

    if(obj.required && !value.toString().trim().length)
        return false;
    if(obj.minLength && (value.toString().trim().length < obj.minLength))
        return false;
    if(obj.maxLength && (value.toString().trim().length > obj.maxLength))
        return false;
    if(typeof value === "number")
    {
        if (obj.min && value < obj.min)
            return false;
        if (obj.min && value > obj.min)
            return false;
    }
    return true;
}

class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    htmlFormElement: HTMLFormElement;
    tileInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        this.templateElement = document.getElementById("project-input")! as HTMLTemplateElement;
        this.hostElement = document.getElementById("app")! as HTMLDivElement;

        let importNode = document.importNode(this.templateElement.content, true);

        this.htmlFormElement = importNode.firstElementChild as HTMLFormElement;
        this.htmlFormElement.id = "user-input";

        this.tileInputElement = this.htmlFormElement.querySelector("#title") as HTMLInputElement;
        this.descriptionInputElement = this.htmlFormElement.querySelector("#description") as HTMLInputElement;
        this.peopleInputElement = this.htmlFormElement.querySelector("#people") as HTMLInputElement;


        this.configure();
        this.attach();
    }

    gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.tileInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value!;

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true,
            maxLength: 20,
            minLength: 4,
        }
        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            maxLength: 100,
            minLength: 20,
        }
        const peopleValidatable: Validatable = {
            value: enteredPeople,
            required: true,
            min: 1,
            max: 6
        }

        if (
            !validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)
        ) {
            alert("Invalid Input")
            return;
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }

    configure() {
        this.htmlFormElement.addEventListener("submit", this.submitHandler)
    }

    private clearInputs() {
        this.tileInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }

    @Autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        let userInput = this.gatherUserInput();
        if (userInput) {
           /* const [type, description, people] = userInput;*/
        }
        this.clearInputs();
    }

    private attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.htmlFormElement);
    }
}

class Project {

    constructor(public title: string, public description: string, public people: number) {

    }
}

class ProjectList {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;

    constructor(private type: "active" | "finished")
    {
        this.templateElement = document.getElementById("project-list")! as HTMLTemplateElement;
        this.hostElement = document.getElementById("app")! as HTMLDivElement;

        let importNode = document.importNode(this.templateElement.content, true);

        this.element = importNode.firstElementChild as HTMLFormElement;
        this.element.id = `${this.type}-projects`;
        this.attach();
        this.renderContent();
    }
    private renderContent(){
        const listId = `${this.type}-projects-list`
        this.element.querySelector("ul")!.id = listId;
        this.element.querySelector("h2")!.textContent = this.type.toUpperCase() + "PROJECTS"
    }

    private attach()
    {
        this.hostElement.insertAdjacentElement("beforeend", this.element);
    }
}



function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFunction = originalMethod.bind(this);
            return boundFunction;
        }
    };
    return adjDescriptor;
}



class ProjectStorage{
    //private projects: Project[];
    activeProjectList = new ProjectList("active");
    finishedProjectList = new ProjectList("finished");

    private static instance: ProjectStorage;
    static getInstance(): ProjectStorage {
        if(!this.instance)
        {
            this.instance = new ProjectStorage;
        }
        return this.instance;
    }



}

const projectInput = new ProjectInput();;


