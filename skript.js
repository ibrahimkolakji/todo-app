let inputFeld = document.getElementById("neue-aufgabe");
let butBest = document.getElementById("bestaetigen");
let aufgabenListe = document.getElementById("leer");
let aufgaben = [];

// ▶ Filter-Buttons
const filterAlle = document.getElementById("filter-alle");
const filterOffen = document.getElementById("filter-offen");
const filterErledigt = document.getElementById("filter-erledigt");

// ▶ Beim Laden: Aufgaben aus localStorage holen
if (localStorage.getItem("aufgaben")) {
  aufgaben = JSON.parse(localStorage.getItem("aufgaben"));
  aufgaben.forEach(aufgabe => erstelleAufgabe(aufgabe));
}

// ▶ Neue Aufgabe hinzufügen
butBest.addEventListener("click", function () {
  let aufgabeText = inputFeld.value.trim();
  if (aufgabeText === "") return;

  let aufgabe = {
    text: aufgabeText,
    erledigt: false
  };

  aufgaben.push(aufgabe);
  localStorage.setItem("aufgaben", JSON.stringify(aufgaben));
  erstelleAufgabe(aufgabe);
  inputFeld.value = "";
});

// ▶ Enter zum Hinzufügen
inputFeld.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    butBest.click();
  }
});

// ▶ Aufgabe anzeigen
function erstelleAufgabe(aufgabe) {
  let neuesLi = document.createElement("li");

  let textSpan = document.createElement("span");
  textSpan.className = "aufgaben-text";
  textSpan.textContent = aufgabe.text;

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = aufgabe.erledigt;

  if (checkbox.checked) {
    textSpan.style.textDecoration = "line-through";
  }

  // wichtig für Filter:
  neuesLi.dataset.erledigt = aufgabe.erledigt;

  checkbox.addEventListener("change", function () {
    aufgabe.erledigt = checkbox.checked;
    textSpan.style.textDecoration = checkbox.checked ? "line-through" : "none";
    neuesLi.dataset.erledigt = checkbox.checked;
    localStorage.setItem("aufgaben", JSON.stringify(aufgaben));
  });

  let loeschen = document.createElement("button");
  loeschen.textContent = "🗑️";
  loeschen.className = "icon-button";
  loeschen.addEventListener("click", function () {
    let index = aufgaben.indexOf(aufgabe);
    if (index > -1) {
      aufgaben.splice(index, 1);
      localStorage.setItem("aufgaben", JSON.stringify(aufgaben));
    }
    neuesLi.remove();
  });

  let bearbeiten = document.createElement("button");
  bearbeiten.textContent = "✏️";
  bearbeiten.className = "icon-button";
  bearbeiten.addEventListener("click", function () {
    let eingabe = document.createElement("input");
    eingabe.type = "text";
    eingabe.value = aufgabe.text;

    let speichern = document.createElement("button");
    speichern.textContent = "✔️";
    speichern.className = "icon-button";

    speichern.addEventListener("click", function () {
      aufgabe.text = eingabe.value;
      localStorage.setItem("aufgaben", JSON.stringify(aufgaben));
      location.reload();
    });

    eingabe.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        speichern.click();
      }
    });

    neuesLi.innerHTML = "";
    neuesLi.appendChild(eingabe);
    neuesLi.appendChild(speichern);
  });

  let buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";
  buttonContainer.appendChild(checkbox);
  buttonContainer.appendChild(bearbeiten);
  buttonContainer.appendChild(loeschen);

  neuesLi.appendChild(textSpan);
  neuesLi.appendChild(buttonContainer);
  aufgabenListe.appendChild(neuesLi);
}

// ▶ Filter-Funktion
function filterAufgaben(typ) {
  const eintraege = document.querySelectorAll("#leer li");

  eintraege.forEach(li => {
    const status = li.dataset.erledigt;

    if (typ === "alle") {
      li.style.display = "flex";
    } else if (typ === "offen" && status === "false") {
      li.style.display = "flex";
    } else if (typ === "erledigt" && status === "true") {
      li.style.display = "flex";
    } else {
      li.style.display = "none";
    }
  });
}

// ▶ Filter-Button Events
filterAlle.addEventListener("click", () => filterAufgaben("alle"));
filterOffen.addEventListener("click", () => filterAufgaben("offen"));
filterErledigt.addEventListener("click", () => filterAufgaben("erledigt"));
