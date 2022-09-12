export default interface ServiceOrderInputDto {
  id: string;
  typeService: 'CUT' | 'BATH';
  sizePet: 'SMALL' | 'MEDIUM' | 'BIG';
  cpf: string;
  date: Date;
}
