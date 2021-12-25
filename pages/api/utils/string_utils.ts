function escapeRegExp(string:string){
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
export function searchWholeWord(word:string, line:string){


    var regex = '\\b';
    regex += escapeRegExp(word);
    regex += '\\b';

    return new RegExp(regex, "i").test(line);
}

export function startsWithSpace(line:string){
    return /^\s/.test(line);
}