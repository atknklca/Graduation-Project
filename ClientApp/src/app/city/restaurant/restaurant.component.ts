import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbActiveModal, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from 'app/services/alertify.service';
import { AuthService } from 'app/services/auth.service';
import { ReservationService } from 'app/services/reservation.service';
import { RestaurantService } from 'app/services/restaurant.service';
import { Restaurant } from './restaurant';


@Component({
    selector: 'app-restaurant',
    templateUrl: './restaurant.component.html',
    styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
    closeResult: string;

    constructor(
        private modalService: NgbModal,
        private activatedRoute: ActivatedRoute,
        private restaurantService: RestaurantService,
        private reservationService: ReservationService,
        private authService: AuthService,
        private alertify: AlertifyService,
        private router: Router) { }

    restaurants: Restaurant[];
    choseRestaurantId;
    modelReservation: any = {};
    userID;

    ngOnInit(): void {
        this.userID = this.authService.decodedToken?.nameid[0];

        this.activatedRoute.params.subscribe(params => {
            this.restaurantService.getRestaurants().subscribe((data) => {
                this.restaurants = data;
                this.choseRestaurantId = params["restaurantId"];
            });
        })

    }

    addReservationPopup(content, type) {
        if (this.authService.decodedToken?.nameid[0]) {
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
        }else {
            this.alertify.error("Rezervasyon İçin Lütfen Giriş Yapınız!")
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

    addReservation() {
        let userID = this.authService.decodedToken.nameid[0];
        for (let x of this.restaurants) {
            if (x.restaurantID == this.choseRestaurantId) {
                this.reservationService.addReservation(userID, x.restaurantID, this.modelReservation).subscribe(() => {
                    this.alertify.success("Rezervasyon kaydı alınmıştır.");
                    this.modalService.dismissAll("Kayıt Başarılı");
                    this.router.navigate(['index']);
                }, error => {
                    this.alertify.error(error);
                })
            }
        }

    }

}
