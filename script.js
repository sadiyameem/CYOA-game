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
        text: 'You are a fluffy bunny named Pancake. Today, you hop to the garden, excited to munch on carrots, but something seemed off.',
        options: [
            {
                text: 'Investigate the garden',
                setState: { curious: true },
                nextText: 2
            },
            {
                text: 'Play in the meadow instead',
                nextText : 2
            }
        ]
    },
    {
        id: 2,
        text: 'You discover that all of the carrots are missing! The only thing you see are holes in the ground where the carrots should be.',
        options: [
            {
                text: 'Figure out who the culprit is',
                requiredState: (currentState) => currentState.curious,
                setState: { curious: false, brave: true},
                nextText: 3
            },
            {
                text: 'Ignore it and hop away sadly',
                requiredState: (currentState) => currentState.blueGoo,
                setState: { curious: false, },
                nextText: 3
            },
        ]
    },
    {
        id: 3,
        text: 'You spend the day hopping around the meadow, but the missing carrots still make you sad.',
        options: [
            {
                text: 'Restart',
                nextText: -1,
            },
        ]
    },
    {
        id: 4,
        text: 'While hopping through the meadow, you find a group of squirrels munching on the carrots behind a bush. You need a plan.',
        options: [
            {
                text: 'Ask the squirrels to share the carrots',
                setState: { friendly: true },
                nextText: 5
            },

            {
                text: 'Take the carrots back for yourself',
                setState: { brave: false },
                nextText: 6
            }
        ]
    },
    {
        id: 5,
        text: 'The squirrels agree to share. You all nibble carrots together.',
        options: [
            {
                text: 'Enjoy the day with your new friends',
                nextText: -1
            },
        ]
    },
    {
        id: 6,
        text: 'You try to be sneaky and make an attempt to grab the carrots and make a run for it, but the squirrels knew right away and ran with them.',
        options: [
            {
                text: 'Go back to the meadow alone',
                nextText: -1
            },
        ]
    },
//     {
//     //     id: 7,
//     //     text: 'You rally the other rabbits and set clever traps. The fox is scared off, and your burrow is safe!',
//     //     options: [
//     //         {
//     //             text: 'Celebrate with the burrow',
//     //             nextText: 10
//     //         },
//     //     ]
//     // },
//     // {
//     //     id: 8,
//     //     text: 'You solve the puzzle and find the Bunny Treasure: a unlimited supply of carrots. You return to your burrow as a hero!',
//     //     options: [
//     //         {
//     //             text: 'Play Again',
//     //             nextText: -1
//     //         }
//     //     ]
//     // },
//     // {
//     //     id: 9,
//     //     text: 'You leave the treasure but return safely to your burrow. Life goes on peacefully with no problems.',
//     //     options: [
//     //         {
//     //             text: 'Restart',
//     //             nextText: -1
//     //         }
//     //     ]
//     // },
//     // {
//     //     id: 10,
//     //     text: 'The burrow celebrates your bravery. You are honored as a defender of the meadow!',
//     //     options: [
//     //         {
//     //             text: 'Congratulations. Play Again.',
//     //             nextText: -1
//     //         }
//     //     ]
//     // },

]

startGame()