export const getUrllastSegment = () => {
  let pageUrl = window.location.href;
  let lastURLSegment = pageUrl.substring(pageUrl.lastIndexOf("/") + 1);
  return lastURLSegment;
};

/**
 * Converts a string to boolean and if it not boolean "true" or "false"
 * then return false
 * @param {string} string The string to convert to boolean
 * @returns {string} boolean value
 */
export const convertToBoolean = (string) => {
  let boolValue=string
  if(typeof(string)=="string"){
     boolValue = string?.toLowerCase() === "true";
  }
  return boolValue;  
};

/**
 * Converts a string to sentence case
 * @param {string} string The string to convert to sentence case
 * @returns {string} The string in sentence case
 */
export const convertToSentenceCase = (string) => {
  if(string && typeof string === 'string'){

    let splitString = string
    ?.toLowerCase()
    .trim()
    .split(/[.\-_\s]/g);
  let sentenceCase = "";
  if (splitString?.length === 1) {
    let firstWord = splitString[0];
    sentenceCase = `${firstWord[0].toUpperCase()}${firstWord.slice(1)}`;
  } else {
    sentenceCase = splitString?.reduce((str, word) => {
      //console.log("str", str, "work", word);
      return `${str[0]?.toUpperCase()}${str?.slice(
        1
      )} ${word[0]?.toUpperCase()}${word?.slice(1)}`;
    });
  }

  //console.log("string is", string, splitString);
  //console.log("camel is", sentenceCase);
  return sentenceCase;
}
return string
};

/**
 * Adds the header color to the style for those elements which have
 * isHeaderColor set to true. Changes the color and the border-bottom-color
 * to the provided color;
 * @param {Object} element The element which will have the key isHeaderColor
 * @param {Object} elementStyle The style of the element
 * @param {String} headerColour The color to change in the element color
 * @returns {Object} The modified color object
 */
export const addHeaderColourToTextStyle = (
  element,
  elementStyle,
  headerColour
) => {
  let newElementStyle = { ...elementStyle };
  if (
    element?.isHeaderColor === true ||
    element?.isHeaderColor === "true" ||
    element?.metadata?.isHeaderColor === true
  ) {
    newElementStyle.color = headerColour;
    newElementStyle.borderBottomColor = headerColour;
    newElementStyle.textTransform="capitalize";
  }
  return newElementStyle;
};

export const textTransform = (
  elementStyle
) => {
  if(elementStyle){
    elementStyle.textTransform="capitalize";
  }
  return elementStyle
  
};

/**
 * Converts a string to sentence case
 * @param {string} string The string to convert to sentence case
 * @returns {string} The string in sentence case
 */
 export const capitalizeFirstLetter=(string)=> {
  if(string && typeof string === 'string'){
     return string.charAt(0).toUpperCase() + string.slice(1);
 }
 return string;
}