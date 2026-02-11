const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: 'You are a young bunny living in the meadow. One morning, you notice strange footprints leading into the forest.',
        options: [
            {
                text: 'Follow the footprints',
                setState: { blueGoo: true },
                nextText: 2
            },
            {
                text: 'Ignore them and play in the meadow',
                nextText : 2
            }
        ]
    },
    {
        id: 2,
        text: 'You follow the footprints and find a mysterious glowing carrot.',
        options: [
            {
                text: 'Take the glowing carrot',
                requiredState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, sword: true},
                nextText: 3
            },
            {
                text: 'Leave it alone',
                requiredState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, shield: true},
                nextText: 3
            },
        ]
    },
    {
        id: 3,
        text: 'You spend the day playing in the meadow, but a fox sneaks near the burrow. You hear crying from the elder rabbits.',
        options: [
            {
                text: 'Help warn the burrow',
                nextText: 4,
            },
            {
                text: 'Hide in the grass',
                nextText: 5
            },
        ]
    },
    {
        id: 4,
        text: 'Deeper in the forest, you meet a wise owl who offers guidance. He says you can either try to find the hidden Bunny Treasure or help protect the burrow from the fox.',
        options: [
            {
                text: 'Seek the Bunny Treasure',
                nextText: 6
            },

            {
                text: 'Protect the burrow',
                nextText: 7
            }
        ]
    },
    {
        id: 5,
        text: 'The fox spots you while you hide! You barely escape, but you learn the importance of helping your burrow.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 6,
        text: 'You follow clues to an ancient tree where the Bunny Treasure is hidden. A puzzle blocks your way.',
        options: [
            {
                text: 'Solve the puzzle',
                nextText: 8
            },
            {
                text: 'Leave the treasure and return home',
                nextText: 9
            }
        ]
    },
    {
        id: 7,
        text: 'You rally the other rabbits and set clever traps. The fox is scared off, and your burrow is safe!',
        options: [
            {
                text: 'Celebrate with the burrow',
                nextText: 10
            },
        ]
    },
    {
        id: 8,
        text: 'You solve the puzzle and find the Bunny Treasure: a unlimited supply of carrots. You return to your burrow as a hero with the carrots!',
        options: [
            {
                text: 'Play Again',
                nextText: -1
            }
        ]
    },
    {
        id: 9,
        text: 'You leave the treasure but return safely to your burrow. Life goes on peacefully with no problems.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 10,
        text: 'The burrow celebrates your bravery. You are honored as a defender of the meadow!',
        options: [
            {
                text: 'Congratulations. Play Again.',
                nextText: -1
            }
        ]
    },

]

startGame()