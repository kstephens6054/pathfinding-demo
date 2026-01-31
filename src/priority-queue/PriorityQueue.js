import { transformWithEsbuild } from "vite";

const QueueNode = (key, item) => ({ key, item });

class PriorityQueue {
  static parent(i) {
    return Math.floor((i - 1) / 2);
  }

  static leftChild(i) {
    return 2 * i + 1;
  }

  static rightChild(i) {
    return 2 * i + 2;
  }

  constructor(nodes, compare) {
    this.nodes = nodes || [];
    this.compare = compare;
    this.indexMap = new Map();

    nodes.forEach((node, index) => {
      this.indexMap.set(node.key, index);
    });

    this.heapify();
  }
  get length() {
    return this.nodes.length;
  }

  swap(i, j) {
    const temp = this.nodes[i];
    this.nodes[i] = this.nodes[j];
    this.nodes[j] = temp;
    this.indexMap.set(this.nodes[i].key, i);
    this.indexMap.set(this.nodes[j].key, j);
  }

  bubbleUp(index) {
    while (
      index > 0 &&
      this.compare(
        this.nodes[index].item,
        this.nodes[PriorityQueue.parent(index)].item,
      ) < 0
    ) {
      const parentIndex = PriorityQueue.parent(index);
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  bubbleDown(index) {
    while (true) {
      const leftIndex = PriorityQueue.leftChild(index);
      const rightIndex = PriorityQueue.rightChild(index);
      let smallestIndex = index;

      if (
        leftIndex < this.length &&
        this.compare(
          this.nodes[leftIndex].item,
          this.nodes[smallestIndex].item,
        ) < 0
      ) {
        smallestIndex = leftIndex;
      }

      if (
        rightIndex < this.length &&
        this.compare(
          this.nodes[rightIndex].item,
          this.nodes[smallestIndex].item,
        ) < 0
      ) {
        smallestIndex = rightIndex;
      }

      if (smallestIndex === index) {
        break;
      }

      this.swap(index, smallestIndex);
      index = smallestIndex;
    }
  }

  heapify() {
    const start = PriorityQueue.parent(this.length - 1);
    for (let i = start; i >= 0; i--) {
      this.bubbleDown(i);
    }
  }

  enqueue(key, item) {
    const node = QueueNode(key, item);
    this.nodes.push(node);
    const index = this.nodes.length - 1;
    this.indexMap.set(node.key, index);
    this.bubbleUp(index);
  }

  dequeue() {
    if (this.nodes.length === 0) {
      return null;
    }
    const root = this.nodes[0];
    if (this.length === 1) {
      this.nodes.pop();
      this.indexMap.delete(root.key);
      return root.item;
    }

    const lastIndex = this.nodes.length - 1;
    this.swap(0, lastIndex);
    this.nodes.pop();
    this.indexMap.delete(root.key);
    this.bubbleDown(0);

    return root.item;
  }

  updateItem(key, newItem) {
    const index = this.indexMap.get(key);
    if (index === undefined) {
      return;
    }
    this.nodes[index] = QueueNode(key, newItem);
    const parentIndex = PriorityQueue.parent(index);
    if (
      index > 0 &&
      this.compare(this.nodes[index].item, this.nodes[parentIndex].item) < 0
    ) {
      this.bubbleUp(index);
      return;
    }
    this.bubbleDown(index);
  }

  isEmpty() {
    return this.nodes.length === 0;
  }

  peek() {
    return this.nodes.length > 0 ? this.nodes[0].item : null;
  }
}

export { PriorityQueue, QueueNode };
