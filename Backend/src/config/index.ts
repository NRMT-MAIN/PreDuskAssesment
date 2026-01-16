import dotenv from 'dotenv' 


type ServerConfig = {
    PORT: number;
}

function loadEnv() {
    dotenv.config();
}

loadEnv();

export const serverConfig: ServerConfig = {
    PORT: parseInt(process.env.PORT || "3000", 10),
};