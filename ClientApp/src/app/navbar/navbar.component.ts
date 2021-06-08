import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { User } from './user';
import { AuthService } from 'app/services/auth.service';
import { AlertifyService } from 'app/services/alertify.service';
import { RestaurantService } from 'app/services/restaurant.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;
    closeResult: string;
    model: any = {};
    modelRegister: any = {};
    isRestaurant;

    constructor(
        public location: Location,
        private element: ElementRef,
        private modalService: NgbModal,
        private router: Router,
        private authService: AuthService,
        private alertify: AlertifyService,
        private restaurantService: RestaurantService
    ) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee === '/documentation') {
            return true;
        }
        else {
            return false;
        }
    }

    openLogin(content, type) {
        if (type === 'sm') {
            console.log('aici');
            this.modalService.open(content, { size: 'sm' }).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        } else {
            this.modalService.open(content).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        }

    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    hesapOlustur(content, type) {
        if (type === 'sm') {
            console.log('aici');
            this.modalService.open(content, { size: 'sm' }).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        } else {
            this.modalService.open(content).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        }
    }

    buttonClick(fragment: string): void {

        this.router.navigate(['/index/' + fragment + '#ek-sayfa']);
        this.router.navigateByUrl('/index/' + fragment + '#ek-sayfa');
    }

    login() {
        let restaurantId = this.model.userEmail.substring(10, this.model.userEmail.indexOf("@wuutec.com"));
        let restaurantPassword = this.model.userPwd;
        this.isRestaurant = this.model.userEmail.substring(0, 10);

        if (this.isRestaurant == "restaurant") {
            this.restaurantService.getRestaurant(restaurantId).subscribe(data => {
                if (data.restaurantPwd == restaurantPassword) {
                    this.alertify.success("Giriş Başarılı!");
                    this.modalService.dismissAll("Giriş Başarılı");
                    this.authService.loginRestaurant(restaurantId);
                    this.router.navigate(["user-restaurant"]);
                } else {
                    this.alertify.error("Parola Hatalı Tekrar Deneyiniz.");
                }
            })

        } else {
            this.authService.login(this.model).subscribe(next => {
                this.alertify.success("Giriş Başarılı!");
                this.modalService.dismissAll("Giriş Başarılı");
            }, error => {
                if (error == "Unauthorized") {
                    this.alertify.error("Parola Hatalı Tekrar Deneyiniz.");
                } else if (error == "Email is incorrect") {
                    this.alertify.error("E-mail Hatalı Tekrar Deneyiniz.");
                }
            })
        }
    }

    loggedInRestaurant() {
        return this.authService.loggedInRestaurant();
    }
    loggedIn() {
        return this.authService.loggedIn();
    }

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("Restaurant");
        this.router.navigate(['index']);
        this.alertify.warning("Oturum Kapatıldı!");
    }

    register() {
        this.authService.register(this.modelRegister).subscribe(() => {
            this.alertify.success("Kullanıcı Kaydı Başarılı!");
            this.modalService.dismissAll("Kayıt Başarılı");
        }, error => {
            this.alertify.error(error);
        });
    }
}
