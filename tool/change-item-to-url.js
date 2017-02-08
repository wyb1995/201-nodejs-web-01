"use strict";

module.exports = (items) => {
  return items.map((item)=> {
    let data = item.toJSON();
    data.item = `/item/${item.item}`;
    return data;
  });

};