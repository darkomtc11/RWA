class TemplateCache {
  "index.html": string;
  "start.html": string;
  "user.html": string;
  "error.html": string;
  "register.html": string;
  "login.html": string;
  "league.html": string;
  "tournament.html": string;
  "match.html": string;

  cache() {
    return new Promise(res => {
      for(let key in this){
        //console.log(key);
      }
      res();
    });
  }
}

export const templateCache = new TemplateCache();