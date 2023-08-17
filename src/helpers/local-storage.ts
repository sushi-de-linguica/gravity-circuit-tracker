export const toggleValueInsideLocalStorage = (objectName, id) => {
  const value = localStorage.getItem(objectName);
  if (value == null || value == undefined || (value && value.length === 0)) {
    localStorage.setItem(objectName, JSON.stringify([id]));
    return;
  }

  let parsedValue = JSON.parse(value);

  if (parsedValue.includes(id)) {
    parsedValue = parsedValue.filter((currentId) => currentId != id);
  } else {
    parsedValue.push(id);
  }

  localStorage.setItem(objectName, JSON.stringify(parsedValue));
  window.dispatchEvent(new CustomEvent("UPDATE_LOCAL_STORAGE"));
};
