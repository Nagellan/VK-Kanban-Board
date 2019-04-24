function addCard(btn) {
    var cardsWrapper = btn.parentElement.getElementsByClassName('cards-wrapper')[0],
        emptyCard = getElementFromTemplate(document.getElementById('empty-card'));
    
    cardsWrapper.appendChild(emptyCard)

    replaceBlock(btn, getElementFromTemplate(document.getElementById("save-cancel-card")));
    emptyCard.firstElementChild.focus();
}

function saveCard(btn) {
    var card = getGrandParent(btn).getElementsByClassName('card new')[0],
        cardInput = card.firstElementChild,
        addCardBtn = getElementFromTemplate(document.getElementById("add-card"));

    if (cardInput.value.replace(/\s/g, '') != "") {
        cardInput.readOnly = true;
        card.classList.remove('new');
        replaceBlock(btn.parentElement, addCardBtn);
    }
    else {        
        cardInput.value = "";
        cardInput.focus();
    }
}

function cancelCard(btn) {
    var newCard = getGrandParent(btn).getElementsByClassName('new')[0],
        addCardBtn = getElementFromTemplate(document.getElementById("add-card"));

    newCard.remove();
    replaceBlock(btn.parentElement, addCardBtn);
}

function addColumn(btn) {
    if (document.getElementsByClassName('column new').length == 0) {
        var emptyColumn = getElementFromTemplate(document.getElementById('empty-column'));

        document.getElementsByTagName('main')[0].insertBefore(emptyColumn, btn);
        emptyColumn.getElementsByClassName('title')[0].firstElementChild.focus();
    }
}

function saveColumn(btn) {
    var column = document.getElementsByClassName('column new')[0],
        colInput = column.getElementsByClassName('title')[0].firstElementChild,
        addCardBtn = getElementFromTemplate(document.getElementById("add-card"));

    if (colInput.value.replace(/\s/g, '') != "") {
        colInput.readOnly = true;
        column.classList.remove('new');
        replaceBlock(btn.parentElement, addCardBtn);
    }
    else {
        colInput.value = "";
        colInput.focus();
    }
}

function cancelColumn(btn) {
    var newColumn = document.getElementsByClassName('column new')[0];

    newColumn.remove();
}

function replaceBlock(block1, block2) {
    block1.parentNode.replaceChild(block2, block1);
}

function getGrandParent(el) {
    return el.parentElement.parentElement;
}

/**
 * Transform given template block into the element.
 * @param {HTMLElement} template - Template block.
 * @returns {HTMLElement} Block inside the template.
 */
function getElementFromTemplate(template) {
    return template.content.children.item(0).cloneNode(true);
}