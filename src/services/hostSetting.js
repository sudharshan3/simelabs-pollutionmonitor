var url = '';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    url = "https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2";
} else {
    url = "https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2";
}

export const API_BASE_URL = url;
