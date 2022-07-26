import { readdirSync } from 'fs';
const sharp = require('sharp');

const {
    readFileSync,
} = require('fs');



export const randInteger = (maxRange: number): number => {
    return Math.floor(Math.random() * (maxRange));
}

export const randElement = (array: Array<string>): string => {
    const a = array[Math.floor(Math.random() * array.length)];
    return a;
}

export const findFileLength = (folderName: string) => {
    const folder = readdirSync(`./layers/${folderName}`);
    return folder.length
}

export const findCombination = (): number => {
    const com = readdirSync('./layers');
    const file: any[] = com.map(f => readdirSync(`./layers/${f}`));
    const index = file.map((folder: any[]) => folder.length);
    const combination = index.reduce((pre, cur) => pre * cur, 1)
    return combination;
}


export const getLayer = (fileName: string, folderName: string, skip: number = 0.0): string => {
    const svg = readFileSync(`./layers/${folderName}/${fileName}.svg`, "utf-8");

    const re = /(?<=\<svg\s*[^>]*>)([\s\S]*?)(?=\<\/svg\>)/g;

    const layer = svg.match(re)[0];
    return Math.random() > skip ? layer : "";
}

export const svgToPng = async (fileName: number) => {
    const src: string = `./out/${fileName}.svg`;
    const dest: string = `./out/${fileName}.png`;

    const img = sharp(src);
    const resizeImage = img.resize(1024)
    resizeImage.toFile(dest);
}

const takenNames: any = {}

export const getRandomName = (): string => {
    const adjectives: string[] =
        "fired trashy tubular nasty jacked swol buff ferocious firey flamin agnostic artificial bloody crazy cringey crusty dirty eccentric glutinous harry juicy simple stylish awesome creepy corny freaky shady sketchy lame sloppy hot intrepid juxtaposed killer ludicrous mangy pastey ragin rusty rockin sinful shameful stupid sterile ugly vascular wild young old zealous flamboyant super sly shifty trippy fried injured depressed anxious clinical".split(
            " "
        );
    const names =
        "aaron bart chad dale earl fred grady harry ivan jeff joe kyle lester steve tanner lucifer todd mitch hunter mike arnold norbert olaf plop quinten randy saul balzac tevin jack ulysses vince will xavier yusuf zack roger raheem rex dustin seth bronson dennis".split(
            " "
        );

    const randAdj = randElement(adjectives);
    const randName = randElement(names);
    const name = `${randAdj}-${randName}`;

    if (takenNames[name] || !name) {
        return getRandomName();
    } else {
        takenNames[name] = name;
        return name;
    }
}


