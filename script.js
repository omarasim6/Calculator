const display = document.querySelector('input[name="display"]');

// Keep cursor blinking by focusing input after each update
function focusDisplay() {
    display.focus();
}

function appendSymbol(symbol) {
    if (display.value === "Error" || display.value === "Empty Input") {
        display.value = "";
    }
    display.style.color = "white";
    display.value += symbol;
    focusDisplay();
}

function clearDisplay() {
    display.style.color = "white";
    display.value = "";
    focusDisplay();
}

function deleteLast() {
    display.style.color = "white";
    display.value = display.value.slice(0, -1);
    focusDisplay();
}

function evaluateExpression() {
    if (display.value.trim() === "") {
        display.style.color = "red";
        display.value = "Empty Input";
        fakeCursor.style.display = "none";
        setTimeout(() => {
            clearDisplay();
            fakeCursor.style.display = "inline";
        }, 1500);
        return;
    }

    try {
        let result = display.value
            .replace(/÷/g, '/')
            .replace(/x/g, '*');

        if (result.includes('%')) {
            result = result.replace(/(\d+)%/g, (match, p1) => (parseFloat(p1) / 100));
        }

        display.value = eval(result);
        display.style.color = "white";
    } catch (error) {
        display.style.color = "red";
        display.value = "Error";
        setTimeout(() => {
            clearDisplay();
        }, 1500);
    }
    focusDisplay();
}

// Attach event listeners to buttons
document.querySelectorAll('.number').forEach(btn => {
    btn.addEventListener('click', () => appendSymbol(btn.value));
});

document.querySelectorAll('.operator').forEach(btn => {
    btn.addEventListener('click', () => appendSymbol(btn.value));
});

document.querySelector('.decimal').addEventListener('click', () => appendSymbol('.'));

document.querySelector('.delete').addEventListener('click', clearDisplay);

document.querySelector('.backspace').addEventListener('click', deleteLast);

document.querySelector('.equal').addEventListener('click', evaluateExpression);

// Keyboard support
window.addEventListener('keydown', function (e) {
    const key = e.key;

    if ((key >= '0' && key <= '9') || ['+', '-', '*', '/', '.', '%'].includes(key)) {
        appendSymbol(key);
    } else if (key === 'Enter') {
        e.preventDefault();
        evaluateExpression();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});

// Focus the input on page load to show cursor blinking immediately
window.onload = () => {
    focusDisplay();
};
