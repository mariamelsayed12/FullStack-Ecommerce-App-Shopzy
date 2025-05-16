import axios from "axios";
// هنا زي ده انا ثابت الجزء ال ثابت من اللينك{envirinment

const axiosInstance = axios.create({
    baseURL: "http://localhost:1337/api",
    timeout: 1000,
});

export default axiosInstance;
