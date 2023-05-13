import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { createClient } from 'soap';

@Injectable()
export class CheckIDInterceptor implements NestInterceptor {
  constructor() {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { id_card_no, name, surname, birth_year } = request.body;

    var args = {
      TCKimlikNo: id_card_no,
      Ad: `${name.toUpperCase()}`,
      Soyad: `${surname.toUpperCase()}`,
      DogumYili: birth_year,
    };

    const url = 'https://tckimlik.nvi.gov.tr/Service/KPSPublic.asmx?WSDL';

    return new Promise((resolve, reject) => {
      createClient(url, function (err, client) {
        if (err) {
          reject(err);
        } else {
          client.TCKimlikNoDogrula(args, function (err, result) {
            if (err) {
              reject(err);
            } else {
              const user = result.TCKimlikNoDogrulaResult;
              if (user === false) {
                reject(new NotFoundException());
              } else {
                resolve(next.handle());
              }
            }
          });
        }
      });
    });
  }
}
