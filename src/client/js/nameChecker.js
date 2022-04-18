function textChecker(text) {
  if (isNaN(text) == true) {
    return true;
  } else {
    return false;
  }
}

function urlChecker(url) {
  let regex =
    /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  if (regex.test(url)) {
    return true;
  } else {
    return false;
  }
}

export { textChecker, urlChecker };
