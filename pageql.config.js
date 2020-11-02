import { auth } from "./src/js/nhost.js";
import { initClient, getClient } from "./src/js/graphqlClient.js";

export default {
  auth: {
    checkRole: (requiredRole) => {
      //Used by pageql:authRole directive
      //Return false if user's role fails to hit specifications
      //Returning false hides the component

      return !window.pageql.user.role.includes(requiredRole);
    },
    doLogin: async (loginCallback, event) => {
      //Used by pageql:authLogin directive
      //Can get value of "password" input with event.target.password.value
      //Do login logic here
      try {
        await auth.login(event.target.email.value, event.target.password.value);

        window.pageql.user = {
          userId: auth.getClaim("x-hasura-user-id"),
          role: ["admin"]  //Get from login response
        };
        window.pageql.authState.set({ loggedIn: true });
        initClient();
      } catch (error) {
        console.log(error)
        window.pageql.authState.set({ loggedIn: false });
      }

      loginCallback();
    },
    doLogout: async (logoutCallback, event) => {
      //Used by pageql:authLogout directive
      try {
        auth.logout();
        window.pageql.authState.set({ loggedIn: false });
        logoutCallback();
      } catch (error) {
        console.log(error)
      }
    },
    doRegister: (registerCallback, event) => {
      //Used by pageql:authRegister directive
      //Can get value of "password" input with event.target.password.value

      //Do register logic here

      window.pageql.user = {
        name: event.target.email.value,
        role: ["admin"], //Get from login response
      };

      window.pageql.authState.set({ loggedIn: true });

      registerCallback();
    },
    getUserId: () => {
      //Custom functions like this can be defined and accessed anywhere with window.pageql.auth.getUserId()
      return auth.getClaim("x-hasura-user-id");;
    },
    getTenantId: () => {
      //You can remove this if you're not using multi tenant!
      return "1";
    },
  },
  getClient,
};
