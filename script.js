/**
 * Create a new empty card.
 * @param {HTMLElement} btn - Add card button which called the function.
 * @returns {void} Nothing, just perform necessary action(s).
 */
function addCard(btn) {
    var cardsWrapper = btn.parentElement.getElementsByClassName('cards-wrapper')[0],
        emptyCard = getElementFromTemplate(document.getElementById('empty-card'));
    
    emptyCard.id = "card-" + document.getElementsByClassName('card').length;
    cardsWrapper.appendChild(emptyCard)

    replaceBlock(btn, getElementFromTemplate(document.getElementById("save-cancel-panel")));
    emptyCard.firstElementChild.focus();
}

/**
 * Save the data inside the newly created card, complete creation.
 * @param {HTMLElement} btn - Save button which called the function.
 * @returns {void} Nothing, just perform necessary action(s).
 */
function saveCard(btn) {
    var card = getGrandParent(btn).getElementsByClassName('card new')[0],
        cardInput = card.firstElementChild,
        addCardBtn = getElementFromTemplate(document.getElementById("add-card"));

    if (cardInput.value.replace(/\s/g, '') != "") {
        cardInput.readOnly = true;
        card.classList.remove('new');
        card.setAttribute('draggable', true);
        replaceBlock(btn.parentElement, addCardBtn);
        addCardBtn.focus();
    }
    else {        
        cardInput.value = "";
        cardInput.focus();
    }
}

/**
 * Cancel the creation of a card.
 * @param {HTMLElement} btn - Cancel button which called the function.
 * @param {Event} e - Escape ley handle event called the function, if exists.
 * @returns {void} Nothing, just modify the element(s).
 */
function cancelCard(btn, e=null) {
    if (e != null && e.key == 'Escape')
        btn = getGrandParent(btn).parentElement.getElementsByClassName('cancel-btn')[0];

    if (e == null || (e != null && e.key == 'Escape')) {
        var newCard = getGrandParent(btn).getElementsByClassName('new')[0],
            addCardBtn = getElementFromTemplate(document.getElementById("add-card"));

        newCard.remove();
        replaceBlock(btn.parentElement, addCardBtn);
        addCardBtn.focus();
    }
}

/**
 * Create a new empty column.
 * @param {HTMLElement} btn - Add column button which called the function.
 * @returns {void} Nothing, just perform necessary action(s).
 */
function addColumn(btn) {
    if (document.getElementsByClassName('column new').length == 0) {
        var emptyColumn = getElementFromTemplate(document.getElementById('empty-column'));

        document.getElementsByTagName('main')[0].insertBefore(emptyColumn, btn);
        emptyColumn.getElementsByClassName('col-title')[0].focus();
    }
}

/**
 * Save the data inside the newly created column, complete creation.
 * @param {HTMLElement} btn - Save button which called the function.
 * @returns {void} Nothing, just perform necessary action(s).
 */
function saveColumn(btn) {
    var column = document.getElementsByClassName('column new')[0],
        colTitle = column.getElementsByClassName('col-title')[0],
        addCardBtn = getElementFromTemplate(document.getElementById("add-card"));

    if (colTitle.value.replace(/\s/g, '') != "") {
        colTitle.readOnly = true;
        column.classList.remove('new');
        replaceBlock(btn.parentElement, addCardBtn);
        addCardBtn.focus();
    }
    else {
        colTitle.value = "";
        colTitle.focus();
    }
}

/**
 * Cancel the creation of a column.
 * @param {HTMLElement} btn - Cancel button which called the function.
 * @param {Event} e - Escape ley handle event called the function, if exists.
 * @returns {void} Nothing, just modify the element(s).
 */
function cancelColumn(btn, e=null) {
    if (e != null && e.key == 'Escape')
        btn = btn.parentElement.getElementsByClassName('cancel-btn')[0];

    if (e == null || (e != null && e.key == 'Escape')) {
        var newColumn = document.getElementsByClassName('column new')[0];
        newColumn.remove();
        document.getElementsByClassName('add-column')[0].focus();
    }
}

/**
 * Replace one block by another.
 * @param {HTMLElement} block1 - Block to be replaced.
 * @param {HTMLElement} block2 - Block to replace.
 * @returns {void} Nothing, just modify the element(s).
 */
function replaceBlock(block1, block2) {
    block1.parentNode.replaceChild(block2, block1);
}

/**
 * Get block's grandparent.
 * @param {HTMLElement} elem - Original block.
 * @returns {HTMLElement} Block's grandparent.
 */
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

/**
 * Provide the block's dran'n'drop movement.
 * @param {Event} e - onDragStart event.
 * @returns {void} Nothing, just perform necessary action(s).
 */
function drag(e) {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData('card-id', e.target.id);
}

/**
 * Provide the block's dran'n'drop placement.
 * @param {Event} e - onDragOver event.
 * @returns {void} Nothing, just perform necessary action(s).
 */
function dragOver(e) {
    e.preventDefault();
}

/**
 * Provide the block's dran'n'drop placement inside a new container.
 * @param {Event} e - onDrop event.
 * @param {HTMLElement} block - New container for dropped element.
 * @returns {void} Nothing, just perform necessary action(s).
 */
function drop(e, block) {
    e.preventDefault();
    var cardId = e.dataTransfer.getData('card-id');
    block.getElementsByClassName('cards-wrapper')[0].appendChild(document.getElementById(cardId))
}