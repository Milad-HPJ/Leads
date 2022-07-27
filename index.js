let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("tab-btn");

// localStorage.clear();
// Checks if the leasFromLocalStoreg has value or not and store it in myLeads.
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

tabBtn.addEventListener("click", function () {
  // Gets current active tab URL.
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads)); // stores myLeads in local storage.
    render(myLeads);
  });
});

// Renders all inputs on HTML page by .innerHTML
function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
      <li>
        <a target='_blank' href='${leads[i]}'>
          ${leads[i]}
        </a>
      </li>
    `;
  }

  ulEl.innerHTML = listItems; // Because DOM minipulatin is expensiv, we apply it outsid of for loop.

  // OR:
  //   let liEl = document.createElement("li");
  //   liEl.textContent = inputEl.value;
  //   ulEl.appendChild(liEl);
}

// Delets all localStorage and leads on double click.
deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

// asign the input value to myLeads and calls render().
inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = ""; //clears the field.
  localStorage.setItem("myLeads", JSON.stringify(myLeads)); // stores myLeads in local storage.
  render(myLeads);
});

// leads is a chrome extention that can give value to sales development representatives or any person collecting leads online.