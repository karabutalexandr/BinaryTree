var ITree = function () {};

ITree.prototype.init = () => {};
ITree.prototype.add = () => {}; // =>>boolean
ITree.prototype.getHeight = () => {}; // =>>int
ITree.prototype.getWidth = () => {}; // =>>int
ITree.prototype.remove = (value) => {}; // =>>int
ITree.prototype.find = (value) => {}; // =>>Node
ITree.prototype.toArray = () => {}; // =>>Arr
ITree.prototype.clear = () => {};
ITree.prototype.getNodes = () => {}; // =>>int
ITree.prototype.getLeaves = () => {}; // =>>int
ITree.prototype.print = () => {}; // =>>String
ITree.prototype.reverse = () => {};




function BSTree() {
    this.root = null;
}

var Node = function(value) {
  this.value = value;
  this.right = null;
  this.left= null;
};

BSTree.prototype.init = function (array) {
    this.clear();
    for (var i = 0; i < array.length; i++) {
        this.add(array[i]);
    }
};

BSTree.prototype.clear = function (array) {
    this.root = null;
};

BSTree.prototype.add = function(value) { // 18 --> 25
    if (value === null) {
        return;
    }
    this.root = this.addNode(this.root, value);
};

BSTree.prototype.addNode = function(node, value) {
    if (node === null) {
        node = new Node(value);
    }
    else if (value < node.value) {
        node.left = this.addNode(node.left, value);
    } else {
        node.right = this.addNode(node.right, value);
    }
    return node;
};

BSTree.prototype.find = function(value) {
    var result = null;
    if(this.root === null) {
        return result;
    }
    if(value === this.root.value) {
        return  this.root;
    }
   
    if(this.root.value > value) {
        this.root = this.root.left;
        result = this.find(value);
        return result;
    }
    if(this.root.value < value) {
        this.root = this.root.right;
        result = this.find(value);
        return result;
    }
}

BSTree.prototype.getLeaves = function() {
    return this.leaves(this.root);
};
  
  BSTree.prototype.leaves = function(node) {
    if (node === null) {
        return 0;
    }
    if (node.left == null && node.right == null)
        return 1;
    else
        return this.leaves(node.left) + this.leaves(node.right);
};

BSTree.prototype.reverse = function () {
    return this.reverseSup(this.root);
};
 
BSTree.prototype.reverseSup = function (node) {
    if(node === null) {
        return;
    }
        // var tempNode = new BSTree();
        tempNode = node.left;
        node.left = node.right;
        node.right = tempNode;

        if(node.left !== null) {
            this.reverseSup(node.left);
        }
        if(node.right !== null) {
            this.reverseSup(node.right)
        }
    };

BSTree.prototype.getNodes = function () {
    return this.nodes(this.root);
};

BSTree.prototype.nodes = function (node) {
    if (node === null) {
        return null;
    }
    if (node.left === null && node.right === null) {
        return 1;
    }
    if(node.left === null) {
        return 1 + this.nodes(node.right);
    }
    if(node.right === null) {
        return 1 + this.nodes(node.left);
    }
    return 1 + this.nodes(node.left) + this.nodes(node.right);
};

// BSTree.prototype.remove = function () {
//     return this.removeSub(this.root);
// };

// BSTree.prototype.removeSub = function (node) {
//     if (node === null) {
//         return null;
//     }
// }

BSTree.prototype.deleteNode = function(key) {
    // If a node is successfully removed, a reference will be received.
    console.log("this.root")
    return !(this.deleteNodeHelper(this.root, key) === false);
}

BSTree.prototype.deleteNodeHelper = function (root, key) {
    if (root === null) {
        console.log("0.5",root);
       // Empty tree return false;
    }
    if (key < root.value) {
       root.left = this.deleteNodeHelper(root.left, key);
       console.log("0.75",root);
       return root;
    } else if (key > root.value) {
       root.right = this.deleteNodeHelper(root.right, key);
       console.log("1",root);
       return root;
    } else {
       // No children
       //case 1 - a leaf node
       if (root.left === null && root.right === null) {
          root = null; 
          console.log("2",root);
          return root;
       }
       // Single Child cases
       if (root.left === null) return root.right;
       if (root.right === null) return root.left;
 
       // Both children, so need to find successor 
       let currNode = root.right;
       while (currNode.left !== null) {
          currNode = currNode.left;
       }
       root.value = currNode.value;
       // Delete the value from right subtree.
       root.right = this.deleteNodeHelper(root.right, currNode.value);
       console.log("3",root);
       return root;
    }
    console.log("4",root);
}

var tree = new BSTree();
tree.init([9,0,30,20,100,4,-12,600,7,200]);
console.log(tree.root);
tree.deleteNode(30);
console.log(tree.root);