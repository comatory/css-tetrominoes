const sizeInput = document.querySelector("#size-control");
const sizeOutput = document.querySelector("#size-output");

const rotationInputs = document.getElementsByName('rotation');
const root = document.querySelector(":root");

function setBaseSize(value) {
  root.style.setProperty("--base-size", `${value}px`);
  window.localStorage.setItem('baseSize', value);
}

function setBaseRotation(value) {
  const shapes = Array.from(document.querySelectorAll('.gallery-shape'))
  
  for (const el of shapes) {
    if (el.dataset.degree === value) {
      el.classList.remove('hidden')
    } else {
      el.classList.add('hidden')
    }
  }
  
  window.localStorage.setItem('baseRotation', value);
}

function getRotationValue() {
  const checkedElement = Array.from(rotationInputs).find((el) => el.checked);
  
  return checkedElement?.value ?? null;
}

function setRotationValue(value) {
  const element = Array.from(rotationInputs).find((el) => el.value === value);
  
  if (!element) {
    return; 
  }
  
  element.checked = true;
}

const storedSize = window.localStorage.getItem('baseSize');
sizeInput.value = storedSize ?? "40";
sizeOutput.innerText = sizeInput.value;
setBaseSize(sizeInput.value);

const storedRotation = window.localStorage.getItem('baseRotation');

if (storedRotation) {
  setRotationValue(storedRotation)
}

setBaseRotation(getRotationValue())

sizeInput.addEventListener("input", (e) => {
  const { value } = e.target;
  sizeOutput.innerText = value;
  setBaseSize(value);
});

for (const input of rotationInputs) {
  input.addEventListener('change', (event) => {
    if (!event.target.checked) {
      return;
    }
    
    setBaseRotation(event.target.value);
  })
}