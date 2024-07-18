const dbName = "UserDB";
const dbVersion = 1;
const storeName = "users";

function initiateDB() {
  let db;

  const request = indexedDB.open(dbName, dbVersion);

  request.onerror = (event) => {
    console.error("IndexedDB error:", event.target.error);
  };

  request.onsuccess = (event) => {
    db = event.target.result;
    console.log("IndexedDB reasy to use!");
  };

  request.onupgradeneeded = (event) => {
    db = event.target.result;
    if (!db.objectStoreNames.contains(storeName)) {
      const store = db.createObjectStore(storeName, {
        keyPath: "id",
        autoIncrement: true,
      });
      store.createIndex("name", "name", { unique: false });
      store.createIndex("email", "email", { unique: true });
    }
  };

  const addUser = (user) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);
      const emailIndex = store.index("email");
      emailIndex.get(user.email).onsuccess = (event) => {
        if (event.target.result) {
          console.error("Email already exists:", user.email);
          reject({
            success: false,
            message: `Email already exists: ${user.email}`,
          });
        } else {
          const request = store.add(user);
          request.onsuccess = (event) => {
            resolve({
              success: true,
              result: event.target.result,
            });
          };
          request.onerror = (event) => {
            reject({
              success: false,
              message: event.target.error,
            });
          };
        }
      };
    });
  };

  const getUsers = () => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  };

  const editUser = (id, updatedUser) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.get(parseInt(id));
      request.onsuccess = (event) => {
        const user = event.target.result;
        if (user) {
          const updatedUserData = { ...user, ...updatedUser };
          const updateRequest = store.put(updatedUserData);
          updateRequest.onsuccess = (event) => {
            resolve({
              success: true,
              result: event.target.result,
            });
          };
          updateRequest.onerror = (event) => {
            reject({
              success: false,
              message: event.target.error,
            });
          };
        } else {
          reject({
            success: false,
            message: `User not found with id: ${id}`,
          });
        }
      };
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  };

  const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
      console.log("deleteUser", id);
      try {
        const transaction = db.transaction([storeName], "readwrite");
        const store = transaction.objectStore(storeName);
        const request = store.delete(parseInt(id));
        request.onsuccess = (event) => {
          console.log("deleteUser success", event);
          resolve({
            success: true,
            result: event.target.result,
          });
        };
        request.onerror = (event) => {
          reject({
            success: false,
            message: event.target.error,
          });
        };
      } catch (e) {
        console.log(e);
      }
    });
  };

  return { addUser, getUsers, editUser, deleteUser };
}

export default initiateDB;
