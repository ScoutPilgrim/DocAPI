export class DoctorService{
  getDoctorByMedicalIssue_Seattle(medIssue){
      return new Promise(function(resolve, reject){
        const location = "wa-seattle";
        let request = new XMLHttpRequest();
        let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${medIssue}&location=${location}&skip=0&limit=10&user_key=${process.env.doctorAPI}`;
        request.onload = function(){
          if(this.status === 200){
            resolve(request.response);
          }else{
            reject(Error(request.statusText));
          }
        }
        request.open("GET", url, true);
        request.send();
      });
  }

  getDoctorByName_Seattle(docName){
    return new Promise(function(resolve, reject){
      const location = "wa-seattle";
      docName = docName.replace(' ', '%20');
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${docName}&location=${location}&skip=0&limit=10&user_key=${process.env.doctorAPI}`;
      request.onload = function(){
        if(this.status === 200){
          resolve(request.response);
        }else{
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
}
