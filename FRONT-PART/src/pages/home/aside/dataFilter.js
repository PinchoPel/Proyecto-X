export function dataFilter(arrays, { startdate, enddate, province, tag }) {
    let combinedResult = [];
    for (const array of arrays) {
        combinedResult = combinedResult.concat(array);
    }
    return combinedResult.filter(item => {
      const dateok =
        (!startdate || new Date(item.date) >= new Date(startdate)) &&
        (!enddate || new Date(item.date) <= new Date(enddate));
      const provinceok = !province || item.location === province;
      const tagok = !tag || item.tags.includes(tag);
      return dateok && provinceok && tagok;
    });
  };