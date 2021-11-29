const sortingAlgos = {
  bubble: async function (arr, tableNum) {
    let sorted = false;
    let currLen = arr.length - 1;
    while (!sorted) {
      sorted = true;
      for (let i = 0; i < currLen; i++) {
        arr[i].style.setProperty("background", comparingColor);
        arr[i + 1].style.setProperty("background", comparingColor);
        await playCheck();
        await sleep();
        if (
          Number(arr[i + 1].style.width.slice(0, -2)) <
          Number(arr[i].style.width.slice(0, -2))
        ) {
          sorted = false;
          const temp = arr[i].style.width;
          arr[i].style.width = arr[i + 1].style.width;
          arr[i + 1].style.width = temp;
        }
        arr[i].style.setProperty("background", lightColor);
      }
      arr[currLen].style.setProperty("background", sortedColor);
      currLen--;
    }
    for (let i = 0; i <= currLen; i++) {
      arr[i].style.setProperty("background", sortedColor);
    }
    if (tableNum == tableNumber) {
      finishedCheck(arr[0].parentElement);
    }
  },
  selection: async function (arr, tableNum) {
    let currLen = arr.length;
    while (currLen > 1) {
      let maxEleInd = 0;
      for (let i = 1; i < currLen; i++) {
        arr[maxEleInd].style.setProperty("background", comparingColor);
        arr[i].style.setProperty("background", comparingColor);
        await playCheck();
        await sleep();
        if (
          Number(arr[i].style.width.slice(0, -2)) >
          Number(arr[maxEleInd].style.width.slice(0, -2))
        ) {
          arr[maxEleInd].style.setProperty("background", lightColor);
          maxEleInd = i;
        }
        arr[i].style.setProperty("background", lightColor);
        arr[maxEleInd].style.setProperty("background", comparingColor);
      }
      const temp = arr[currLen - 1].style.width;
      arr[currLen - 1].style.width = arr[maxEleInd].style.width;
      arr[maxEleInd].style.width = temp;
      arr[maxEleInd].style.setProperty("background", lightColor);
      arr[currLen - 1].style.setProperty("background", sortedColor);
      currLen--;
    }
    arr[0].style.setProperty("background", sortedColor);
    if (tableNum == tableNumber) {
      finishedCheck(arr[0].parentElement);
    }
  },
  insertion: async function (arr, tableNum) {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = i;
      while (
        j < arr.length &&
        Number(arr[j - 1].style.width.slice(0, -2)) >
          Number(arr[j].style.width.slice(0, -2))
      ) {
        arr[j - 1].style.setProperty("background", comparingColor);
        arr[j].style.setProperty("background", comparingColor);
        await playCheck();
        await sleep();
        const temp = arr[j - 1].style.width;
        arr[j - 1].style.width = arr[j].style.width;
        arr[j].style.width = temp;
        arr[j - 1].style.setProperty("background", sortedColor);
        arr[j].style.setProperty("background", sortedColor);
        j++;
      }
      arr[i].style.setProperty("background", sortedColor);
    }
    arr[0].style.setProperty("background", sortedColor);
    if (tableNum == tableNumber) {
      finishedCheck(arr[0].parentElement);
    }
  },
  merge: async function (arr, tableNum) {
    if (arr.length == 1) {
      return;
    }
    let mid = Math.trunc(arr.length / 2);
    let left = arr.slice(0, mid);
    let right = arr.slice(mid);
    await this.merge(left, tableNum);
    await this.merge(right, tableNum);
    await this.mergeSortedArrays(left, right, arr, tableNum);
  },
  mergeSortedArrays: async function (a, b, arr, tableNum) {
    for (let i = 0; i < arr.length; i++) {
      arr[i].style.setProperty("background", processingColor);
    }
    let i = 0,
      j = 0,
      k = 0;
    while (i < a.length && j < b.length) {
      a[i].style.setProperty("background", comparingColor);
      b[j].style.setProperty("background", comparingColor);
      await playCheck();
      await sleep();
      b[j].style.setProperty("background", processingColor);
      arr[k].style.setProperty("background", sortedColor);
      if (
        Number(a[i].style.width.slice(0, -2)) <=
        Number(b[j].style.width.slice(0, -2))
      ) {
        i++;
        k++;
      } else {
        let temp = arr[k].style.width;
        arr[k].style.width = b[j].style.width;
        for (let h = k + 1; h < k + 1 + a.length - i; h++) {
          const temp2 = arr[h].style.width;
          arr[h].style.width = temp;
          temp = temp2;
        }
        temp = a[i];
        for (let h = i; h < a.length; h++) {
          a[h] = arr[k + 1 + h - i];
        }
        b[j] = temp;
        j++;
        k++;
      }
    }
    while (i < a.length) {
      a[i].style.setProperty("background", comparingColor);
      await playCheck();
      await sleep();
      a[i].style.setProperty("background", sortedColor);
      const temp = arr[k].style.width;
      arr[k].style.width = a[i].style.width;
      a[i].style.width = temp;
      i++;
      k++;
    }
    while (j < b.length) {
      b[j].style.setProperty("background", comparingColor);
      await playCheck();
      await sleep();
      b[j].style.setProperty("background", sortedColor);
      const temp = arr[k].style.width;
      arr[k].style.width = b[j].style.width;
      b[j].style.width = temp;
      j++;
      k++;
    }
    if (arraySize !== arr.length) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].style.setProperty("background", lightColor);
      }
    } else if (tableNumber == tableNum) {
      finishedCheck(arr[0].parentElement);
    }
  },
  quick: async function (arr, tableNum) {
    if (arr.length == 1) {
      arr[0].style.setProperty("background", sortedColor);
    }
    if (arr.length <= 1) {
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      arr[i].style.setProperty("background", processingColor);
    }
    let pivotIndex = arr.length - 1;
    let leftIndex = 0;
    while (leftIndex < pivotIndex) {
      arr[leftIndex].style.setProperty("background", comparingColor);
      arr[pivotIndex].style.setProperty("background", comparingColor);
      await playCheck();
      await sleep();
      if (
        Number(arr[leftIndex].style.width.slice(0, -2)) >
        Number(arr[pivotIndex].style.width.slice(0, -2))
      ) {
        const temp = arr[leftIndex].style.width;
        arr[leftIndex].style.width = arr[pivotIndex - 1].style.width;
        arr[pivotIndex - 1].style.width = arr[pivotIndex].style.width;
        arr[pivotIndex].style.width = temp;
        arr[leftIndex].style.setProperty("background", processingColor);
        arr[pivotIndex].style.setProperty("background", processingColor);
        pivotIndex--;
        leftIndex--;
      } else {
        arr[leftIndex].style.setProperty("background", processingColor);
      }
      leftIndex++;
    }
    for (let i = 0; i < arr.length; i++) {
      arr[i].style.setProperty("background", lightColor);
    }
    arr[pivotIndex].style.setProperty("background", sortedColor);
    await this.quick(arr.slice(0, pivotIndex), tableNum);
    await this.quick(arr.slice(pivotIndex + 1), tableNum);
    if (arr.length == arraySize && tableNum == tableNumber) {
      finishedCheck(arr[0].parentElement);
    }
  },
  heap: async function (arr, tableNum) {
    for (let i = 0; i < arraySize; i++) {
      arr[i].style.setProperty("background", processingColor);
    }
    for (let i = Math.trunc(arr.length / 2) - 1; i > -1; i--) {
      await playCheck();
      await sleep();
      await this.heapify(arr, i, arr.length);
    }
    for (let i = arr.length - 1; i > 0; i--) {
      arr[0].style.setProperty("background", comparingColor);
      await playCheck();
      await sleep();
      arr[i].style.setProperty("background", sortedColor);
      arr[0].style.setProperty("background", processingColor);
      const temp = arr[0].style.width;
      arr[0].style.width = arr[i].style.width;
      arr[i].style.width = temp;
      await this.heapify(arr, 0, i);
    }
    arr[0].style.setProperty("background", sortedColor);
    if (tableNum == tableNumber) {
      finishedCheck(arr[0].parentElement);
    }
  },
  heapify: async function (arr, curr, size) {
    let largest = curr;
    let left = 2 * curr + 1;
    let right = left + 1;
    if (
      left < size &&
      Number(arr[left].style.width.slice(0, -2)) >
        Number(arr[largest].style.width.slice(0, -2))
    ) {
      largest = left;
    }
    if (
      right < size &&
      Number(arr[right].style.width.slice(0, -2)) >
        Number(arr[largest].style.width.slice(0, -2))
    ) {
      largest = right;
    }
    if (largest != curr) {
      const temp = arr[largest].style.width;
      arr[largest].style.width = arr[curr].style.width;
      arr[curr].style.width = temp;
      await playCheck();
      await sleep();
      await this.heapify(arr, largest, size);
    }
  },
};
