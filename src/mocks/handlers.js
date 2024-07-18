// src/mocks/handlers.js
import { http, HttpResponse } from "msw";
import initiateDB from "../db/initDB";

const { addUser, getUsers, editUser, deleteUser } = initiateDB();

export const handlers = [
  http.get("http://example.com/users", async () => {
    const users = await getUsers();
    return HttpResponse.json(users);
  }),

  http.post("http://example.com/user", async ({ request }) => {
    const newUser = await request.json();
    if (!newUser.name || !newUser.email) {
      return HttpResponse.json({
        success: false,
        message: "Name and email is required",
      });
    }
    const resp = await addUser(newUser);
    return HttpResponse.json(resp);
  }),

  http.put("http://example.com/user/:id", async ({ params, request }) => {
    const { id } = params;
    const newData = await request.json();
    if (!id) {
      return HttpResponse.json({ success: false, message: "Id is required" });
    }
    if (!newData.name || !newData.email) {
      return HttpResponse.json({
        success: false,
        message: "Name and email is required",
      });
    }
    const resp = await editUser(id, newData);
    return HttpResponse.json(resp);
  }),

  http.delete("http://example.com/user/:id", async ({ params }) => {
    const { id } = params;
    if (!id) {
      return HttpResponse.json({ success: false, message: "Id is required" });
    }
    const resp = await deleteUser(id);
    return HttpResponse.json(resp);
  }),
];
