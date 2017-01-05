import template from './login.html';
import styles from './login.scss';

export default {
    template,
    controller
};

controller.$inject = ['authService', 'userFoodService', '$state', '$rootScope'];

function controller(authSvc, userFoodSvc, $state, rootScope) {
    this.styles = styles;
    this.credentials = {};

    this.authenticate = () => {
        return authSvc.login(this.credentials)
            .then((user) => {
                userFoodSvc.getOne(user.userName)
                .then((userfood) => {
                    console.log('what was found in userfood:', userfood);
                    user.userfood = userfood[0];
                    console.log('user is ', user);
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('userFoodUserName', user.userName);
                    rootScope.$emit('login', {user: user});
                    $state.go('home');
                });
            })
            .catch(error => {
                this.error = error;
            });        
    };
};
