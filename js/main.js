
class FormValidator {
    constructor(form, fields) {
      this.form = form
      this.fields = fields
    }  
    
    initialize() {
      this.validateOnEntry()
      this.validateOnSubmit()
    }

    validateOnSubmit() {
      let self = this
      
      this.form.addEventListener('submit', e => {
          e.preventDefault()
          self.fields.forEach(field => {
          const input = document.querySelector(`#${field}`)
          self.validateFields(input)
        })
      })
    }
    
    validateOnEntry() {
      let self = this
      this.fields.forEach(field => {
        const input = document.querySelector(`#${field}`)
        
        input.addEventListener('input', event => {
          this.validateFields(input)
        })
      })
    }
    
    validateFields(field) {
    
      // Check presence of values
      if (field.value.trim() === "") {
        this.setStatus(field, "error")
      } else {
        this.setStatus(field, "success")
      }
      
      // check for a valid email address
      if (field.type === "email") {
        const re = /\S+@\S+\.\S+/
        if (re.test(field.value)) {
          this.setStatus(field, "success")
        } else {
          this.setStatus(field, "error")
        }
      }
    }
  
    setStatus(field, status) {
      const errorIcon = field.parentElement.querySelector('.icon-error')
      const errorMessage = field.parentElement.querySelector('.error-message')
      const errorBorder = field.parentElement.querySelector('.input')
      

       if (status === "success") {
        
        errorMessage.classList.add('hidden')
        errorIcon.classList.add('hidden')
        errorBorder.classList.remove('error-border')
        
      } 
      
      if (status === "error") {
        
        errorMessage.classList.remove('hidden')
        errorIcon.classList.remove('hidden')
        errorBorder.classList.add('error-border')
      }  
       
    }
  }
  
  const form = document.querySelector('form')
  const fields = ["username", "last-name", "email", "password"]
  
  const validator = new FormValidator(form, fields);
  validator.initialize();
