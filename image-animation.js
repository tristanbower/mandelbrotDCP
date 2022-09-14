const sharp = require("sharp");
const pngFilesStream = require("png-file-stream");
const GIFEncoder = require("gifencoder");
const fs = require("fs");

/**
 * Take in the frame which is a Unit8 array and saves each frame as a png.
 * @param {int} frame
 * @param {int} width
 * @param {int} height
 * @param {string} folder
 * @param {string} name
 * @returns image
 */

async function save_image(frame, width, height, name) {
  image = sharp(frame, {
    raw: {
      width: width,
      height: height,
      channels: 3,
    },
  });
  await image.toFile(name);
  return image;
}
/**
 * Take the pngs created and turns them into a gif.
 * @param {int} width
 * @param {int} height
 * @param {string} folder
 * @param {string} name
 */

async function create_gif(width, height, name) {
  const encoder = new GIFEncoder(width, height);
  const image_names = folder + name + "*.png";
  const stream = pngFilesStream(folder + name + "*.png")
    .pipe(encoder.createWriteStream({ repeat: 0, delay: 500, quality: 10 }))
    .pipe(fs.createWriteStream(name + ".gif"));

  await new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });
}

module.exports = { save_image, create_gif };
