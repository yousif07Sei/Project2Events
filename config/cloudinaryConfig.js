require('dotenv').config()
const cloudinary = require('cloudinary');

exports.upload_single = async (imagePath) => {
    return result = await cloudinary.uploader.upload(imagePath);
    // console.log(result);
}
exports.upload_multiple = async (arrayPath) => {
    let paths = [];
    for(let i=0; i<arrayPath.length; i++){
        let imgPath = await cloudinary.uploader.upload(arrayPath[i])
            paths.push(imgPath);
    }
    return paths;
}
// exports.upload_multiple = async (arrayPath) => {
//     let paths = [];
//     for(let i=0; i<arrayPath.length; i++){
//         cloudinary.uploader.upload(arrayPath[i])
//         .then((imgPath) =>{
//             paths.push(imgPath);
//             console.log(imgPath)
//         })
//         .catch((err) =>{
//             console.log(err);
//         })
//     }
//     return paths;
//     console.log(paths)
// }