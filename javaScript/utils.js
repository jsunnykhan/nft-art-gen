"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomName = exports.svgToPng = exports.getLayer = exports.findCombination = exports.findFileLength = exports.randElement = exports.randInteger = void 0;
const fs_1 = require("fs");
const sharp = require('sharp');
const { readFileSync, } = require('fs');
const randInteger = (maxRange) => {
    return Math.floor(Math.random() * (maxRange));
};
exports.randInteger = randInteger;
const randElement = (array) => {
    return [Math.floor(Math.random() * array.length)];
};
exports.randElement = randElement;
const findFileLength = (folderName) => {
    const folder = (0, fs_1.readdirSync)(`./layers/${folderName}`);
    return folder.length;
};
exports.findFileLength = findFileLength;
const findCombination = () => {
    const com = (0, fs_1.readdirSync)('./layers');
    const file = com.map(f => (0, fs_1.readdirSync)(`./layers/${f}`));
    const index = file.map((folder) => folder.length);
    const combination = index.reduce((pre, cur) => pre * cur, 1);
    return combination;
};
exports.findCombination = findCombination;
const getLayer = (fileName, folderName, skip = 0.0) => {
    const svg = readFileSync(`./layers/${folderName}/${fileName}.svg`, "utf-8");
    const re = /(?<=\<svg\s*[^>]*>)([\s\S]*?)(?=\<\/svg\>)/g;
    const layer = svg.match(re)[0];
    return Math.random() > skip ? layer : "";
};
exports.getLayer = getLayer;
const svgToPng = (fileName) => __awaiter(void 0, void 0, void 0, function* () {
    const src = `./out/${fileName}.svg`;
    const dest = `./out/${fileName}.png`;
    const img = sharp(src);
    const resizeImage = img.resize(1024);
    resizeImage.toFile(dest);
});
exports.svgToPng = svgToPng;
const takenNames = {};
const getRandomName = () => {
    const adjectives = "fired trashy tubular nasty jacked swol buff ferocious firey flamin agnostic artificial bloody crazy cringey crusty dirty eccentric glutinous harry juicy simple stylish awesome creepy corny freaky shady sketchy lame sloppy hot intrepid juxtaposed killer ludicrous mangy pastey ragin rusty rockin sinful shameful stupid sterile ugly vascular wild young old zealous flamboyant super sly shifty trippy fried injured depressed anxious clinical".split(" ");
    const names = "aaron bart chad dale earl fred grady harry ivan jeff joe kyle lester steve tanner lucifer todd mitch hunter mike arnold norbert olaf plop quinten randy saul balzac tevin jack ulysses vince will xavier yusuf zack roger raheem rex dustin seth bronson dennis".split(" ");
    const randAdj = (0, exports.randElement)(adjectives);
    const randName = (0, exports.randElement)(names);
    const name = `${randAdj}-${randName}`;
    if (takenNames[name] || !name) {
        return (0, exports.getRandomName)();
    }
    else {
        takenNames[name] = name;
        return name;
    }
};
exports.getRandomName = getRandomName;
