"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const utils_1 = require("./utils");
const template = `
<svg width="1210" height="962" viewBox="0 0 1210 962" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- body -->
    <!-- face -->
    <!-- hand -->
    <!-- handLeft -->
</svg>
`;
const takenFaces = {};
let fileIndex = 0;
const combination = (0, utils_1.findCombination)();
const characterExists = (characterCode) => {
    if (takenFaces[characterCode]) {
        return true;
    }
    else {
        return false;
    }
};
const createCombinationMetaData = () => {
    const body = (0, utils_1.randInteger)((0, utils_1.findFileLength)('body'));
    const face = (0, utils_1.randInteger)((0, utils_1.findFileLength)('face'));
    const hand = (0, utils_1.randInteger)((0, utils_1.findFileLength)('hand'));
    const handLeft = (0, utils_1.randInteger)((0, utils_1.findFileLength)('handLeft'));
    const characterCode = [body, face, hand, handLeft].join('');
    if (characterExists(characterCode)) {
        createCombinationMetaData();
    }
    else {
        const name = (0, utils_1.getRandomName)();
        takenFaces[characterCode] = characterCode;
        const finalTemplate = template
            .replace(" <!-- body -->", (0, utils_1.getLayer)(`body${body}`, "body"))
            .replace("<!-- face -->", (0, utils_1.getLayer)(`face${face}`, "face"))
            .replace("<!-- hand -->", (0, utils_1.getLayer)(`hand${hand}`, "hand"))
            .replace("<!-- handLeft -->", (0, utils_1.getLayer)(`handLeft${handLeft}`, "handLeft"));
        const metaData = {
            name,
            description: `A drawing of ${name.split("-").join(" ")}`,
            image: `${fileIndex}.png`,
            attributes: [
                {
                    beard: "",
                    rarity: 0.5,
                },
            ],
        };
        (0, fs_1.writeFileSync)(`./out/${fileIndex}.json`, JSON.stringify(metaData));
        (0, fs_1.writeFileSync)(`./out/${fileIndex}.svg`, finalTemplate);
        (0, utils_1.svgToPng)(fileIndex);
        fileIndex++;
    }
};
if (!(0, fs_1.existsSync)("./out")) {
    (0, fs_1.mkdirSync)("./out");
}
// clear when regenerate 
(0, fs_1.readdirSync)("./out").forEach((f) => (0, fs_1.rmSync)(`./out/${f}`));
while (Object.keys(takenFaces).length !== combination) {
    createCombinationMetaData();
}
