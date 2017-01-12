/**
 * Created by AdamBjergvang on 13/12/2016.
 */

// denne klasse står for XOR kryptering
export function encryptDecryptXOR (input, token) {

    // split fx.  string = "dreng"    "dreng".split("") = ["d","r","e","n","g"]
    var key = token.split("");
    var output = [];
    for (var i = 0; i < input.length; i++) {
        output.push(String.fromCharCode(((input.charAt(i)).charCodeAt(0) ^ (key[i % key.length]).charCodeAt(0))));
    }
    return output.join("");
};