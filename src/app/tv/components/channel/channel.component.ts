import { Component, Input, OnInit } from '@angular/core';
import { ChannelDetail } from '../../common/intrafaces';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
/**
 * Копмонент выводящий плитку канала
 */
export class ChannelComponent implements OnInit {

  /**
   * информация о канале
   */
  @Input() public channel: ChannelDetail;
  /**
   * признак текущий загрузки картинки канала
   */
  public isLoading = true;
  /**
   * безопасня ссылка на картинку канала
   */
  public bgUrl: SafeResourceUrl;
  /**
   * картинка канала, используемая в случае ошибки загрузки
   */
  private errorBg = '/assets/images/white-noise.jpg';
  /**
   * текущее количество попыток загрузки картинок канала
   */
  private errorsCount = 0;

  constructor(private domSanitizer: DomSanitizer) {
  }

  /**
   * пробует выдать следующую картинку из массива, если текущая не загрузилась
   * если картинок больше нет, выдает картнику ошибки
   */
  public updateBgUrl(): void {
    if (!this.channel?.picture?.backgrounds?.length || this.errorsCount >= this.channel.picture.backgrounds.length) {
      this.bgUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.errorBg);
      return;
    }
    this.bgUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.channel.picture.backgrounds[this.errorsCount]);
  }

  /**
   * обработка ошибки загрузки картинки канала
   */
  public onErrorBg(): void {
    this.errorsCount++;
    this.updateBgUrl();
  }

  /**
   * обработка успешной загрузки картинки канала
   */
  public onLoadBg(): void {
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.updateBgUrl();
  }

}
