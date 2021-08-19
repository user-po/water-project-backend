const path = require('path')
module.exports = {
    DEFAULT_PASSWORD:'123123',
    JWT_SECRET:'water-mgr',
    CLIENT:'CLIENT_CHECK',
    UPLOAD_DIR:path.resolve(__dirname,'../upload'),
    BASE_IMAGE_URL:'http://localhost:3000/images/',
    PORT:3000
}