import axios from 'axios';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const uploadImageHosting = async( {image} ) => {

    const res = await axios.post(image_hosting_api, { image }, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    const photo = res.data.data.display_url;
    return [ photo ];
};

export default uploadImageHosting;