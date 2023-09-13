import LoginController from "./controllers/loginController";
import AccountService from "./services/accountService";
import LoginView from "./views/loginView";

class App {
    constructor(){}
    start(){
         const loginController = new LoginController(new AccountService(),new LoginView());
         loginController.init();
    }
}

export default App;