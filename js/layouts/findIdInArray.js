// common function to find Id in array by getting array and id
function findIdInArray(array, id) {
  let index = -1;
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === id) index = i;
  }

  return index;
}

export default findIdInArray;