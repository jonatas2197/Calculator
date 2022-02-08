// Buscando todos os data-numbers (Botões de número) no DOM
// O seletor querySelectorAll retorna uma coleção de elementos (Array)
const numberButtons = document.querySelectorAll('[data-number]')

// Busca todos os data-operators (botões de operação) no DOM
const operationButtons = document.querySelectorAll('[data-operator]')

// Busca o botão de igualdade no DOM
// O seletor querySelector retorna apenas o primeiro elemento encontrado
const equalsButton = document.querySelector('[data-equals]')

// Busca o botão que apaga o último digito da entrada
const deleteButton = document.querySelector('[data-delete]')

// Busca o botão C (clear)
const allClearButton = document.querySelector('[data-all-clear]')

// Busca a div que armazena o valor da entrada aterior
const previousOperandTextElement = document.querySelector(
  '[data-previous-operand]',
)

//Busca a div que armazena o valor da entrada atual
const currentOperandTextElement = document.querySelector(
  '[data-current-operand]',
)

// Declara a classe Calculadora
// A classe calculadore define como deve ser uma calculadora

class Calculator {
  // Cria uma instância da calculadora
  // previousOperandTextElement: Campo que armazena o valor da entrada anterior
  // currentOperandTextElement: Campo que aramazena o valor da entrada atual
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  // Formatando o número
  formatDisplayNumber(number) {
    const stringNumber = number.toString()

    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]

    let integerDisplay

    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      })
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  // Remove o último digito
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  calculate() {
    let result

    const _previousOperand = parseFloat(this.previousOperand)
    const _currentOperand = parseFloat(this.currentOperand)

    if (isNaN(_previousOperand) || isNaN(_currentOperand)) return

    switch (this.operation) {
      case '+':
        result = _previousOperand + _currentOperand
        break
      case '-':
        result = _previousOperand - _currentOperand
        break
      case '÷':
        result = _previousOperand / _currentOperand
        break
      case '*':
        result = _previousOperand * _currentOperand
        break
      default:
        return
    }

    this.currentOperand = result
    this.operation = undefined
    this.previousOperand = ''
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return

    if (this.previousOperand !== '') {
      this.calculate()
    }

    this.operation = operation

    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  appendNumber(number) {
    // Se o número atual já tiver um . e o valor recebido for um pointo não faça nada e retorna
    if (this.currentOperand.includes('.') && number === '.') return
    // Concatena o número no final do currentOperand
    this.currentOperand = `${this.currentOperand}${number.toString()}`
  }

  // Reseta a calculadora
  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  updateDisplay() {
    this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(
      this.previousOperand,
    )} ${this.operation || ''}`
    this.currentOperandTextElement.innerText = this.formatDisplayNumber(
      this.currentOperand,
    )
  }
}

// Instancia a classe Calculator e passa os inputs que foram recuperados do DOM
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement,
)

for (const numberButton of numberButtons) {
  numberButton.addEventListener('click', () => {
    calculator.appendNumber(numberButton.innerText)
    calculator.updateDisplay()
  })
}

for (const operationButton of operationButtons) {
  operationButton.addEventListener('click', () => {
    calculator.chooseOperation(operationButton.innerText)
    calculator.updateDisplay()
  })
}

allClearButton.addEventListener('click', () => {
  calculator.clear()
  calculator.updateDisplay()
})

equalsButton.addEventListener('click', () => {
  calculator.calculate()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
  calculator.delete()
  calculator.updateDisplay()
})
