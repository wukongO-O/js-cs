
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
}
let list0 = new LinkedList();
list0.append(2);
list0.append(3);
list0.append(4);
list0.prepend(5);
list0.prepend(6);
console.log(list0);
