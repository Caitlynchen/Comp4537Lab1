
class TextAreaManager {
    constructor(container) {
        this.container = container;
        this.timeStamp = new Date();
        this.textAreasData = [];
        if (container) { 
            this.init();
        }
    }

    init() {
        
        const storedData = JSON.parse(localStorage.getItem('textAreasData')) || [];
        this.textAreasData = storedData;
        storedData.forEach((data, index) => this.addTextArea(data.text, index));
    }

    displayTextAreas(storedData) {
        storedData.forEach(data => {
            const textarea = document.createElement('textarea');
            textarea.value = data.text;
            textarea.readOnly = true;
            textarea.classList.add('text-block');
            document.body.appendChild(textarea);
        });
    }

    removeEmpty(){
        for (let i = this.textAreasData.length - 1; i >= 0; i--) {
            if (this.textAreasData[i] === "") {
                this.textAreasData.splice(i, 1);
            }
        }
    }

    syncLocalStorage() {
        this.removeEmpty()
        let myJSON = JSON.stringify(this.textAreasData);
        localStorage.setItem('textAreasData', myJSON);
        this.updateCurrentTime();
  
        
        console.log(localStorage.getItem('textAreasData'));
    }

    updateCurrentTime() {
        const currentTime = document.getElementById('currentTime');
        this.timeStamp = new Date();
        currentTime.textContent = "stored at: " +this.timeStamp.toLocaleTimeString();
    }
    
    displayTime(){
        const currentTime = document.getElementById('currentReaderTime');
        currentTime.textContent = "updated at: " +this.timeStamp.toLocaleTimeString();
    }

    addTextArea(text = '', index = this.textAreasData.length) {
        const textarea = document.createElement('textarea');
        textarea.value = text;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-button');
        removeButton.onclick = () => this.removeTextArea(textarea.parentNode, index);

        
        const textareaContainer = document.createElement('div');
        textareaContainer.appendChild(textarea);
        textareaContainer.appendChild(removeButton);
        this.container.appendChild(textareaContainer);

        textarea.addEventListener('input', () => {
            if (textarea.value.trim() !== '') {  
                if (typeof this.textAreasData[index] === 'undefined') {
                    this.textAreasData.push({ text: textarea.value });
                } else {
                    this.textAreasData[index].text = textarea.value;
                }
                this.syncLocalStorage();
            }
        });
    }
    

    removeTextArea(textareaContainer, index) {
        this.container.removeChild(textareaContainer);
        this.textAreasData.splice(index, 1);
        this.syncLocalStorage();
    }
}

class NavigationManager {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (this.container) {
            //this.container.style.backgroundColor = "darkgray";
            this.createBackButton();
        }
    }

    createBackButton() {
        const button = document.createElement('button');
        button.style.padding = '10px 20px';
        button.style.backgroundColor = "darkgray";
        button.style.color = "white";
        button.style.borderRadius = "15px";
        button.style.borderColor = "transparent";
        button.textContent = 'Home';
        button.onclick = this.goBack.bind(this); 
        this.container.appendChild(button);
    }

    goBack() {
        window.location.href = 'index.html';
    }

}
const container = document.getElementById('textBlocks');
const notes = new TextAreaManager(container);
const nav = new NavigationManager('navigationContainer');

document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.querySelector('.add-button');
    addButton.addEventListener('click', () => notes.addTextArea());
    setInterval(() => notes.syncLocalStorage(), 2000);
    //new NavigationManager('navigationContainer');
    
});

document.addEventListener('DOMContentLoaded', function() {
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    btn1.addEventListener('click', function() {
        window.location.href = 'writer.html';
    });

    btn2.addEventListener('click', function() {
        window.location.href = 'reader.html';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const textBlocks = document.getElementById('ReaderTextBlocks');
    const storedData = JSON.parse(localStorage.getItem('textAreasData')) || [];
    notes.displayTime();

    storedData.forEach(data => {
        if (data !== ''){
            const textarea = document.createElement('textarea');
            textarea.value = data.text;
            textarea.readOnly = true;  
            textarea.classList.add('text-block'); 
            textBlocks.appendChild(textarea);
        }
    });
});