import { Component } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { environment } from '../../environments/environment';
import { LocalNotifications } from '@capacitor/local-notifications';
import { WeatherService } from '../api/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  temperature: number = 0;
  location: string = '';
  maxTemperature: number = 100; // Valor máximo de temperatura
  private db: firebase.database.Reference;
  private intervalId: any;

  ngOnInit() {
    // Solicitar permisos para mostrar notificaciones
    LocalNotifications.requestPermissions();
    this.ws.getWeatherDetails().subscribe(
      (data: any) => {
        this.temperature = data.current.temp_c;
        this.location = data.location.country;
        console.log(data);
        console.log("Location:", this.location);
        console.log("Temperature:", this.temperature);
        
        // Llamar a enviarNotificacion() después de obtener los datos del clima
        this.enviarNotificacion();
      },
      (error) => {
        console.error("Error obteniendo los datos del clima:", error);
      }
    );

    // Iniciar el temporizador para enviar notificaciones cada 5 minutos
    this.intervalId = setInterval(() => {
      this.enviarNotificacion();
    }, 300000); // 300000 milisegundos = 5 minutos
  }


  enviarNotificacion() {
    if (this.temperature <= 0) {
      LocalNotifications.schedule({
        notifications: [
          {
            title: 'Frío Extremo ❄️',
            body: 'El paisaje se cubre de hielo y nieve, las temperaturas extremadamente frías transforman el entorno en un mundo mágico y gélido.',
            id: 1, // Usar un ID único para cada notificación
          }
        ]
      });
    }

    if (this.temperature >= 1 && this.temperature <= 10) {
      LocalNotifications.schedule({
        notifications: [
          {
            title: 'Brizna de Frío 🍂',
            body: 'El aire fresco anuncia la llegada del otoño, con hojas caídas y paisajes pintados de tonos dorados y rojizos.',
            id: 1, // Usar un ID único para cada notificación
          }
        ]
      });
    }

    if (this.temperature >= 11 && this.temperature <= 15) {
      LocalNotifications.schedule({
        notifications: [
          {
            title: 'Temperatura Agradable 🌤️',
            body: 'Un clima templado invita a disfrutar de actividades al aire libre, con días soleados y noches frescas.',
            id: 1, // Usar un ID único para cada notificación
          }
        ]
      });
    }

    if (this.temperature >= 16 && this.temperature <= 20) {
      LocalNotifications.schedule({
        notifications: [
          {
            title: 'Día Radiante ☀️',
            body: 'Con un sol brillante y temperaturas agradables, es el clima perfecto para actividades al aire libre.',
            id: 1, // Usar un ID único para cada notificación
          }
        ]
      });
    }

    if (this.temperature >= 21 && this.temperature <= 25) {
      LocalNotifications.schedule({
        notifications: [
          {
            title: 'Fresco y Encantador 🌼',
            body: 'Días frescos con una brisa suave, ideales para pasear, explorar la naturaleza o relajarse al aire libre.',
            id: 1, // Usar un ID único para cada notificación
          }
        ]
      });
    }

    if (this.temperature >= 26 && this.temperature <= 30) {
      LocalNotifications.schedule({
        notifications: [
          {
            title: 'Calor Moderado 🌞',
            body: 'Un sol cálido y agradable invita a disfrutar de la naturaleza y buscar refugio en lugares frescos.',
            id: 1, // Usar un ID único para cada notificación
          }
        ]
      });
    }

    if (this.temperature >= 31 && this.temperature <= 35) {
      LocalNotifications.schedule({
        notifications: [
          {
            title: 'Calor Intenso 🌡️',
            body: 'El calor se intensifica, es esencial mantenerse hidratado y buscar lugares frescos para refrescarse.',
            id: 1, // Usar un ID único para cada notificación
          }
        ]
      });
    }

    if (this.temperature > 35) {
      LocalNotifications.schedule({
        notifications: [
          {
            title: 'Ola de Calor 🔥',
            body: 'Con temperaturas muy altas, es el momento de buscar refugio en el agua y disfrutar de actividades refrescantes.',
            id: 1, // Usar un ID único para cada notificación
          }
        ]
      });
    }

  }


  constructor(private ws: WeatherService) {
    const app = firebase.initializeApp(environment.firebase);
    this.db = app.database().ref();
  }




  ionViewWillEnter() {
    this.db.child('temperature').off('value');
  }

  actualizarTemperatura() {
    this.db.child('temperature').set(this.temperature);
  }


}