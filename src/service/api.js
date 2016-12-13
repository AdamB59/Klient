import request from "superagent";

const ROOT_URL = "http://localhost:8080/server2_0_war_exploded";

// kontakter serveren og returnere dens svar, som er enten noget data eller en fejl.
// håndtere alle POST kald til API'et på serveren
export function postAPI(url, data){
  return request
      .post(ROOT_URL+url)
      .set('Accept', 'application/json')
      .send(data)

}

// håndtere alle GET kald til API'et på serveren
export function getAPI(url){
  return request
      .get(ROOT_URL+url)
      .set('Accept', 'application/json')
      .set('authorization', '7&%ovbznaq3adbxf%nhobrrc5')

}
// håndtere alle PUT / edit kald til API'et på serveren
export function putAPI(url, data){
  return request
      .put(ROOT_URL+url)
      .set('Accept', 'application/json')
      .send(data)

}
// håndtere alle DELETE kald til API'et på serveren
export function deleteAPI(url){
  return request
      .delete(ROOT_URL+url)
      .set('Accept', 'application/json')
}