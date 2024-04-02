import { BinaryTreeNode } from './BinaryTreeNode.js'
// object having default properties 
export const DEFAULT_CONFIG = {
    radius: 20,
    nodeWidthSpacing: 25,
    nodeHeightSpacing: 100, // lineHeight
    fontSize: 10
}



// function to determine the required height and width 
// of the canvas 

export function getRequiredHeightAndWidth(root) {
    const heightOfTree = root.getHeight();
    const maxLeafNodes = Math.pow(2, heightOfTree);
    const requiredCanvasWidth = maxLeafNodes * DEFAULT_CONFIG.nodeWidthSpacing;
    const requiredCanvasHeight = heightOfTree * DEFAULT_CONFIG.nodeHeightSpacing;


    return {
        requiredCanvasWidth,
        requiredCanvasHeight
    }
}
// function to draw node [a circle + its border + a number inside it] 
export function drawNode(value, canvasElement, x, y) {
    const context = canvasElement.getContext('2d'); // tool to draw

    // Draw circle
    context.beginPath();
    context.arc(x, y, DEFAULT_CONFIG.radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'lightsalmon';
    context.fill();

    // Draw circle border
    context.beginPath();
    context.arc(x, y, DEFAULT_CONFIG.radius, 0, 2 * Math.PI, false);
    context.strokeStyle = 'brown';
    context.stroke();

    // Write value inside tree node
    context.font = `${DEFAULT_CONFIG.fontSize}pt serif`;
    context.fillStyle = 'brown';
    context.textAlign = 'center';
    context.fillText(value, x, y + DEFAULT_CONFIG.fontSize/2);
}



// Now we are drawing edges of complete tree 
export function connectEdges(canvasElement, xCoordinates, yCoordinates) {
    const { xStart, xEnd } = xCoordinates;
    const { yStart, yEnd } = yCoordinates;

    const xHalf = (xStart + xEnd) / 2;
    const yHalf = (yStart + yEnd) / 2;

    const start = { x: xStart, y: yStart };
    const cpoint1 = { x: xHalf, y: yHalf };
    const cpoint2 = { x: xEnd, y: yHalf };
    const end = { x: xEnd, y: yEnd };


    // Draw curve or line 
    const context = canvasElement.getContext('2d');
    context.beginPath();
    context.strokeStyle = 'brown';
    context.moveTo(start.x, start.y);
    context.bezierCurveTo(cpoint1.x, cpoint1.y, cpoint2.x, cpoint2.y, end.x, end.y);

    // context.lineTo(end.x, end.y);
    context.stroke();
}

export function treeConstructor(input) {
    input = parseInput(input);

    const queue = [];

    let idx = 0;
    const root = new BinaryTreeNode(input[idx]);
    idx++;

    queue.push(root);

    while (queue.length > 0 && idx < input.length) {
        const node = queue.shift();

        // Left child
        if (idx < input.length) {
            if (input[idx] !== null) {
                const leftNode = new BinaryTreeNode(input[idx]);
                node.setLeft(leftNode);
                queue.push(leftNode);
            }
            idx++;
        }

        // Right child
        if (idx < input.length) {
            if (input[idx] !== null) {
                const rightNode = new BinaryTreeNode(input[idx]);
                node.setRight(rightNode);
                queue.push(rightNode);
            }
            idx++;
        }
    }

    return root;
}

function parseInput(input) {
    let parsedInput = '';

    for (let i = 0; i < input.length; i++) {
        const ch = input.charAt(i);
        if (ch !== ' ') parsedInput += ch;
    }

    return parsedInput.split(',')
    .map(elem => {
        if (elem === 'null') return null;
        else return elem;
    })
}