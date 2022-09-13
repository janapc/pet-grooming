const SUNDAY = 0;
const SATURDAY = 6;
const TAXTRANSPORT = 0.05;

export default class Service {
  private readonly _serviceId: string;

  constructor(
    readonly id: string,
    readonly typeService: 'CUT' | 'BATH',
    readonly sizePet: 'SMALL' | 'MEDIUM' | 'BIG',
    readonly cpf: string,
    readonly date: Date = new Date()
  ) {
    this.validCpf();
    this.validDate();
    this.validHours();
    this._serviceId = this.generateServiceId();
  }

  get serviceId(): string {
    return this._serviceId;
  }

  private generateServiceId(): string {
    return `${this.id}-${this.date.valueOf()}-00001`;
  }

  getTotal(): number {
    let total = 0;
    total += this.calculateService() * (1 + TAXTRANSPORT);
    return total;
  }

  private calculateService(): number {
    const service = {
      CUT: {
        SMALL: 50,
        MEDIUM: 80,
        BIG: 100
      },
      BATH: {
        SMALL: 40,
        MEDIUM: 60,
        BIG: 80
      }
    };
    return service[this.typeService][this.sizePet];
  }

  private validCpf(): Error | null {
    const regex = /^\d{3}[\.]?\d{3}[\.]?\d{3}[\-]?\d{2}$/g;
    if (!regex.test(this.cpf)) {
      throw new Error('Invalid cpf');
    }
    return null;
  }

  private validDate(): Error | null {
    const today = this.date.getDay();
    if (today === SATURDAY || today === SUNDAY) {
      throw new Error('The service is unavailable today');
    }
    return null;
  }

  private validHours(): Error | null {
    const hours = this.date.getUTCHours();
    if (hours >= 18 || hours <= 8) {
      throw new Error('Out of Hour of attendance');
    }
    return null;
  }
}
