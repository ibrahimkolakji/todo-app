let inputFeld = document.getElementById("neue-aufgabe");
let butBest = document.getElementById("bestaetigen");
let aufgabenListe = document.getElementById("leer");
let aufgaben = [];

// Beim Laden: gespeicherte Aufgaben aus localStorage holen
if (localStorage.getItem("aufgaben")) {
    aufgaben = JSON.parse(localStorage.getItem("aufgaben")); // Hier: gleich ins Array laden!

    aufgaben.forEach(function(aufgabeText) {
        let neuesLi = document.createElement("li");
        neuesLi.textContent = aufgabeText;

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        let loeschen = document.createElement("button");
        loeschen.textContent = "Ent";

        checkbox.addEventListener("change", function() {
            if (checkbox.checked) {
                neuesLi.style.textDecoration = "line-through";
            } else {
                neuesLi.style.textDecoration = "none";
            }
        });

        loeschen.addEventListener("click", function() {
            let index = aufgaben.indexOf(aufgabeText);
            if (index > -1) {
                aufgaben.splice(index, 1);
                localStorage.setItem("aufgaben", JSON.stringify(aufgaben));
            }
            neuesLi.remove();
        });

        neuesLi.appendChild(checkbox);
        neuesLi.appendChild(loeschen);
        aufgabenListe.appendChild(neuesLi);
    });
}

// Beim Klick auf den Bestätigen-Button
butBest.addEventListener("click", function() {
    let aufgabeText = inputFeld.value.trim();

    if (aufgabeText === "") {
        return; // Leere Aufgaben werden ignoriert
    }

    let neuesLi = document.createElement("li");
    neuesLi.textContent = aufgabeText;

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    let loeschen = document.createElement("button");
    loeschen.textContent = "Ent";

    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            neuesLi.style.textDecoration = "line-through";
        } else {
            neuesLi.style.textDecoration = "none";
        }
    });

    loeschen.addEventListener("click", function() {
        let index = aufgaben.indexOf(aufgabeText);
        if (index > -1) {
            aufgaben.splice(index, 1);
            localStorage.setItem("aufgaben", JSON.stringify(aufgaben));
        }
        neuesLi.remove();
    });

    neuesLi.appendChild(checkbox);
    neuesLi.appendChild(loeschen);
    aufgabenListe.appendChild(neuesLi);

    aufgaben.push(aufgabeText);
    localStorage.setItem("aufgaben", JSON.stringify(aufgaben));

    inputFeld.value = ""; // Eingabe leeren
});
