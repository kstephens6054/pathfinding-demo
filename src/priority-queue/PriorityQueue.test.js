// @vitest-environment node

import { describe, it, expect } from "vitest";
import { PriorityQueue } from "./PriorityQueue.js";

describe("PriorityQueue", () => {
  it("should insert and extract items based on priority", () => {
    const compare = (a, b) => a.priority - b.priority;
    const pq = new PriorityQueue([], compare);

    pq.enqueue("task1", { name: "task1", priority: 5 });
    pq.enqueue("task2", { name: "task2", priority: 1 });
    pq.enqueue("task3", { name: "task3", priority: 3 });

    expect(pq.peek()).toEqual({ name: "task2", priority: 1 });
    expect(pq.dequeue()).toEqual({ name: "task2", priority: 1 });
    expect(pq.dequeue()).toEqual({ name: "task3", priority: 3 });
    expect(pq.dequeue()).toEqual({ name: "task1", priority: 5 });
  });

  it("should update item priority correctly", () => {
    const compare = (a, b) => a.priority - b.priority;
    const pq = new PriorityQueue([], compare);

    pq.enqueue("task1", { name: "task1", priority: 5 });
    pq.enqueue("task2", { name: "task2", priority: 1 });
    pq.enqueue("task3", { name: "task3", priority: 3 });
    pq.updateItem("task1", { name: "task1", priority: 0 });

    expect(pq.peek()).toEqual({ name: "task1", priority: 0 });
    expect(pq.dequeue()).toEqual({ name: "task1", priority: 0 });
    expect(pq.dequeue()).toEqual({ name: "task2", priority: 1 });
    expect(pq.dequeue()).toEqual({ name: "task3", priority: 3 });
  });

  it("should return null when extracting from an empty queue", () => {
    const compare = (a, b) => a.priority - b.priority;
    const pq = new PriorityQueue([], compare);
    expect(pq.peek()).toBeNull();
    expect(pq.dequeue()).toBeNull();
  });

  it("should handle multiple updates correctly", () => {
    const compare = (a, b) => a.priority - b.priority;
    const pq = new PriorityQueue([], compare);

    pq.enqueue("task1", { name: "task1", priority: 5 });
    pq.enqueue("task2", { name: "task2", priority: 1 });
    pq.enqueue("task3", { name: "task3", priority: 3 });

    pq.updateItem("task1", { name: "task1", priority: 0 });
    pq.updateItem("task2", { name: "task2", priority: 4 });

    expect(pq.peek()).toEqual({ name: "task1", priority: 0 });
    expect(pq.dequeue()).toEqual({ name: "task1", priority: 0 });
    expect(pq.dequeue()).toEqual({ name: "task3", priority: 3 });
    expect(pq.dequeue()).toEqual({ name: "task2", priority: 4 });
  });

  it("should be constructable from a QueueNode array", () => {
    const compare = (a, b) => a.priority - b.priority;
    const pq = new PriorityQueue(
      [
        { key: "task1", item: { name: "task1", priority: 5 } },
        { key: "task2", item: { name: "task2", priority: 1 } },
        { key: "task3", item: { name: "task3", priority: 3 } },
      ],
      compare,
    );

    expect(pq.peek()).toEqual({ name: "task2", priority: 1 });
    expect(pq.dequeue()).toEqual({ name: "task2", priority: 1 });
    expect(pq.dequeue()).toEqual({ name: "task3", priority: 3 });
    expect(pq.dequeue()).toEqual({ name: "task1", priority: 5 });
  });

  it("should maintain heap property after multiple updates", () => {
    const compare = (a, b) => a.priority - b.priority;
    const pq = new PriorityQueue([], compare);

    for (let i = 10; i > 0; i--) {
      pq.enqueue(`task${i}`, { name: `task${i}`, priority: i });
    }

    for (let i = 10; i > 0; i--) {
      pq.updateItem(`task${i}`, { name: `task${i}`, priority: 10 - i + 1 });
    }

    for (let i = 10; i > 0; i--) {
      expect(pq.dequeue()).toEqual({
        name: `task${i}`,
        priority: 10 - i + 1,
      });
    }
  });
});
