import ImageKit, {toFile} from "@imagekit/nodejs";

const imagekit = new ImageKit({privateKey:process.env.IMAGEKIT_PRIVATE_KEY});

function hasImagekitConfig (){
    return Boolean(process.env.IMAGEKIT_PRIVATE_KEY); 
}