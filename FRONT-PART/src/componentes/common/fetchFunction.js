export const fetchFunction = async (method, route, headers, body) => {
    let url = `https://proyecto-x-backend.vercel.app/api/v1/${route}`;

    const options = {
        method,
        headers
    };

    if (body) {
        options.body = body;
    }

    const response = await fetch(url, options);
    return response;
};