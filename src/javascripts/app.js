import LoginController from "./controllers/loginController";
import TransactionController from "./controllers/transactionController";
import AccountService from "./services/accountService";
import Service from "./services/service";
import LoginView from "./views/loginView";
import View from "./views/view";

document.addEventListener("DOMContentLoaded", () => {
  const loginController = new LoginController(new AccountService(), new LoginView());
  loginController.init();
  const transactionController = new TransactionController(new Service, new View);
  transactionController.init();
});
