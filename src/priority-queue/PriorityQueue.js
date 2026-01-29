const QueueNode = (key, item) => {
  return {
    key: key,
    item: item,
  };
};

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

  constructor(items, compare) {
    this.items = items || [];
    this.compare = compare;
    this.indexMap = new Map();

    items.forEach((item, index) => {
      this.indexMap.set(item.key, index);
    });
  }

  swap(i, j) {
    const temp = this.items[i];
    this.items[i] = this.items[j];
    this.items[j] = temp;

    this.indexMap.set(this.items[i].key, i);
    this.indexMap.set(this.items[j].key, j);
  }

  bubbleUp(index) {
    while (
      index > 0 &&
      this.compare(this.items[index], this.items[PriorityQueue.parent(index)]) <
        0
    ) {
      const parentIndex = PriorityQueue.parent(index);
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  bubbleDown(index) {
    const size = this.items.length;
    while (true) {
      const leftIndex = PriorityQueue.leftChild(index);
      const rightIndex = PriorityQueue.rightChild(index);
      let smallestIndex = index;

      if (
        leftIndex < size &&
        this.compare(this.items[leftIndex], this.items[smallestIndex]) < 0
      ) {
        smallestIndex = leftIndex;
      }

      if (
        rightIndex < size &&
        this.compare(this.items[rightIndex], this.items[smallestIndex]) < 0
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
    const start = PriorityQueue.parent(this.items.length - 1);
    for (let i = start; i >= 0; i--) {
      this.bubbleDown(i);
    }
  }

  enqueue(key, item) {
    const node = QueueNode(key, item);
    this.items.push(node);
    const index = this.items.length - 1;
    this.indexMap.set(key, index);
    this.bubbleUp(index);
  }

  dequeue() {
    if (this.items.length === 0) {
      return null;
    }

    const root = this.items[0];
    const lastIndex = this.items.length - 1;
    this.swap(0, lastIndex);
    this.items.pop();
    this.indexMap.delete(root.key);
    this.bubbleDown(0);

    return root.item;
  }

  updateItem(key, newItem) {
    const index = this.indexMap.get(key);
    if (index === undefined) {
      return;
    }

    this.items[index].item = newItem;
    const lastIndex = this.items.length - 1;
    this.swap(index, lastIndex);
    this.bubbleDown(index);
    this.bubbleUp(index);
  }

  isEmpty() {
    return this.items.length === 0;
  }

  peek() {
    return this.items.length > 0 ? this.items[0].item : null;
  }
}

export default PriorityQueue;
