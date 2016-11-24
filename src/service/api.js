import request from "superagent";

const ROOT_URL = "http://localhost:8080/server2_0_war_exploded";

// kontakter serveren og returnere dens svar, som er enten noget data eller en fejl.
export function getToken(url, data){
  return request
  .post(ROOT_URL+url)
  .send(data)

}
export function getAllBooks(url){
  return request
  .get(ROOT_URL+url)
  .set('Accept', 'application/json')

}export function getAllUsers(url){
  return request
  .get(ROOT_URL+url)
  .set('Accept', 'application/json')
  .set('authorization', '7&%ovbznaq3adbxf%nhobrrc5')

}
export function getAllCurriculum(url){
  return request
      .get(ROOT_URL+url)
      .set('Accept', 'application/json')

}
export function getAllMyCurriculum(url){
  return request
      .get(ROOT_URL+url)
      .set('Accept', 'application/json')

}
