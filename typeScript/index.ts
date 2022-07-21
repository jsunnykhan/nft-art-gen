
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "fs";
import { randInteger, getLayer, svgToPng, getRandomName, findCombination, findFileLength } from "./utils";


const template: string = `
<svg width="1210" height="962" viewBox="0 0 1210 962" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- body -->
    <!-- face -->
    <!-- hand -->
    <!-- handLeft -->
</svg>
`;


const takenFaces: any = {};

let fileIndex: number = 0;
const combination = findCombination();

const characterExists = (characterCode: string): boolean => {
    if (takenFaces[characterCode]) {
        return true;
    }
    else {
        return false;
    }
}

const createCombinationMetaData = () => {
    const body: number = randInteger(findFileLength('body'));
    const face: number = randInteger(findFileLength('face'));
    const hand: number = randInteger(findFileLength('hand'));
    const handLeft: number = randInteger(findFileLength('handLeft'));


    const characterCode: string = [body, face, hand, handLeft].join('');

    if (characterExists(characterCode)) {
        createCombinationMetaData();
    } else {
        const name: string = getRandomName();

        takenFaces[characterCode] = characterCode;

        const finalTemplate = template
            .replace(" <!-- body -->", getLayer(`body${body}`, "body"))
            .replace("<!-- face -->", getLayer(`face${face}`, "face"))
            .replace("<!-- hand -->", getLayer(`hand${hand}`, "hand"))
            .replace("<!-- handLeft -->", getLayer(`handLeft${handLeft}`, "handLeft"));

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

        writeFileSync(`./out/${fileIndex}.json`, JSON.stringify(metaData))
        writeFileSync(`./out/${fileIndex}.svg`, finalTemplate);
        svgToPng(fileIndex);
        fileIndex++;
    }
}

if (!existsSync("./out")) {
    mkdirSync("./out");
}
// clear when regenerate 
readdirSync("./out").forEach((f) => rmSync(`./out/${f}`));

while (Object.keys(takenFaces).length !== combination) {
    createCombinationMetaData();

}
