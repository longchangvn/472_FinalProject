const fs = require('fs')
const path = require('path');
const uploadDir = path.join(__dirname, "../public/img");
module.exports.saveImage = function saveImage(baseImage, filename) {
    /*path of the folder where your project is saved. (In my case i got it from config file, root path of project).*/
    //path of folder where you want to save the image.
    const filePath = path.join(uploadDir, filename + ".jpg");
    //Find extension of file
    const ext = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));
    const fileType = baseImage.substring("data:".length,baseImage.indexOf("/"));
    //Forming regex to extract base64 data of file.
    const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, 'gi');
    //Extract base64 data.
    const base64Data = baseImage.replace(regex, "");
    try{
        fs.writeFileSync(filePath, base64Data, 'base64');
        return "/img/" + filename + ".jpg";
    }catch(error){
        console.error(error);
        return -1;
    }
}
exports.deleteImage = function deleteImage(path) {
    if (fs.existsSync(path)) {
        // Delete the file
        fs.unlinkSync(path);    
    }
}
