import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    messages = new Map<string, string[]>()
        .set('Contact 1', messages.slice(1, 3))
        .set('Contact 2', messages.slice(0, 9));

    loading: boolean;

    getMessages(contact: string) {
        this.loading = true;
        return new Promise<string[]>((resolve, reject) => {
            setTimeout(() => {
                this.loading = false;
                resolve(this.messages.get(contact));
            }, 2000);
        });
    }
}

function getContact(route: ActivatedRouteSnapshot) {
    return route.paramMap.get('contact');
}

@Injectable({ providedIn: 'root' })
export class MessagesResolver implements Resolve<string[]> {
    constructor(private chatService: ChatService) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return await this.chatService.getMessages(getContact(route));
    }
}

@Injectable({ providedIn: 'root' })
export class ContactResolver implements Resolve<string> {
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return getContact(route);
    }
}

const messages = [
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse quod libero consectetur, amet aperiam deserunt quo reprehenderit molestias inventore suscipit, illo facere fugit ipsa velit. Beatae alias suscipit non quam!',
    'Fuga hic aliquid, esse consectetur sequi quidem sunt, mollitia quaerat eveniet, totam recusandae rerum dicta blanditiis nisi provident. Laudantium provident veritatis maxime magnam nisi dolorum illo odit iusto voluptatibus itaque.',
    'Maxime doloribus necessitatibus ducimus architecto, debitis beatae commodi dolorum accusamus facere dolore quibusdam obcaecati eveniet cumque maiores nisi consequatur autem labore. Obcaecati corrupti sint dolor totam possimus repellat maxime non?',
    'Vel, omnis itaque sed voluptates, harum quae obcaecati, nisi explicabo nulla ullam necessitatibus corporis modi earum vero praesentium? Saepe placeat beatae facilis dolores deserunt provident cum voluptates, id voluptate ut.',
    'Delectus iure vitae optio, eaque commodi quidem doloribus, omnis dolor asperiores eligendi voluptatum sit, cum harum doloremque minus. Fuga, aperiam ex nisi saepe laudantium beatae soluta dolores itaque accusamus reprehenderit.',
    'Harum et provident dicta incidunt cumque vel doloremque commodi eaque error. Quidem nulla recusandae, asperiores maiores, doloremque repellendus et similique iste dolor quae tempora, deserunt adipisci voluptate omnis culpa facere.',
    'Illum dicta ab, eaque amet ipsum pariatur voluptatem similique explicabo, quibusdam totam temporibus cupiditate quisquam iste tempora cum neque asperiores magni nostrum vero placeat deserunt hic officia nobis molestiae. Eaque.',
    'Nostrum id quidem ut officia fugiat accusamus. Quo ex doloribus commodi sed fugiat odit! At possimus suscipit voluptatum iste rem aperiam aliquid animi sequi voluptatibus impedit, distinctio obcaecati qui explicabo.',
    'Totam laboriosam ipsum ea provident laborum ratione deleniti, officia incidunt quasi? Soluta beatae suscipit tenetur aperiam praesentium exercitationem ut qui debitis eos dicta quo voluptas odio voluptates similique, fugiat itaque?',
    'Aperiam, delectus quo. Obcaecati labore laudantium ratione assumenda facilis rem quidem exercitationem. Facere exercitationem assumenda incidunt quo reiciendis, commodi odio repudiandae quam, recusandae fugiat nesciunt ea explicabo, optio architecto quidem?',
    'Iure, tempore reiciendis. Odio possimus optio nemo. Veniam officiis minima recusandae corrupti omnis impedit at eveniet rerum, temporibus id excepturi, perferendis reiciendis accusamus, cum quia ipsa ducimus illo praesentium sit.',
    'Quos atque culpa repellat rem totam odit quas, eveniet doloribus perferendis, id voluptatum quod ipsum eum cupiditate rerum veniam at alias hic sint saepe. Doloribus voluptatum omnis repudiandae animi ut.',
    'Non odio at eius nulla similique vitae aut sint quam dolorem ducimus repudiandae voluptatum hic cupiditate eum corporis exercitationem, dolor nisi consequatur blanditiis? Quas aperiam cumque illo, libero officia iure.',
    'Molestiae accusamus assumenda sequi? Exercitationem esse maiores nulla dolores error vitae cupiditate delectus a ratione non molestias laudantium, reiciendis voluptas ipsum iure! Quam, quas! Minus commodi incidunt quisquam aperiam distinctio.',
    'Unde, nam illum facere tenetur esse inventore iste aliquam eligendi, illo labore repellat! Sit distinctio non aliquam quis, neque provident accusamus rem quasi repudiandae optio, quibusdam earum magnam tenetur eum?',
    'Aut veniam asperiores eos quod quibusdam veritatis suscipit fugit qui illo sit, tempora praesentium officia possimus numquam. Nam aliquid odit velit omnis maiores, praesentium quia iusto pariatur, hic natus adipisci!',
    'Recusandae tempora commodi, voluptates excepturi eveniet totam amet fugit reiciendis similique laborum perferendis est aliquam autem, quisquam sit animi aut! Eos sequi ab iste assumenda doloribus velit harum, dolor numquam!',
    'Eveniet impedit fuga ratione nostrum unde tenetur at non totam nam magni quod, odio animi sapiente dicta sequi tempora soluta odit eos facere expedita esse fugit minus! Nostrum, aliquam sapiente.',
    'Suscipit aliquid, iusto ipsum, pariatur temporibus similique voluptatibus corrupti facere dolores porro, doloremque tempore iure ullam? Optio nemo doloribus dolor quidem hic eaque ratione necessitatibus quaerat placeat mollitia, non voluptas.',
    'Veniam est quasi saepe temporibus fugiat illum consequuntur nisi deserunt mollitia unde eius qui distinctio commodi, ex expedita ab? Earum minus magnam accusantium, facilis fugit consectetur recusandae impedit eos ex.',
];
