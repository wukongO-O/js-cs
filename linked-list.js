
//use classes
class Node {
    constructor(node) {
        this.node = node;
        this.nextNode = null;
    }
    value() {
        return this.node;
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
    pop() {
        if (this.size() == 0) {
            return;
        } else if (this.size() == 1) {
            this.head = null;
        } else {
            let previousNode = this.head;
            let currentNode5 = this.head.nextNode;
            while(currentNode5.nextNode != null) {
                previousNode = previousNode.nextNode;
                currentNode5 = currentNode5.nextNode;
            }
            previousNode.nextNode = null;
        };
    }
    contains(value) {
        if (this.head == null) return false;
        let currentNode6 = this.head;
        const hasNode = new Node(value);
        while (currentNode6 != null) {  
            if (currentNode6.value() == hasNode.value()) return true;
            currentNode6 = currentNode6.nextNode; 
        }
        return false;
    }
    find(value) {
        if(this.head == null) return null;
        let currentNode7 = this.head;
        const findNode = new Node(value);
        let currentNodeIndex = 0;
        while (currentNode7 != null) {
            if (currentNode7.value() == findNode.value()) return currentNodeIndex;
            currentNode7 = currentNode7.nextNode;
            currentNodeIndex ++;
        }
        return null;
    }
    printList() {
        if (this.head == null) return null;
        let currentNode8 = this.head;
        let listString = '';
        while (currentNode8 != null) {
            listString += '(' + currentNode8.value() + ')' + ' -> ';
            currentNode8 = currentNode8.nextNode;
        }
        return listString + 'null';
    }
}
//testing
let list0 = new LinkedList();
list0.append(2);
list0.append(3);
list0.append(4);
list0.prepend(5);
list0.prepend(6);
//console.log(list0.size());
//console.log(list0.headNode());
//console.log(list0.tailNode());
//console.log(list0.at(3));
//console.log(list0.at(0).value());
//console.log(list0.at(-1));  
//console.log(list0.contains(4));  //true
//console.log(list0.contains(10));  //false
//console.log(list0.find(4));  //4
//console.log(list0.find(5));  //1
console.log(list0.printList());  //(6) -> (5) -> (2) -> (3) -> (4) -> null
//list0.pop();
//console.log(list0.tailNode());

const list00 = new LinkedList();
//console.log(list00.headNode());
//console.log(list00.tailNode());
//console.log(list00.at(0));
//list00.pop()
//console.log(list00);
//console.log(list00.contains(2));  //false
//console.log(list00.find(2));  //null
console.log(list00.printList());  //null
