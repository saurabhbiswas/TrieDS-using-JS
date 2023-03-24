function Node() {
  this.keys = new Map();
  this.end = false;
  this.setEnd = function () {
    this.end = true;
  };
  this.isEnd = function () {
    return this.end;
  };
}
function Trie() {
  this.root = new Node();
  this.add = function (input, node = this.root) {
    if (input.length === 0) {
      node.setEnd();
      return;
    } else if (!node.keys.has(input[0])) {
      node.keys.set(input[0], new Node());
      return this.add(input.substr(1), node.keys.get(input[0]));
    } else {
      return this.add(input.substr(1), node.keys.get(input[0]));
    }
  };

  this.isWord = function (input) {
    let node = this.root;
    while (input.length > 1) {
      if (!node.keys.has(input[0])) {
        return false;
      } else {
        node = node.keys.get(input[0]);
        input = input.substr(1);
      }
    }
    //return true;
    return node.keys.has(input) ? true : false;
  };

  this.display = function () {
    let words = [];
    let search = function (node, string) {
      if (node.keys.size !== 0) {
        for (let letter of node.keys.keys()) {
          search(node.keys.get(letter), string.concat(letter));
        }
        if (node.isEnd()) {
          words.push(string);
        }
      } else {
        if (string.length) words.push(string);
        return;
      }
    };
    search(this.root, "");
    return console.log(words);
  };
}
//Just to display in code..
window.console = {
  log: function (str) {
    var node = document.createElement("div");
    node.appendChild(document.createTextNode(str));
    document.getElementById("myLog").appendChild(node);
  },
  error: function (str) {
    var node = document.createElement("div");
    node.appendChild(document.createTextNode(str));
    document.getElementById("myLog").appendChild(node);
  }
};

let TT = new Trie();
TT.add("react18lessmore");
TT.add("ccsa");

TT.add("ccs4fraf");
TT.display();
console.log(TT.isWord("aad5tyuioaad"));
console.log(TT.isWord("ccs"));
