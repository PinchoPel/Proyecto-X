export function dataFilter(arrays, { startdate, enddate, province, tag }) {
    let combinedArrays= [];
    for (const array of arrays) {   
      combinedArrays = combinedArrays.concat(array);
    }
    return combinedArrays.filter(item => {
      const dateExists =
        (!startdate || new Date(item.date) >= new Date(startdate)) &&
        (!enddate || new Date(item.date) <= new Date(enddate));
      const provinceExists = !province || item.location === province;
      const tagExists = !tag || item.tags.includes(tag);     
      return dateExists && provinceExists && tagExists;
    });
  };