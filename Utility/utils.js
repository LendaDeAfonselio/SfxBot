let request = require(`request`);
let fs = require(`fs`);

/**
 * Given the URL this function will try to download the content in the URL to a file in the path specified
 * @param {*} url - The URL of the downloadable content
 * @param {*} finalname - name of the file
 * @param {*} path - Path in which the file will be stored
 */
function download(url,finalname,path){
    request.get(url)
        .on('error', console.error)
        .pipe(fs.createWriteStream(path + finalname));
}

/**
 * Checks if a string contains any substring that is on the array passed as the second argument
 * @param {*} originalStg - The string you want to check for elems of the array
 * @param {*} arrOfExtensions - the array with stgs you want to check in the string
 * @returns true if originalStg contains any elem of the array and false otherwise
 */
function containsAnyElem(originalStg, arrOfExtensions){
    for(let extension of arrOfExtensions){
        console.log(extension);
        if(originalStg.includes(extension)){
            return extension;
        }
    }
    return "";
}

module.exports = {
    containsAnyElem: containsAnyElem,
    download: download
};