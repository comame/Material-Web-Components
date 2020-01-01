let xyz_comame_scriptFilePath
for(const el of document.getElementsByTagName('script')) {
    if (el.src.endsWith('/components.js')) {
        xyz_comame_scriptFilePath = el.src.split('/').slice(0, -1).join('/') + '/'
    }
}

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
            this.setAttribute('value', input.value.trim())
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
            case 'error':
                this.error = newValue
                break
        }
    }

    get value() {
        return this.shadowRoot.getElementById('input').value
    }
    set value(v) {
        this.shadowRoot.getElementById('input').value = v
        if (typeof v == 'undefined' || v == null || v == '') {
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
        if (typeof v == 'undefined' || v == null || v == '') {
            this.shadowRoot.getElementById('root').classList.remove('hasError')
        } else {
            this.shadowRoot.getElementById('root').classList.add('hasError')
        }
    }
}

class MaterialButtonElement extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        const root = document.createElement('div')
        const slot = document.createElement('slot')
        const button = document.createElement('button')
        const style = document.createElement('link')

        button.id = 'button'
        slot.id = 'slot'

        this.addEventListener('click', (e) => {
            console.log('initial')
            if (this.hasAttribute('disabled')) {
                e.stopPropagation()
            }
        }, true)

        style.rel = 'stylesheet'
        style.href = xyz_comame_scriptFilePath + 'material-button.css'

        shadow.appendChild(root)
        root.appendChild(button)
        root.appendChild(style)
        button.appendChild(slot)
    }

    static get observedAttributes() {
        return [ 'disabled' ]
    }

    connectedCallback() {
        this.disabled = this.getAttribute('disabled') != null
    }

    attributeChangedCallback(attributeName, oldValue, newValue) {
        switch (attributeName) {
            case 'disabled':
                this.disabled = newValue != null
                break
        }
    }

    get disabled() {
        const attr = this.shadowRoot.getElementById('button').getAttribute('disabled')
        return attr != null
    }

    set disabled(v) {
        if (v) {
            this.shadowRoot.getElementById('button').setAttribute('disabled', '')
        } else {
            this.shadowRoot.getElementById('button').removeAttribute('disabled')
        }
    }
}

customElements.define('material-input', MaterialInputElement)
customElements.define('material-button', MaterialButtonElement)
