// TrieNode class
class TrieNode {
    constructor() {
      this.children = {};
      this.isEndOfWord = false;
    }
  }
  
  // Trie class
  class Trie {
    constructor() {
      this.root = new TrieNode();
    }
  
    insert(word) {
      let node = this.root;
      for (let char of word) {
        if (!node.children[char]) {
          node.children[char] = new TrieNode();
        }
        node = node.children[char];
      }
      node.isEndOfWord = true;
    }
  
    search(word) {
      let node = this.root;
      for (let char of word) {
        if (!node.children[char]) {
          return false;
        }
        node = node.children[char];
      }
      return node.isEndOfWord;
    }
  
    startsWith(prefix) {
      let node = this.root;
      for (let char of prefix) {
        if (!node.children[char]) {
          return false;
        }
        node = node.children[char];
      }
      return true;
    }
  }
  
  // Accept user input via terminal
  const readline = require('readline');
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question("Enter operations (e.g. [\"Trie\",\"insert\",\"search\"]): ", (opsInput) => {
    rl.question("Enter values (e.g. [[],[\"apple\"],[\"apple\"]]): ", (valsInput) => {
      try {
        const ops = JSON.parse(opsInput);
        const vals = JSON.parse(valsInput);
        const output = [];
        let trie;
  
        for (let i = 0; i < ops.length; i++) {
          if (ops[i] === "Trie") {
            trie = new Trie();
            output.push(null);
          } else if (ops[i] === "insert") {
            trie.insert(vals[i][0]);
            output.push(null);
          } else if (ops[i] === "search") {
            output.push(trie.search(vals[i][0]));
          } else if (ops[i] === "startsWith") {
            output.push(trie.startsWith(vals[i][0]));
          } else {
            output.push("Invalid operation: " + ops[i]);
          }
        }
  
        console.log("Output:", output);
      } catch (error) {
        console.log("Invalid input format. Please use valid JSON arrays.");
      }
  
      rl.close();
    });
  });
  