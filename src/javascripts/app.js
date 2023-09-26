import LoginController from "./controllers/loginController";
import AccountService from "./services/accountService";
import LoginView from "./views/loginView";

    document.addEventListener("DOMContentLoaded", () => {
      const loginController = new LoginController(new AccountService(), new LoginView());
      loginController.init();
      console.log('app.js')
});


