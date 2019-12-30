/*
    <material-input
        placeholder=string
        id=string
        error=string
    >
*/

const xyz_comame_scriptFilePath = 'https://comame.xyz/assets/script/material-component/'

class MaterialInputElement extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })

        const root = document.createElement('div')
        const input = document.createElement('input')
        const placeholderDiv = document.createElement('div')
        const errorDiv = document.createElement('div')
        const style = document.createElement('link')

        root.id = 'root'
        input.id = 'input'
        placeholderDiv.id = 'label'
        errorDiv.id = 'error'

        input.onfocus = () => {
            root.classList.add('focused')
        }
        input.onblur = () => {
            const hasInput = Boolean(input.value)
            root.classList.remove('focused')
            if (hasInput) {
                root.classList.add('hasInput')
            } else {
                root.classList.remove('hasInput')
            }
        }
        input.oninput = () => {
            this.setAttribute('value', input.value)
        }

        style.rel = 'stylesheet'
        style.href = xyz_comame_scriptFilePath + 'material-input.css'

        shadow.appendChild(root)
        root.appendChild(input)
        root.appendChild(placeholderDiv)
        root.appendChild(errorDiv)
        root.appendChild(style)
    }

    static get observedAttributes() {
        return [ 'placeholder', 'value', 'error' ]
    }

    connectedCallback() {
        this.shadowRoot.getElementById('label').textContent = this.getAttribute('placeholder')
        this.value = this.getAttribute('value')
        this.error = this.getAttribute('error')
    }

    attributeChangedCallback(attributeName, oldValue, newValue) {
        switch (attributeName) {
            case 'placeholder':
                this.shadowRoot.getElementById('label').textContent = newValue
                break
            case 'value':
                this.value = newValue
            break
        }
    }

    get value() {
        return this.shadowRoot.getElementById('input').value
    }
    set value(v) {
        this.shadowRoot.getElementById('input').value = v
        if (v != '') {
            this.shadowRoot.getElementById('root').classList.remove('hasInput')
        } else {
            this.shadowRoot.getElementById('root').classList.add('hasInput')
        }
    }
    get error() {
        return this.shadowRoot.getElementById('error').textContent
    }
    set error(v) {
        this.shadowRoot.getElementById('error').textContent = v
        if (v != '') {
            this.shadowRoot.getElementById('root').classList.remove('hasError')
        } else {
            this.shadowRoot.getElementById('root').classList.add('hasError')
        }
    }
}

customElements.define('material-input', MaterialInputElement)
