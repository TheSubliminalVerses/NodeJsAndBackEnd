/**
 * This webpage is written by Mani Gudvardarson and Michael Adrian Polesensky
 * for Assignment 2 in Web Technology at VU University Amsterdam.
 *
 * Coordinator: J.R . van Ossenbruggen
 * TA: Mithat Ozgun
 * Group: 109
 * Date: 20.1.2022
 */
const linkElements = document.getElementsByClassName("order")
const typewrite = document.getElementById("type")
const aboutBtn = document.getElementById("about")
const closeBtn = document.getElementById("close")

aboutBtn.addEventListener("click", function () {
    const box = document.getElementById("box")

    box.style.animation = "zoomIn 550ms linear forwards"
})

closeBtn.addEventListener("click", function () {
    const box = document.getElementById("box")

    box.style.animation = "zoomOut 550ms linear forwards"
})

window.addEventListener("load", function () {
    bind("click", linkElements, [function (event) {
        let parentElement = document.getElementById("body-1")
        let children = makeElementArray(parentElement)

        orderElementList(children, 0, parentElement, 0)
    }, function () {
        let parentElement = document.getElementById("body-1")
        let children = makeElementArray(parentElement)

        orderElementList(children, 1, parentElement, 0)
    }, function () {
        let parentElement = document.getElementById("body-1")
        let children = makeElementArray(parentElement)

        orderElementList(children, 2, parentElement, 0)
    }, function () {
        let parentElement = document.getElementById("body-1")
        let children = makeElementArray(parentElement)

        orderElementList(children, 3, parentElement, 0)
    }, function () {
        let parentElement = document.getElementById("body-2")
        let children = makeElementArray(parentElement)

        orderElementList(children, 0, parentElement, 0)
    }, function () {
        let parentElement = document.getElementById("body-2")
        let children = makeElementArray(parentElement)

        orderElementList(children, 1, parentElement, 0)
    }, function () {
        let parentElement = document.getElementById("body-2")
        let children = makeElementArray(parentElement)

        orderElementList(children, 2, parentElement, 0)
    }, function () {
        let parentElement = document.getElementById("body-2")
        let children = makeElementArray(parentElement)

        orderElementList(children, 3, parentElement, 0)
    }])

    typePhrase()
})

/**
 * @function Used for sorting rows in the table in alphabetical order. Used to sort the table rows.
 * @param {Element[]} children
 * @param {number} index
 * @param {Element} parentElement
 * @param {number} Start
 */
function orderElementList(children, index, parentElement, Start) {
    children.sort((a, b) => {
        if (a.children[index].hasAttribute('data-value') && b.children[index].hasAttribute('data-value')) {
            if (a.children[index].getAttribute('data-value') > b.children[index].getAttribute('data-value')) {
                return -1
            } else if (a.children[index].getAttribute('data-value') < b.children[index].getAttribute('data-value')) {
                return 1
            }

            return 0
        } else {
            if (a.children[index].innerText[Start].toLowerCase() > b.children[index].innerText[Start].toLowerCase()) {
                return 1
            } else if (a.children[index].innerText[Start].toLowerCase() < b.children[index].innerText[Start].toLowerCase()) {
                return -1
            }

            return 0
        }
    })

    for (let child of children) {
        parentElement.removeChild(child)
    }

    children.forEach(child => {
        parentElement.appendChild(child)
    })
}

/**
 * @function Used to bulk bind events callback functions to an array of html elements.
 * @param {string} eventType
 * @param {HTMLCollectionOf<Element>} elements
 * @param {EventListenerOrEventListenerObject[]} listenerCollection
 */
function bind(eventType, elements, listenerCollection) {
    for (let i = 0; i < listenerCollection.length; i++) {
        elements[i].addEventListener(eventType, listenerCollection[i])
    }
}

/**
 * @function Used to get the children of the parent element so they can be manipulated.
 * @param {Element} parentElement
 * @returns {Element[]}
 */
function makeElementArray(parentElement) {
    let arr = []

    for (let child of parentElement.children) {
        if (child.getAttribute("class") !== "input-row") {
            arr.push(child)
        }
    }

    return arr
}

/**
 * @function Sleep - pauses the execution of an async function
 * @param {number} timeInMs
 * @returns {Promise<void>}
 */
async function sleep(timeInMs) {
    return new Promise(resolve => setInterval(resolve, timeInMs))
}

/**
 * @function typePhrase - typing animation
 * @returns {void}
 */
async function typePhrase() {
    let toType = typewrite.getAttribute("phrase")
    let str = ""

    for (let char of toType) {
        str += char
        typewrite.innerText = str

        await sleep(Math.floor(Math.random() * 1500))
    }

    typePhrase()
}