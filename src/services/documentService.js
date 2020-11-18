import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/docs";

function docUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getDocs(searchString) {
  return http.get(apiEndpoint, { 
    params: { 
      search_string: searchString
    } 
  });
}

// export function getDoc(docId) {
//   return http.get(docUrl(docId));
// }

// export function saveDoc(doc) {
//   if (doc._id) {
//     const body = { ...doc };
//     delete body._id;
//     return http.put(docUrl(doc._id), body);
//   }

//   return http.post(apiEndpoint, doc);
// }

// export function deleteDoc(docId) {
//   return http.delete(docUrl(docId));
// }
