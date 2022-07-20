const {
  readFileSync,
  writeFileSync,
  readdirSync,
  rmSync,
  existsSync,
  mkdirSync,
} = require("fs");
const sharp = require("sharp");

const template = `
    <svg width="1210" height="962" viewBox="0 0 1210 962" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- body -->
        <!-- head -->
        <!-- hand -->
        <!-- handleft -->
    </svg>
`;

const takenNames = {};
const takenFaces = [];
let idx = 1;
const combination = 12;

function randInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

function randElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomName() {
  const adjectives =
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

function getLayer(name, folder, skip = 0.0) {
  const svg = readFileSync(`./layers/${folder}/${name}.svg`, "utf-8");
  const re = /(?<=\<svg\s*[^>]*>)([\s\S]*?)(?=\<\/svg\>)/g;
  const layer = svg.match(re)[0];
  return Math.random() > skip ? layer : "";
}

async function svgToPng(name) {
  console.log(name);
  const src = `./out/${name}.svg`;
  const dest = `./out/${name}.png`;

  const img = await sharp(src);
  const resized = await img.resize(1024);
  await resized.toFile(dest);
}

function matchChar(faceId) {
  const isMatch = takenFaces.some((fa) => fa === faceId);
  return isMatch;
}

function createImage() {
  const mouth = randInt(4);
  const hand = randInt(1);

  const face = [0, hand, 0, mouth].join("");

  if (matchChar(face)) {
    createImage();
  } else {
    const name = getRandomName();
    takenFaces.push(face);

    // console.log(getLayer());
    const final = template
      .replace("<!-- body -->", getLayer(`body0`, "body"))
      .replace("<!-- head -->", getLayer(`face${mouth}`, "face"))
      .replace("<!-- hand -->", getLayer(`hand${hand}`, "hand"))
      .replace("<!-- handleft -->", getLayer(`handleft0`, "handleft"));

    const meta = {
      name,
      description: `A drawing of ${name.split("-").join(" ")}`,
      image: `${idx}.png`,
      attributes: [
        {
          beard: "",
          rarity: 0.5,
        },
      ],
    };
    writeFileSync(`./out/${idx}.json`, JSON.stringify(meta));
    writeFileSync(`./out/${idx}.svg`, final);
    svgToPng(idx);
    idx++;
  }
}

// Create dir if not exists
if (!existsSync("./out")) {
  mkdirSync("./out");
}

// Cleanup dir before each run
readdirSync("./out").forEach((f) => rmSync(`./out/${f}`));

do {
  createImage();
} while (takenFaces.length <= combination);

console.log("TOTal length", takenFaces.length);
