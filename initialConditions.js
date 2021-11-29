const barWidths = {
  random: function (n) {
    const randomArray = [];
    let sorted = true;
    while (randomArray.length < n) {
      const r = Math.floor(Math.random() * n) + 1;
      if (randomArray.indexOf(r) === -1) randomArray.push(r);
    }
    for (let i = 0; i < n - 1; i++) {
      if (randomArray[i] > randomArray[i + 1]) {
        sorted = false;
        break;
      }
    }
    if (sorted) {
      return this.random(n);
    }
    return randomArray;
  },
  nearlySorted: function (n) {
    const nearlySortedArray = [];
    let sorted = true;
    while (nearlySortedArray.length < n) {
      for (let i = 0; i < n; i += 4) {
        const tempArray = [];
        while (tempArray.length < 4) {
          const r = Math.floor(Math.random() * 4) + 1;
          if (tempArray.indexOf(r) === -1) tempArray.push(r);
        }
        for (let j = 0; j < 4; j++) {
          nearlySortedArray.push(i + tempArray[j]);
        }
      }
    }
    for (let i = 0; i < n - 1; i++) {
      if (nearlySortedArray[i] > nearlySortedArray[i + 1]) {
        sorted = false;
        break;
      }
    }
    if (sorted) {
      return this.nearlySorted(n);
    }
    return nearlySortedArray;
  },
  reversed: function (n) {
    const reversedArray = [];
    for (let i = n; i > 0; i--) {
      reversedArray.push(i);
    }
    return reversedArray;
  },
  fewUnique: function (n) {
    const fewUniqueArray = [];
    let sorted = true;
    while (fewUniqueArray.length < n) {
      const r = Math.floor(Math.random() * 4) + 1;
      fewUniqueArray.push((r * n) / 4);
    }
    for (let i = 0; i < n - 1; i++) {
      if (fewUniqueArray[i] > fewUniqueArray[i + 1]) {
        sorted = false;
        break;
      }
    }
    if (sorted) {
      return this.fewUnique(n);
    }
    return fewUniqueArray;
  },
};
