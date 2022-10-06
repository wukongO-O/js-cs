
//use classes
class Node {
    constructor(node) {
        this.node = node;
        this.nextNode = null;
    }
    value() {
        return this.node.value = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null; 
    }
    append(value) {
        let appendNode = new Node(value);
        let currentNode;
        if (this.head == null) {
            this.head = appendNode;
        } else {
            currentNode = this.head;
            while(currentNode.nextNode != null) {
                currentNode = currentNode.nextNode;
            }
            currentNode.nextNode = appendNode;
        };
    }
    prepend(value) {
        let prependNode = new Node(value);
        if(this.head == null) {
            this.head = prependNode;;
        } else {
            prependNode.nextNode = this.head;
            this.head = prependNode;
        };
    }
    size() {
        if (this.head == null) {
            return 0;
        }else {
            let listSize = 1;
            let currentNode2; 
            currentNode2 = this.head;
            while (currentNode2.nextNode != null) {
                listSize ++; 
                currentNode2 = currentNode2.nextNode;
            }
            return listSize;
        };
    }
    headNode() {
        return this.head;
    }
    tailNode() {
        if (this.size() == 0 || this.size() == 1) return this.head;
        let currentNode3 = this.head;
        while (currentNode3.nextNode != null) {
            currentNode3 = currentNode3.nextNode;
        }
        return currentNode3;
    }
    at(index) {
        if (this.size() == 0 || this.size() <= index || index < 0) {
            return null;
        } else if (index == 0) {
            return this.head;
        } else {
            let nodeIndex = 0;
            let currentNode4 = this.head;
            while (nodeIndex < index && currentNode4 != null) {
                nodeIndex ++;
                currentNode4 = currentNode4.nextNode;
            }
            return currentNode4;
        }
    }
}
let list0 = new LinkedList();
list0.append(2);
list0.append(3);
list0.append(4);
list0.prepend(5);
list0.prepend(6);
//console.log(list0.size());
//console.log(list0.headNode());
//console.log(list0.tailNode());
console.log(list0.at(3));
console.log(list0.at(0));
console.log(list0.at(-1));
const list00 = new LinkedList();
//console.log(list00.headNode());
//console.log(list00.tailNode());
console.log(list00.at(0));


