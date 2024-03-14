import http from "k6/http"

export const getListUsers = () => {
    return http.get("https://reqres.in/api/users");
};

export const updateUser = (userId) => {
    return http.put(`https://reqres.in/api/users/${userId}`);
}